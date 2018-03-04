<?php

/*
***************************************************************************************************************

*********************************************** EVENTS ************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;

use App\Events;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use Session;
use File;
use App\Http\Middleware\LangMiddleware;


class EventsController extends Controller
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

//************************************ EVENTS LIST ************************************//

    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.events.edit');
    }


    public function index()
    {
        $events = Events::all();

        $data = $events->map(function($events){
            return [
                'id'        => $events->id,
                'Date'      => "$events->created_at",
                'Title'     => $events->title,
                'Sub Title' => $events->subTitle,
                'Started'   => $events->started,
                'Ended'     => $events->ended,
            ];
        });

        if($events->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'events',
                    'tableName' => 'Events',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'events',
                    'tableName' => 'Events',
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

//************************************ SAVE ************************************//


    public function store(Request $request)
    {
        $this->validate($request, [
            'title'     =>'required|max:120',
            'subTitle'  =>'required|max:120',
            'image'     => 'required|mimes:jpg,jpeg,png',
            'imageAlt'  => 'required',
            'text'      => 'required',
            'beginDate' => 'required',
        ]);

        try
        {
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $position = Events::count() + 1;

            $event           = new Events;
            $event->title    = $request->title;
            $event->subTitle = $request->subTitle;
            $event->text     = 'temp';
            $event->img      = 'temp';
            $event->alt      = $request->imageAlt;
            $event->started  = $request->beginDate;
            $event->ended    = $request->endDate;
            $event->save();


            $basePathImage = 'images/events/'.$event->id.'/';



            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();

            $event->title = 'event_'.$event->id.'.'.$event->id.'_title';
            $event->subTitle = 'event_'.$event->id.'.'.$event->id.'_subTitle';
            $event->text = 'event_'.$event->id.'.'.$event->id.'_text';
            $event->alt = 'event_'.$event->id.'.'.$event->id.'_alt';
            $event->img = $basePathImage.$imageName;
            $event->save();


            request()->image->move($basePathImage, $imageName);


            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "event_".$event->id;
                $translate->key = $event->id.'_title';
                $translate->value = $request->title;
                $translate->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = "event_".$event->id;
                $translate2->key = $event->id.'_subTitle';
                $translate2->value = $request->subTitle;
                $translate2->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = "event_".$event->id;
                $translate2->key = $event->id.'_text';
                $translate2->value = $request->text;
                $translate2->save();

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = "event_".$event->id;
                $translate3->key = $event->id.'_alt';
                $translate3->value = $request->imageAlt;
                $translate3->save();
            }

            $this->manager->exportTranslations('event_'.$event->id);
            

        }
        catch (\Exception $e)
        {
            return $e->getMessage();
        }

        return response()->json('Success', 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Events  $events
     * @return \Illuminate\Http\Response
     */
    public function show(Events $events)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Events  $events
     * @return \Illuminate\Http\Response
     */


//************************************ EDIT ************************************//


    public function edit(Events $events, Request $request)
    {
        $id = $request->id;
        $event = Events::where('id', $id)->get();

        $events = $event->map(function($event){
            return [
                'id' => $event->id,
                'title' => $event->title,
                'subTitle' => $event->subTitle,
                'text' => $event->text,
                'image' => $event->img,
                'alt' => $event->alt,
                'beginDate' => $event->started,
                'endDate' => $event->ended,

            ];
        });

        return response()->json(['event' => $events['0']]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Events  $events
     * @return \Illuminate\Http\Response
     */


//************************************ UPDATE ************************************//


    public function update(Request $request, Events $events)
    {

        $this->validate($request, [
            'title'=>'required|max:120',
            'subTitle'=>'required',
            'image' => 'image|mimes:jpeg,jpg,png',
            'imageAlt' => 'required',
            'text' => 'required',
            'beginDate' => 'required',
        ]);

        try
        {
            $id = $request->id;
            $lang = $request->language;

            if($lang == 'en')
            {
                $event = Events::find($id);

                if($request->hasFile('image'))
                {
                    $old = Events::where('id', $id)->firstOrFail();

                    \File::delete(public_path($old->img));

                    $old->img = 'temp';
                    $old->save();
                    
                    $basePathImage = 'images/events/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();

                    request()->image->move($basePathImage, $imageName);

                    $event->img = $basePathImage.$imageName;


                    $translate3 = Translations::where('locale', $lang)->where('group', 'event_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();
                }
                $event->started = $request->beginDate;
                $event->ended = $request->endDate;
                $event->save();
            }

            $translate = Translations::where('locale', $lang)->where('group', 'event_'.$id)->where('key', $id.'_title')->firstOrFail();
            $translate->value = $request->title;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'event_'.$id)->where('key', $id.'_subTitle')->firstOrFail();
            $translate2->value = $request->subTitle;
            $translate2->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'event_'.$id)->where('key', $id.'_text')->firstOrFail();
            $translate2->value = $request->text;
            $translate2->save();


            $this->manager->exportTranslations('event_'.$id);
           

        }
        catch (\Exception $e)
        {
            return $e->getMessage();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Events  $events
     * @return \Illuminate\Http\Response
     */


    public function updateImage(Request $request)
    {
        try {

            $translate3 = Translations::where('locale', $request->lang)->where('group', 'event_'.$request->eventId)->where('key', $request->eventId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();



            $this->manager->exportTranslations('event_'.$request->eventId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }


//************************************ DELETE ************************************//



    public function destroy(Events $events, Request $request)
    {
        try{

            $id = $request->id;


            File::deleteDirectory(public_path('images/events/'.$id));
            
            Events::where('id', $id)->delete();
            

            Translations::where('group', 'event_'.$id)->delete();

            $this->manager->cleanTranslations();

        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }
    }
}
