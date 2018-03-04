<?php

namespace App\Http\Controllers;

use App\Seo;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use App\Http\Middleware\LangMiddleware;


class SeoController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

    public function view()
    {
        $seo = Seo::all();

        if($seo->count() > 0) {

            return redirect()->back();

        } else {
            return view('backoffice.seo.add');
        }
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.seo.edit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $seo = SEO::all();

        $data = $seo->map(function($seo){
            return [
                'id'          => $seo->id,
                'Date'        => "$seo->created_at",
                'Title'       => $seo->title,
                'Keywords'    => $seo->keywords,
                'Description' => $seo->description
            ];
        });

        if($seo->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'seo',
                    'tableName' => 'SEO',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'seo',
                    'tableName' => 'SEO',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $this->validate($request, [
        //     'title' => '',
        //     'keywords' => '',
        //     'description' => '',
        //     'campaignHeader' => '',
        //     'campaignBody' => '',
        // ]);


        try{
            
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $seo = new Seo;
            $seo->title          = 'temp';
            $seo->keywords       = 'temp';
            $seo->description    = 'temp';
            $seo->campaignHeader = $request->campaignHeader;
            $seo->campaignBody   = $request->campaignBody;
            $seo->save();

            $seo->title = 'seo_'.$seo->id.'.'.$seo->id.'_title';
            $seo->keywords = 'seo_'.$seo->id.'.'.$seo->id.'_keywords';
            $seo->description = 'seo_'.$seo->id.'.'.$seo->id.'_description';
            $seo->save();

                foreach ($languagesList as $key => $lang) 
                {
                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "seo_".$seo->id;
                    $translate->key = $seo->id.'_title';
                    $translate->value = $request->title;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "seo_".$seo->id;
                    $translate->key = $seo->id.'_keywords';
                    $translate->value = $request->keywords;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "seo_".$seo->id;
                    $translate->key = $seo->id.'_description';
                    $translate->value = $request->description;
                    $translate->save();
                    
                }

                $this->manager->exportTranslations('seo_'.$seo->id);

            return response()->json('Success', 200);


        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Seo  $seo
     * @return \Illuminate\Http\Response
     */
    public function show(Seo $seo)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Seo  $seo
     * @return \Illuminate\Http\Response
     */
    public function edit(Seo $seo, Request $request)
    {
        try {

            $id = $request->id;

            $seo = Seo::where('id', $id)->get();

            if($seo->count() > 0)
            {
                $dataSeo = $seo->map(function($seo){
                    return [
                        'id'             => $seo->id,
                        'title'          => $seo->title,
                        'keywords'       => $seo->keywords,
                        'campaignHeader' => $seo->campaignHeader,
                        'campaignBody'   => $seo->campaignBody,
                        'description'    => $seo->description
                    ];
                });
            }
            else
            {
                $dataSeo = null;
            }

            return response()->json(['seo' => $dataSeo['0']]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Seo  $seo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Seo $seo)
    {
        try{

            $id = $request->id;
            $lang = $request->language;

            $seo = Seo::find($id);

            if($lang == 'en') {

                $seo->campaignHeader = $request->campaignHeader;
                $seo->campaignBody = $request->campaignBody;
                $seo->save();
            }

            $translate = Translations::where('locale', $lang)
                        ->where('group', 'seo_' . $id)
                        ->where('key', $id . '_title')
                        ->firstOrFail();
            $translate->value = $request->title;
            $translate->save();


            $translate = Translations::where('locale', $lang)
                        ->where('group', 'seo_' . $id)
                        ->where('key', $id . '_keywords')
                        ->firstOrFail();
            $translate->value = $request->keywords;
            $translate->save();


            $translate = Translations::where('locale', $lang)
                        ->where('group', 'seo_' . $id)
                        ->where('key', $id . '_description')
                        ->firstOrFail();
            $translate->value = $request->description;
            $translate->save();
     

            $this->manager->exportTranslations('seo_' . $id);

            return response()->json('Success', 200);


        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Seo  $seo
     * @return \Illuminate\Http\Response
     */
    public function destroy(Seo $seo, Request $request)
    {
        try{

            $id = $request->id;

            Seo::where('id', $id)->delete();


            Translations::where('group', 'seo_'.$id)->delete();

            $this->manager->cleanTranslations();

        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }
    }
}
