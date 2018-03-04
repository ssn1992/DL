<?php

/*
***************************************************************************************************************

*********************************************** VIDEOS ************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;

use App\Videos;
use App\VideosCat;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use Session;
use App\Http\Middleware\LangMiddleware;

class VideosController extends Controller
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

//************************************ LIST VIDEOS ************************************//

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function view()
    {
        return view('backoffice.videos.index');
    }

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.videos.edit');
    }

    public function index()
    {
        $videos = Videos::getVideos();
        //$DOM = new DOMDocument;
        //$DOM->loadHTML($str);

        $data = $videos->map(function($videos){
            return [
                'id'       => $videos->id,
                'Date'     => "$videos->created_at",
                'Category' => $videos->category,
                'Title'    => $videos->title,
                'Youtube'  => 'https://www.youtube.com/watch?'.$videos->url

            ];
        });

        if($videos->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'videos',
                    'tableName' => 'Videos',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'videos',
                    'tableName' => 'Videos',
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

//************************************ CREATE ************************************//


    public function create()
    {
        $categories = VideosCat::all();

        $categories = $categories->map(function($categories){
            return [
                'value' => $categories->id,
                'label' => $categories->category,
            ];
        });


        return response()->json(['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


//************************************ STORE ************************************//


    public function store(Request $request)
    {
        try{

            $this->validate($request, [
                'cat'=>'required',
                'name'=>'required',
                'videoUrl' => 'required',
                'details' => 'required',
            ]);

            $position = Videos::count() + 1;

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $video = new Videos;
            $video->id_category = $request->cat;
            $video->title = $request->name;
            $video->details = $request->details;
            $video->url = $request->videoUrl;

            $video->position = $position;
            $video->save();

            $video->title = "video_".$video->id.'.'.$video->id.'_title';

            $video->details = "video_".$video->id.'.'.$video->id.'_details';
            $video->save();


            foreach ($languagesList as $key => $lang)
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "video_".$video->id;
                $translate->key = $video->id.'_title';
                $translate->value = $request->name;
                $translate->save();


                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "video_".$video->id;
                $translate->key = $video->id.'_details';
                $translate->value = $request->details;
                $translate->save();
            }


            $this->manager->exportTranslations('video_'.$video->id);
        }
        catch (\Exception $e)
        {
            return response()->json($e, 409);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */

//************************************ VIEW VIDEO USER ************************************//


    public function show(Videos $videos)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */

//************************************ VIEW EDIT VIDEO ************************************//


    public function edit(Videos $videos, Request $request)
    {
        try {

            $videos = Videos::where('id', $request->id)->get();

            if($videos->count() > 0)
            {
                $dataVideos = $videos->map(function($videos){
                    return [
                        'id'      => $videos->id,
                        'cat'     => $videos->id_category,
                        'name'   => $videos->title,
                        'url'     => 'https://www.youtube.com/watch?v='.$videos->url,
                        'details' => $videos->details
                    ];
                });
            }
            else
            {
                $dataVideos = $videos;
            }

            return response()->json(['video' => $dataVideos['0']]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */



//************************************ UPDATE ************************************//



    public function update(Request $request)
    {
        
        try{

            $id = $request->id;
            $lang = $request->language;

            if($lang == 'en')
            {
                $video = Videos::find($id);

                $video->id_category = $request->cat;
                $video->url = $request->videoUrl;
                $video->save();    
            }


            $translate = Translations::where('locale', $lang)
                        ->where('group', 'video_'.$id)
                        ->where('key', $id.'_title')
                        ->firstOrFail();

            $translate->value = $request->name;
            $translate->save();

            $translate1 = Translations::where('locale', $lang)
                        ->where('group', 'video_'.$id)
                        ->where('key', $id.'_details')
                        ->firstOrFail();

            $translate1->value = $request->details;
            $translate1->save();

            $this->manager->exportTranslations('video_'.$id);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Videos  $videos
     * @return \Illuminate\Http\Response
     */



//************************************ DELETE ************************************//


    public function destroy(Videos $videos, Request $request)
    {
        try{

            $id = $request->id;

            Videos::where('id', $id)->delete();

            
            Translations::where('group', 'video_'.$id)->delete();
            
            $this->manager->cleanTranslations();
           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }
    }



//************************************************ CATEGORIES *************************************************//


//************************************ CATEGORIES STORE ************************************//

    public function storeCategory(Request $request)
    {
        

        try{
            $this->validate($request, [
                'name'=>'required',
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $category = new VideosCat;
            $category->category = $request->name;
            $category->save();

            $category->category = "cat_video_".$category->id.'.'.$category->id.'_category';
            $category->save();

            
            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "cat_video_".$category->id;
                $translate->key = $category->id.'_category';
                $translate->value = $request->name;
                $translate->save();   

            }       

            $this->manager->exportTranslations('cat_video_'.$category->id);

           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }

    }



//************************************ CATEGORIES UPDATE ************************************//


    public function updateCategory(Request $request)
    {
        try{
            $this->validate($request, [
                'name'=>'required',
            ]);

            
            $id = $request->id;
            $lang = $request->language;


            $translate = Translations::where('locale', $lang)->where('group', 'cat_video_'.$id)->where('key', $id.'_category')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();            

            $this->manager->exportTranslations('cat_video_'.$id);

           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }


    }


//************************************ CATEGORIES DELETE ************************************//


    public function destroyCategory(Videos $videos, Request $request)
    {
        try{
            $id = $request->id;
            
            Videos::where('id', $id)->delete();
            VideosCat::where('id', $id)->delete();
            
            
            Translations::where('group', 'cat_video_'.$id)->delete();

            $this->manager->cleanTranslations();
           
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }

    }
}
