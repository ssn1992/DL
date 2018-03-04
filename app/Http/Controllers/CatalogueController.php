<?php

namespace App\Http\Controllers;

use App\Catalogue;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use App\Http\Middleware\LangMiddleware;


class CatalogueController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.catalogue.edit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cat = Catalogue::all();

        $data = $cat->map(function($cat){
            return [
                'id'   => $cat->id,
                'Date' => "$cat->created_at",
                'Name' => $cat->catalogue,
                'Link' => $cat->link
            ];
        });

        if($cat->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'catalogue',
                    'tableName' => 'Catalogue',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'catalogue',
                    'tableName' => 'Catalogue',
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
        $this->validate($request,[
            'name' => 'required|max:30',
            'image' => 'required|mimes:jpg,jpeg,png',
            'imageAlt' => 'required',
            'pdf' => 'required',
        ]);

        try{
            
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $catalogue = new Catalogue;
            $catalogue->catalogue = 'temp';
            $catalogue->img = 'temp';
            $catalogue->alt = 'temp';
            $catalogue->pdf = 'temp';
            $catalogue->link = $request->link;
            $catalogue->save();

            $basePathImage = 'images/catalogues/'.$catalogue->id.'/';
            $basePathPdf = 'pdfs/catalogues/'.$catalogue->id.'/en/';

            $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->pdf->getClientOriginalExtension();


            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();

            $catalogue->catalogue = 'catalogue_'.$catalogue->id.'.'.$catalogue->id.'_catalogue';
            $catalogue->img = $basePathImage.$imageName;
            $catalogue->alt = 'catalogue_'.$catalogue->id.'.'.$catalogue->id.'_alt';
            $catalogue->pdf = 'catalogue_'.$catalogue->id.'.'.$catalogue->id.'_pdf';
            $catalogue->link = 'catalogue_'.$catalogue->id.'.'.$catalogue->id.'_link';
            $catalogue->save();


            request()->image->move($basePathImage, $imageName);
            request()->pdf->move($basePathPdf, $pdfName);

            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "catalogue_".$catalogue->id;
                $translate->key = $catalogue->id.'_catalogue';
                $translate->value = $request->name;
                $translate->save();

                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "catalogue_".$catalogue->id;
                $translate->key = $catalogue->id.'_alt';
                $translate->value = $request->imageAlt;
                $translate->save();

                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "catalogue_".$catalogue->id;
                $translate->key = $catalogue->id.'_pdf';
                $translate->value = $basePathPdf.$pdfName;
                $translate->save();


                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "catalogue_".$catalogue->id;
                $translate->key = $catalogue->id.'_link';
                $translate->value = $request->link;
                $translate->save();
            }

            $this->manager->exportTranslations('catalogue_'.$catalogue->id);

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
     * @param  \App\Catalogue  $catalogue
     * @return \Illuminate\Http\Response
     */
    public function show(Catalogue $catalogue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Catalogue  $catalogue
     * @return \Illuminate\Http\Response
     */
    public function edit(Catalogue $catalogue, Request $request)
    {
        $id = $request->id;
        $lang = $request->language;

        $catalogue = Catalogue::where('id', $id)->get();

        $data_catalogue = $catalogue->map(function($catalogue){
            return [
                'id' => $catalogue->id,
                'name' => $catalogue->catalogue,
                'image' => $catalogue->img,
                'alt' => $catalogue->alt,
                'link' => $catalogue->link,
                'pdf' => $catalogue->pdf,
            ];
        });

        return response()->json(['catalogue' => $data_catalogue['0']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Catalogue  $catalogue
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Catalogue $catalogue)
    {
        $this->validate($request,[
            'name' => 'required|max:30',
            'image' => 'mimes:jpg,jpeg,png',
            'imageAlt' => 'required',
        ]);

        try{
            $id = $request->id;
            $lang = $request->language;

            if($lang == 'en')
            {

                $catalogue = Catalogue::find($id);

                if($request->hasFile('image'))
                {
                    $basePathImage = 'images/catalogues/'.$catalogue->id.'/';

                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();

                    \File::delete('images/catalogues/'.$id.'/');
                  

                    request()->image->move($basePathImage, $imageName);

                    $catalogue->img = $basePathImage.$imageName;

                    $trans = Translations::where('locale', $lang)->where('group', 'catalogue_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $trans->value = $request->imageAlt;
                    $trans->save();

                }

                $catalogue->save();

            }

            if($request->hasFile('pdf'))
            {
                $basePathPdf = 'pdfs/catalogues/'.$catalogue->id.'/'.$lang.'/';

                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->pdf->getClientOriginalExtension();

                if(file_exists($basePathPdf.$pdfName))
                {
                    \File::delete(public_path($basePathPdf.$pdfName));
                }

                $trans = Translations::where('locale', $lang)->where('group', 'catalogue_'.$id)->where('key', $id.'_pdf')->firstOrFail();
                $trans->value = $basePathPdf.$pdfName;
                $trans->save();

                request()->pdf->move($basePathPdf, $pdfName);
            }
            
            $trans = Translations::where('locale', $lang)->where('group', 'catalogue_'.$id)->where('key', $id.'_catalogue')->firstOrFail();
            $trans->value = $request->name;
            $trans->save();

            $trans = Translations::where('locale', $lang)->where('group', 'catalogue_'.$id)->where('key', $id.'_link')->firstOrFail();
            $trans->value = $request->link;
            $trans->save();


            $this->manager->exportTranslations('catalogue_'.$id);

            return response()->json('Success', 200);
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }



    public function updateImage(Request $request)
    {
        try {

            $trans = Translations::where('locale', $request->lang)->where('group', 'catalogue_'.$request->catalogueId)->where('key', $request->catalogueId.'_alt')->firstOrFail();
            $trans->value = $request->imageAlt;
            $trans->save();


            $this->manager->exportTranslations('catalogue_'.$request->catalogueId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Catalogue  $catalogue
     * @return \Illuminate\Http\Response
     */
    public function destroy(Catalogue $catalogue, Request $request)
    {
        try{
            $id = $request->id;

            \File::deleteDirectory(public_path('images/catalogues/'.$id));
            \File::deleteDirectory(public_path('pdfs/catalogues/'.$id));

            Catalogue::where('id', $id)->delete();
            

            Translations::where('group', 'catalogue_'.$id)->delete();

            $this->manager->cleanTranslations();

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }
}
