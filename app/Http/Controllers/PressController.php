<?php

/*
***************************************************************************************************************

*********************************************** PRESS ************************************************

***************************************************************************************************************
*/

namespace App\Http\Controllers;

use App\PressReleases;
use App\PressClipping;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use File;
use App\Http\Middleware\LangMiddleware;



class PressController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }


    public function viewPressRealease()
    {
        return view('backoffice.press-releases.index');
    }

    public function viewPressClipping()
    {
        return view('backoffice.press-cliping.index');
    }

    public function editViewPressRealease($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.press-releases.edit');
    }

    public function editViewPressClipping($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.press-clipping.edit');
    }

/*
***************************************************************************************************************

*********************************************** PRESS RELEASES ************************************************

***************************************************************************************************************
*/



//************************************ VIEW PRESS RELEASES LIST ************************************//
 

    public function releasesList()
    {
        $press_releases = PressReleases::all();

        $data = $press_releases->map(function($press_releases){
            return [
                'id'   => $press_releases->id,
                'Date' => "$press_releases->created_at",
                'Name' => $press_releases->name
            ];
        });

        if($press_releases->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'press_releases',
                    'tableName' => 'PressReleases',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'press_releases',
                    'tableName' => 'PressReleases',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }
    }



    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

/*
*********************************** VIEW CREATE RELEASES ***********************************
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

/*
*********************************** STORE RELEASES ***********************************
*/


    public function releasesStore(Request $request)
    {
        try 
        {

            $this->validate($request, [
                'name'     => 'required|max:120',
                'details'  => 'required',
                'pdf'      => 'required|mimes:pdf',
                'image'    => 'required|mimes:jpeg,jpg,png',
                'imageAlt' => 'required'
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $position = PressReleases::count() + 1;

            $release = new PressReleases;
            $release->name = $request->name;
            $release->details = $request->details;
            $release->img = 'temp';
            $release->alt = $request->imageAlt;
            $release->pdf = 'temp';
            $release->position = $position;
            $release->save();


            $basePathImage = 'images/press_releases/'.$release->id.'/';
            $basePathPdf = 'pdfs/press_releases/'.$release->id.'/en/';
            
            $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->pdf->getClientOriginalExtension();


            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();


            $release->name = 'press_release_'.$release->id.'.'.$release->id.'_name';
            $release->details = 'press_release_'.$release->id.'.'.$release->id.'_details';
            $release->alt = 'press_release_'.$release->id.'.'.$release->id.'_alt';
            $release->img = $basePathImage.$imageName;
            $release->pdf = 'press_release_'.$release->id.'.'.$release->id.'_pdf';
            $release->save();

            
            request()->image->move($basePathImage, $imageName);
            request()->pdf->move($basePathPdf, $pdfName);


            
            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'press_release_'.$release->id;
                $translate->key = $release->id.'_name';
                $translate->value = $request->name;
                $translate->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'press_release_'.$release->id;
                $translate2->key = $release->id.'_details';
                $translate2->value = $request->details;
                $translate2->save();

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = 'press_release_'.$release->id;
                $translate3->key = $release->id.'_alt';
                $translate3->value = $request->imageAlt;
                $translate3->save();

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = 'press_release_'.$release->id;
                $translate3->key = $release->id.'_pdf';
                $translate3->value = $basePathPdf.$pdfName;
                $translate3->save();
            }               

            $this->manager->exportTranslations('press_release_'.$release->id);
            

        }
        catch (\Exception $e)
        {
            return response()->json($e, 409);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PressReleases  $pressReleases
     * @return \Illuminate\Http\Response
     */
    public function show(PressReleases $pressReleases)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PressReleases  $pressReleases
     * @return \Illuminate\Http\Response
     */


/*
*********************************** VIEW EDIT RELEASES ***********************************
*/

    public function releasesEdit(PressReleases $pressReleases,Request $request)
    {
        $id = $request->id;
        $release = PressReleases::where('id',$id)->get();

        $releases = $release->map(function($release){
            return [
                'id'      => $release->id,
                'name'    => $release->name,
                'details' => $release->details,
                'image'   => $release->img,
                'alt'     => $release->alt,
                'pdf'     => $release->pdf,
            ];
        });

        return response()->json(['release' => $releases['0']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PressReleases  $pressReleases
     * @return \Illuminate\Http\Response
     */


/*
*********************************** UPDATE RELEASES ***********************************
*/

    public function releasesUpdate(Request $request, PressReleases $pressReleases)
    {
        try 
        {
            $this->validate($request, [
                'name'=>'required|max:120',
                'details'=>'required',
                'pdf'      => 'mimes:pdf',
                'image' => 'mimes:jpeg,jpg,png',
                'imageAlt' => 'required'
            ]);


            $id = $request->id;
            $lang = $request->language;
            $release = PressReleases::find($id);

            if($lang == 'en')
            {
                if($request->hasFile('image'))
                {
                    \File::delete('images/press_releases/'.$id.'/');
            
                    $basePathImage = 'images/press_releases/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();


                    request()->image->move($basePathImage, $imageName);
                    
                    $release->img = $basePathImage.$imageName;


                    $translate3 = Translations::where('locale', $lang)->where('group', 'press_release_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();
                }
                

            }

            $release->save();

            if($request->hasFile('pdf'))
            {
                $basePathPdf = 'pdfs/press_releases/'.$id.'/'.$lang.'/';
                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->pdf->getClientOriginalExtension();

                if(file_exists($basePathPdf.$pdfName))
                {
                    \File::delete(public_path($basePathPdf.$pdfName));
                }


                request()->pdf->move($basePathPdf, $pdfName);

                $translate = Translations::where('locale', $lang)->where('group', 'press_release_'.$id)->where('key', $id.'_pdf')->firstOrFail();
                $translate->value = $basePathPdf.$pdfName;
                $translate->save();

            }

            


            $translate = Translations::where('locale', $lang)->where('group', 'press_release_'.$id)->where('key', $id.'_name')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'press_release_'.$id)->where('key', $id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();


            $this->manager->exportTranslations('press_release_'.$id);
            

        }
        catch (\Exception $e) 
        {
            return $e->getMessage();
        }
        
    }


    public function updateReleaseImage(Request $request)
    {
        try {

            $translate3 = Translations::where('locale', $request->lang)->where('group', 'press_release_'.$request->releaseId)->where('key', $request->releaseId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();



            $this->manager->exportTranslations('press_release_'.$request->releaseId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PressReleases  $pressReleases
     * @return \Illuminate\Http\Response
     */


/*
*********************************** DELETE RELEASES ***********************************
*/

    public function releasesDestroy(PressReleases $pressReleases, Request $request)
    {
        try
        {
            $id = $request->id;

            $release = PressReleases::where('id', $id)->firstOrFail();

            

            \File::deleteDirectory('images/press_releases/'.$id);
            \File::deleteDirectory('pdfs/press_releases/'.$id);
              
            PressReleases::where('id', $id)->delete();
            
            
            Translations::where('group', 'press_release_'.$id)->delete();

            $this->manager->cleanTranslations();
            
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }



/*
***************************************************************************************************************

*********************************************** PRESS CLIPPING ************************************************

***************************************************************************************************************
*/


//************************************ VIEW PRESS CLIPPING LIST ************************************//
 

    public function clippingList()
    {
        $press_clipping = PressClipping::all();

        $data = $press_clipping->map(function($press_clipping){
            return [
                'id'   => $press_clipping->id,
                'Date' => "$press_clipping->created_at",
                'Name' => $press_clipping->name,
                'Cover' => (bool)$press_clipping->cover
            ];
        });

        if($press_clipping->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'press_clipping',
                    'tableName' => 'PressClipping',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'press_clipping',
                    'tableName' => 'PressClipping',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }
    }

    public function indexClipping()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

/*
*********************************** VIEW CREATE CLIPPING ***********************************
*/

    public function createClipping()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


/*
*********************************** STORE CLIPPING ***********************************
*/

    public function clippingStore(Request $request)
    {
        try 
        {
            $this->validate($request, [
                'name'     => 'required|max:120',
                'details'  => 'required',
                'image'    => 'required|mimes:jpeg,jpg,png',
                'imageAlt' => 'required',
                'cover'    => 'required'
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();


            $position = PressClipping::count() + 1;

            $clipping = new PressClipping;


            $clipping->cover = json_decode($request->cover);
            $clipping->name = $request->name;
            $clipping->details = $request->details;
            $clipping->img = 'temp';
            $clipping->alt = $request->imageAlt;
            $clipping->position = $position;
            $clipping->save();


            $basePathImage = 'images/press_clipping/'.$clipping->id.'/';

            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();


            $clipping->name = 'press_clipping_'.$clipping->id.'.'.$clipping->id.'_name';
            $clipping->details = 'press_clipping_'.$clipping->id.'.'.$clipping->id.'_details';
            $clipping->alt = 'press_clipping_'.$clipping->id.'.'.$clipping->id.'_alt';
            $clipping->img = $basePathImage.$imageName;
            $clipping->save();

            
            request()->image->move($basePathImage, $imageName);


            

            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'press_clipping_'.$clipping->id;
                $translate->key = $clipping->id.'_name';
                $translate->value = $request->name;
                $translate->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'press_clipping_'.$clipping->id;
                $translate2->key = $clipping->id.'_details';
                $translate2->value = $request->details;
                $translate2->save();

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = 'press_clipping_'.$clipping->id;
                $translate3->key = $clipping->id.'_alt';
                $translate3->value = $request->imageAlt;
                $translate3->save();
            }               

            $this->manager->exportTranslations('press_clipping_'.$clipping->id);
            

        }
        catch (\Exception $e)
        {
            return response()->json($e, 409);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\PressClipping  $pressClipping
     * @return \Illuminate\Http\Response
     */
    public function showClipping(PressClipping $pressClipping)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\PressClipping  $pressClipping
     * @return \Illuminate\Http\Response
     */


/*
*********************************** VIEW EDIT CLIPPING ***********************************
*/

    public function clippingEdit(PressClipping $pressClipping,Request $request)
    {
        $id = $request->id;
        $clipping = PressClipping::where('id',$id)->get();

        $clipping = $clipping->map(function($clipping){
            return [
                'id'      => $clipping->id,
                'name'    => $clipping->name,
                'details' => $clipping->details,
                'image'   => $clipping->img,
                'alt'     => $clipping->alt,
                'cover'   => (bool)$clipping->cover,
            ];
        });

        return response()->json(['clipping' => $clipping['0']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\PressClipping  $pressClipping
     * @return \Illuminate\Http\Response
     */

/*
*********************************** UPDATE CLIPPING ***********************************
*/

    public function clipppingUpdate(Request $request, PressClipping $pressClipping)
    {
        try 
        {
            $this->validate($request, [
                'name'     => 'required|max:120',
                'details'  => 'required',
                'image'    => 'mimes:jpeg,jpg,png',
                'imageAlt' => 'required',
                'cover'    => 'required'
            ]);

            $id = $request->id;
            $lang = $request->language;
            $clipping = PressClipping::find($id);
            
            if($lang == 'en')
            {

                $position = PressClipping::where('id', $id)->firstOrFail();


                if($request->hasFile('image'))
                {
                    \File::delete('images/press_clipping/'.$id.'/');
                    
                    $basePathImage = 'images/press_clipping/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();


                    request()->image->move($basePathImage, $imageName);
                    
                    $clipping->img = $basePathImage.$imageName;


                    $translate3 = Translations::where('locale', $lang)->where('group', 'press_clipping_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();
                }

                $clipping->position = $position->position;
                $clipping->cover = json_decode($request->cover);
                $clipping->save();

            }

            $translate = Translations::where('locale', $lang)->where('group', 'press_clipping_'.$id)->where('key', $id.'_name')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'press_clipping_'.$id)->where('key', $id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();


            $this->manager->exportTranslations('press_clipping_'.$id);
            

        }
        catch (\Exception $e) 
        {
            return $e->getMessage();
        }
        
    }



    public function updateClippingImage(Request $request)
    {
        try {

            $translate3 = Translations::where('locale', $request->lang)->where('group', 'press_clipping_'.$request->clippingId)->where('key', $request->clippingId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();



            $this->manager->exportTranslations('press_clipping_'.$request->clippingId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\PressClipping  $pressClipping
     * @return \Illuminate\Http\Response
     */


/*
*********************************** DELETE CLIPPING ***********************************
*/

    public function clippingDestroy(PressClipping $pressClipping, Request $request)
    {
        try
        {
            $id = $request->id;
            
            $release = PressClipping::where('id', $id)->firstOrFail();

            

            \File::deleteDirectory('images/press_clipping/'.$id);
              
            PressClipping::where('id', $id)->delete();
            
            
            Translations::where('group', 'press_clipping_'.$id)->delete();

            $this->manager->cleanTranslations();
            
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }
}
