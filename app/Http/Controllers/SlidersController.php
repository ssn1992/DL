<?php

/*
***************************************************************************************************************

*********************************************** SLIDERS *******************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Banners;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use File;
use App\Http\Middleware\LangMiddleware;
use App\Slider;
use DateTime;

class SlidersController extends Controller
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
        return view('backoffice.sliders.index');
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.sliders.edit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sliders = Slider::getSliders();

        $data = $sliders->map(function($sliders){
            return [
                'id'          => $sliders->id,
                'Date'        => "$sliders->created_at",
                'Page'        => $sliders->page,
                'Title'       => $sliders->title,
                'Begin Date'  => $sliders->begin_date,
                'End Date'    => $sliders->end_date,
                'Button Text' => $sliders->btn_text,
                'Button Link' => $sliders->btn_link
            ];
        });

        if($sliders->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'sliders',
                    'tableName' => 'Sliders',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'sliders',
                    'tableName' => 'Sliders',
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
        
    }



/*
*********************************** STORE SLIDERS ***********************************
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
                    'image' => 'required|mimes:jpeg,jpg,png',
                    'imageAlt' => 'required',
                    'page' => 'required',
                    'details' => 'required',
                    'btnText' => 'required',
                    'btnLink' => 'required'
                ]);

                $lang = new LangMiddleware;
                $languagesList = $lang->languagesList();

                $position = Slider::where('id_page', $request->page)->count() + 1;

                $slider = new Slider;
                $slider->id_page = $request->page;
                $slider->title = $request->name;
                $slider->details = $request->details;
                $slider->begin_date = $request->beginDate;
                $slider->end_date = $request->endDate;
                $slider->img = 'temp';
                $slider->alt = $request->imageAlt;
                $slider->btn_text = $request->btnText;
                $slider->btn_link = $request->btnLink;

                
                $slider->position = $position;
                $slider->save();


                $basePathImage = 'images/sliders/'.$slider->id.'/';
                
                $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->image->getClientOriginalExtension();


                $slider->title = 'slider_'.$slider->id.'.'.$slider->id.'_title';
                $slider->details = 'slider_'.$slider->id.'.'.$slider->id.'_details';
                $slider->alt = 'slider_'.$slider->id.'.'.$slider->id.'_alt';
                $slider->btn_text = 'slider_'.$slider->id.'.'.$slider->id.'_btn_text';
                $slider->btn_link = 'slider_'.$slider->id.'.'.$slider->id.'_btn_link';
                $slider->img = $basePathImage.$imageName;
                $slider->save();
               
                
                request()->image->move($basePathImage, $imageName);

                foreach ($languagesList as $key => $lang) 
                {
                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "slider_".$slider->id;
                    $translate->key = $slider->id.'_title';
                    $translate->value = $request->name;
                    $translate->save();

                    $translate2 = new Translations;
                    $translate2->status = 0;
                    $translate2->locale = $lang;
                    $translate2->group = "slider_".$slider->id;
                    $translate2->key = $slider->id.'_details';
                    $translate2->value = $request->details;
                    $translate2->save();

                    $translate3 = new Translations;
                    $translate3->status = 0;
                    $translate3->locale = $lang;
                    $translate3->group = "slider_".$slider->id;
                    $translate3->key = $slider->id.'_alt';
                    $translate3->value = $request->imageAlt;
                    $translate3->save();

                    $translate4 = new Translations;
                    $translate4->status = 0;
                    $translate4->locale = $lang;
                    $translate4->group = "slider_".$slider->id;
                    $translate4->key = $slider->id.'_btn_text';
                    $translate4->value = $request->btnText;
                    $translate4->save();

                    $translate4 = new Translations;
                    $translate4->status = 0;
                    $translate4->locale = $lang;
                    $translate4->group = "slider_".$slider->id;
                    $translate4->key = $slider->id.'_btn_link';
                    $translate4->value = $request->btnLink;
                    $translate4->save();

                    $translate4 = new Translations;
                    $translate4->status = 0;
                    $translate4->locale = $lang;
                    $translate4->group = "slider_" . $slider->id;
                    $translate4->key = $slider->id . '_visible';
                    $translate4->value = 1;
                    $translate4->save();
                }


                

                $this->manager->exportTranslations('slider_'.$slider->id);
            
        }
        catch (\Exception $e) 
        {
            return response()->json($e, 409);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sliders  $sliders
     * @return \Illuminate\Http\Response
     */
    public function show(Sliders $sliders)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sliders  $sliders
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        try {   

            $sliders = Slider::where('id',$request->id)->get();

            if($sliders->count() > 0)
            {

                $dataSliders = $sliders->map(function($sliders){
                    return [
                        'id'        => $sliders->id,
                        'page'      => $sliders->id_page,
                        'name'      => $sliders->title,
                        'details'   => $sliders->details,
                        'beginDate' => $sliders->begin_date,
                        'endDate'   => $sliders->end_date,
                        'image'     => $sliders->img,
                        'alt'       => $sliders->alt,
                        'btnText'   => $sliders->btn_text,
                        'btnLink'   => $sliders->btn_link
                    ];
                });
            }
            else
            {
                $dataSliders = $sliders;
            }


            return response()->json(['slider' => $dataSliders['0']]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }
    }



