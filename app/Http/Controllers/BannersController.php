<?php

/*
***************************************************************************************************************

*********************************************** BANNERS ************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;

use App\Banners;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use File;
use App\Http\Middleware\LangMiddleware;
use DateTime;

class BannersController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function view()
    {
        return view('backoffice.banners.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.banners.edit');
    }

    public function index()
    {
        $banners = Banners::getBanners();

        $data = $banners->map(function($banners){
            return [
                'id'          =>  $banners->id,
                'Date'        => "$banners->created_at",
                'Category'    =>  $banners->categoryName,
                'Page'        =>  $banners->page,
                'Title'       =>  $banners->title,
                'Begin Date'  =>  $banners->begin_date,
                'End Date'    =>  $banners->end_date
            ];
        });

        if($banners->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'banner',
                    'tableName' => 'Banners',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'banner',
                    'tableName' => 'Banners',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }
    }



/*
*********************************** STORE BANNERS ***********************************
*/

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'name' => 'required',
                'beginDate' => 'required',
                'endDate' => 'required',
                'details' => 'required',
                'image' => 'required|mimes:jpeg,jpg,png',
                'imageAlt' => 'required',
                'btnLink' => 'required',
                'btnText' => 'required',
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();


            $banner = new Banners;
            if($request->cat != 'null')
                $banner->id_category = $request->cat;
            if($request->page != 'null')
                $banner->id_page = $request->page;
            $banner->title = $request->name;
            $banner->details = $request->details;
            $banner->begin_date = $request->beginDate;
            $banner->end_date = $request->endDate;
            $banner->img = 'temp';
            $banner->alt = $request->imageAlt;
            $banner->btn_text = $request->btnText;
            $banner->btn_link = $request->btnLink;
            $banner->save();


            $basePathImage = 'images/banners/' . $banner->id . '/';

            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                md5(date('ymdhis')) .
                '.' .
                request()->image->getClientOriginalExtension();


            $banner->title = 'banner_' . $banner->id . '.' . $banner->id . '_title';
            $banner->details = 'banner_' . $banner->id . '.' . $banner->id . '_details';
            $banner->alt = 'banner_' . $banner->id . '.' . $banner->id . '_alt';
            $banner->btn_text = 'banner_' . $banner->id . '.' . $banner->id . '_btn_text';
            $banner->img = $basePathImage . $imageName;
            $banner->btn_link = 'banner_' . $banner->id . '.' . $banner->id . '_btn_link';
            $banner->save();


            request()->image->move($basePathImage, $imageName);

            foreach ($languagesList as $key => $lang) {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "banner_" . $banner->id;
                $translate->key = $banner->id . '_title';
                $translate->value = $request->name;
                $translate->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = "banner_" . $banner->id;
                $translate2->key = $banner->id . '_details';
                $translate2->value = $request->details;
                $translate2->save();

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = "banner_" . $banner->id;
                $translate3->key = $banner->id . '_alt';
                $translate3->value = $request->imageAlt;
                $translate3->save();

                $translate4 = new Translations;
                $translate4->status = 0;
                $translate4->locale = $lang;
                $translate4->group = "banner_" . $banner->id;
                $translate4->key = $banner->id . '_btn_text';
                $translate4->value = $request->btnText;
                $translate4->save();

                $translate4 = new Translations;
                $translate4->status = 0;
                $translate4->locale = $lang;
                $translate4->group = "banner_" . $banner->id;
                $translate4->key = $banner->id . '_btn_link';
                $translate4->value = $request->btnLink;
                $translate4->save();

                $translate4 = new Translations;
                $translate4->status = 0;
                $translate4->locale = $lang;
                $translate4->group = "banner_" . $banner->id;
                $translate4->key = $banner->id . '_visible';
                $translate4->value = 1;
                $translate4->save();
            }


            $this->manager->exportTranslations('banner_' . $banner->id);

        }
        catch (\Exception $e) {
            $data = array(
                'status'    => 'error',
                'message'   => 'An error occurred please try again later',
            );

            return response()->json($data, 409);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Banners  $banners
     * @return \Illuminate\Http\Response
     */
    public function show(Banners $banners)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Banners  $banners
     * @return \Illuminate\Http\Response
     */
    public function edit(Banners $banners, Request $request)
    {
        try {   

            $banners = Banners::where('id', $request->id)->get();

            if($banners->count() > 0)
            {

                $dataBanners = $banners->map(function($banners){
                    return [
                        'id'        => $banners->id,
                        'cat'       => $banners->id_category,
                        'page'      => $banners->id_page,
                        'name'      => $banners->title,
                        'details'   => $banners->details,
                        'beginDate' => $banners->begin_date,
                        'endDate'   => $banners->end_date,
                        'image'     => $banners->img,
                        'alt'       => $banners->alt,
                        'btnText'   => $banners->btn_text,
                        'btnLink'   => $banners->btn_link
                    ];
                });
            }
            else
            {
                $dataBanners = $banners;
            }


            return response()->json(['banner' => $dataBanners['0']]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }
    }



/*
*********************************** UPDATE BANNERS ***********************************
*/


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Banners  $banners
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Banners $banners)
    {
        try
        {
            $this->validate($request, [
                'name' => 'required',
                'beginDate' => 'required',
                'endDate' => 'required',
                'details' => 'required',
                'image' => 'mimes:jpeg,jpg,png',
                'imageAlt' => 'required',
                'btnLink' => 'required',
                'btnText' => 'required',
            ]);

            $lang = $request->language;
            $id = $request->id;

            $banner = Banners::find($id);

            if($lang == 'en')
            {

                if($request->cat != 'null')
                    $banner->id_category = $request->cat;

                if($request->page != 'null')
                    $banner->id_page = $request->page;

                $banner->begin_date = $request->beginDate;
                $banner->end_date   = $request->endDate;

                if($request->hasFile('image'))
                {
                    $translate3 = Translations::where('locale', $lang)->where('group', 'banner_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();

                    $old = Banners::where('id', $id)->firstOrFail();

                    \File::delete(public_path($old->img));

                    $old->img = 'temp';
                    $old->save();

                    $basePathImage = 'images/banners/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();
                    request()->image->move($basePathImage, $imageName);
                    $banner->img = $basePathImage.$imageName;

                }

            }


            $banner->save();

            $translate = Translations::where('locale', $lang)->where('group', 'banner_'.$id)->where('key', $id.'_title')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'banner_'.$id)->where('key', $id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();


            $translate4 = Translations::where('locale', $lang)->where('group', 'banner_'.$id)->where('key', $id.'_btn_text')->firstOrFail();
            $translate4->value = $request->btnText;
            $translate4->save();

            $translate4 = Translations::where('locale', $lang)->where('group', 'banner_'.$id)->where('key', $id.'_btn_link')->firstOrFail();
            $translate4->value = $request->btnLink;
            $translate4->save();

            $this->manager->exportTranslations('banner_'.$id);

            return response()->json('Success', 200);

        }
        catch (\Exception $e)
        {

            return response()->json($e, 500);
        }

    }



    public function updateImage(Request $request)
    {
        try {

                $translate3 = Translations::where('locale', $request->lang)->where('group', 'banner_'.$request->bannerId)->where('key', $request->bannerId . '_alt')->firstOrFail();
                $translate3->value = $request->imageAlt;
                $translate3->save();

                $this->manager->exportTranslations('banner_'.$request->bannerId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Banners  $banners
     * @return \Illuminate\Http\Response
     */



/*
*********************************** DELETE BANNERS ***********************************
*/


    public function destroy(Banners $banners, Request $request)
    {
        try{
            $id = $request->id;

            $banners = Banners::where('id', $id)->firstOrFail();

            \File::deleteDirectory(public_path('images/banners/'.$id));

            Banners::where('id', $id)->delete();
            
            Translations::where('group', 'banner_'.$id)->delete();

            $this->manager->cleanTranslations();
           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }

    }
}