/*
*********************************** UPDATE SLIDERS ***********************************
*/


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sliders  $sliders
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        try 
        {

            $this->validate($request, [
                    'name' => 'required',
                    'beginDate' => 'required',
                    'endDate' => 'required',
                    'image' => 'mimes:jpeg,jpg,png',
                    'imageAlt' => 'required',
                    'page' => 'required',
                    'details' => 'required',
                    'btnText' => 'required',
                    'btnLink' => 'required'
                ]);

            $id = $request->id;
            $lang = $request->language;

            $slider = Slider::find($id);

            if($lang == 'en')
            {

                $slider->id_page = $request->page;
                $slider->begin_date = $request->beginDate;
                $slider->end_date = $request->endDate;

                if($request->hasFile('image'))
                {
                    $old = Slider::where('id', $id)->firstOrFail();

                    \File::delete(public_path($old->img));

                    $old->img = 'temp';
                    $old->save();
                   
                    $basePathImage = 'images/sliders/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();


                    request()->image->move($basePathImage, $imageName);

                    $position = Slider::where('id_page', $request->page)->count();

                    $slider->img = $basePathImage.$imageName;

                    $translate3 = Translations::where('locale', $lang)->where('group', 'slider_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;


                    $translate3->save();
                }

            }
            $slider->save();

            $translate = Translations::where('locale', $lang)->where('group', 'slider_'.$id)->where('key', $id.'_title')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'slider_'.$id)->where('key', $id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();


            $translate4 = Translations::where('locale', $lang)->where('group', 'slider_'.$id)->where('key', $id.'_btn_text')->firstOrFail();
            $translate4->value = $request->btnText;
            $translate4->save();


            $translate4 = Translations::where('locale', $lang)->where('group', 'slider_'.$id)->where('key', $id.'_btn_link')->firstOrFail();
            $translate4->value = $request->btnLink;
            $translate4->save();

            $this->manager->exportTranslations('slider_'.$id);

        }


        catch (\Exception $e) 
        {
            return $e->getMessage();
        }

    }



    public function updateImage(Request $request)
    {
        try {


            $translate3 = Translations::where('locale', $request->lang)->where('group', 'slider_'.$request->sliderId)->where('key', $request->sliderId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();

            $this->manager->exportTranslations('slider_'.$request->sliderId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }

/*
*********************************** DELETE SLIDERS ***********************************
*/


    public function destroy(Request $request)
    {
        try{
            $id = $request->id;

            \File::deleteDirectory(public_path('images/sliders/'.$id.'/'));

            
            Slider::where('id', $id)->delete();
            
            
            Translations::where('group', 'slider_'.$id)->delete();

            $this->manager->cleanTranslations();
           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }

    }
}
