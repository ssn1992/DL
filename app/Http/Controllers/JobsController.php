<?php

namespace App\Http\Controllers;

use App\JobsResponses;
use App\JobsCategory;
use App\JobsLocation;
use App\JobsDepartments;
use App\JobsCandidates;
use App\JobsOffer;
use App\JobsCandidatesLanguages;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use App\Http\Middleware\LangMiddleware;

class JobsController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

/*
***************************************************************************************************************

*********************************************** OFFER MANAGE **************************************************

***************************************************************************************************************
*/
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        try
        {
            $this->validate($request, [
                'category' => 'required',
                'location' => 'required',
                'department' => 'required',
                'title' => 'required|max:80',
                'subTitle' => 'required|max:80',
                'description' => 'required',
                'responsabilities' => 'required',
                'requirements' => 'required'
            ]);       

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $offer = new JobsOffer;
            $offer->id_category = $request->category;
            $offer->id_location = $request->location;
            $offer->id_department = $request->department;
            $offer->title = 'temp';
            $offer->subTitle = 'temp';
            $offer->description = 'temp';
            $offer->responsabilities = 'temp';
            $offer->requirements = 'temp';
            $offer->visible = $request->visible;
            $offer->save();

            $offer->title = 'jobs_offer_'.$offer->id.'.'.'_title';
            $offer->subTitle = 'jobs_offer_'.$offer->id.'.'.'_subTitle';
            $offer->description = 'jobs_offer_'.$offer->id.'.'.'_description';
            $offer->responsabilities = 'jobs_offer_'.$offer->id.'.'.'_responsabilities';
            $offer->requirements = 'jobs_offer_'.$offer->id.'.'.'_requirements';
            $offer->save();

                foreach ($languagesList as $key => $lang) 
                {
                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "jobs_offer_".$offer->id;
                    $translate->key = $offer->id.'_title';
                    $translate->value = $request->title;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "jobs_offer_".$offer->id;
                    $translate->key = $offer->id.'_subTitle';
                    $translate->value = $request->subTitle;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "jobs_offer_".$offer->id;
                    $translate->key = $offer->id.'_description';
                    $translate->value = $request->description;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "jobs_offer_".$offer->id;
                    $translate->key = $offer->id.'_responsabilities';
                    $translate->value = $request->responsabilities;
                    $translate->save();

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "jobs_offer_".$offer->id;
                    $translate->key = $offer->id.'_requirements';
                    $translate->value = $request->requirements;
                    $translate->save();
                }

                $this->manager->exportTranslations('jobs_offer_'.$offer->id);



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
     * @param  \App\JobsResponses  $jobsResponses
     * @return \Illuminate\Http\Response
     */
    
    public function show(JobsResponses $jobsResponses)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\JobsResponses  $jobsResponses
     * @return \Illuminate\Http\Response
     */
    public function edit(JobsResponses $jobsResponses, Request $request)
    {
        $id = $request->id;

        $offer = JobsOffer::where('id', $id)->get();

        $data_offer = $offer->map(function($offer){
            return [
                'id' => $offer->id,
                'category' => $offer->id_category,
                'location' => $offer->id_location,
                'department' => $offer->id_department,
                'title' => $offer->title,
                'subTitle' => $offer->subTitle,
                'description' => $offer->description,
                'responsabilities' => $offer->responsabilities,
                'requirements' => $offer->requirements, 
            ];
        });

        return response()->json(['data' => $data_offer]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\JobsResponses  $jobsResponses
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, JobsResponses $jobsResponses)
    {
        try{

            $this->validate($request, [
                'category' => 'required',
                'location' => 'required',
                'department' => 'required',
                'title' => 'required|max:80',
                'subTitle' => 'required|max:80',
                'description' => 'required',
                'responsabilities' => 'required',
                'requirements' => 'required'
            ]);

            $id = $request->id;
            $lang = $request->language;

            $offer = JobsOffer::find($id);
            $offer->id_category = $request->category;
            $offer->id_location = $request->location;
            $offer->id_department = $request->department;
            $offer->visible = $request->visible;
            $offer->save();

            $translate = Translations::where('locale', $lang)->where('group', 'jobs_offer_'.$id)->where('key', $id.'_title')->firstOrFail();
            $translate->value = $request->title;
            $translate->save();

            $translate = Translations::where('locale', $lang)->where('group', 'jobs_offer_'.$id)->where('key', $id.'_subTitle')->firstOrFail();
            $translate->value = $request->subTitle;
            $translate->save();

            $translate = Translations::where('locale', $lang)->where('group', 'jobs_offer_'.$id)->where('key', $id.'_description')->firstOrFail();
            $translate->value = $request->description;
            $translate->save();

            $translate = Translations::where('locale', $lang)->where('group', 'jobs_offer_'.$id)->where('key', $id.'_responsabilities')->firstOrFail();
            $translate->value = $request->responsabilities;
            $translate->save();

            $translate = Translations::where('locale', $lang)->where('group', 'jobs_offer_'.$id)->where('key', $id.'_requirements')->firstOrFail();
            $translate->value = $request->requirements;
            $translate->save();            

            $this->manager->exportTranslations('jobs_offer_'.$id);

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
     * @param  \App\JobsResponses  $jobsResponses
     * @return \Illuminate\Http\Response
     */

    public function destroy(JobsResponses $jobsResponses, Request $request)
    {
        try
        {
            $id = $request->id;

            Translations::where('group', 'jobs_offer_'.$id)->delete();
            JobsResponses::where('id_offer', $id)->delete();
            JobsOffer::where('id', $id)->delete();

            return response()->json('Success', 200);
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }


/*
***************************************************************************************************************

*********************************************** OFFER CANDIDATES ***********************************************

***************************************************************************************************************
*/

    public function storeCandidates(Request $request)
    {
        try{

            $this->validate($request, [
                'offer' => 'required',
                'firstName' => 'required',
                'lastName' => 'required',
                'email' => 'required',
                'phone' => 'required',
                'address' => 'required',
                'city' => 'required',
                'postCode' => 'required',
                'country' => 'required',
                'birthdate' => 'required',
                'gender' => 'required',
                'nacionality' => 'required',
                'academicDegree' => 'required',
                'workExp' => 'required',
                'currentCompany' => 'max:50',
                'currentSector' => 'max:50',
                'currentRole' => 'max:50',
                'currentStartDate' => 'required',
                'prevCompany' => 'max:50',
                'prevSector' => 'max:50',
                'prevRole' => 'max:50',
                'prevStartDate' => 'required',
                'prevEndDate' => 'required',
                'driveLicense' => 'required',
                'travel' => 'required',
                'cv' => 'required',
                'school' => 'required',
                'linkdin' => 'required',
                'portfolioLink' => 'max:200',
                'photo' => 'mimes:jpg,jpeg,png',
                'language[0]' => 'required',
            ]);
            

            $candidate = new JobsCandidates;
            $candidate->firstName = $request->firstName;
            $candidate->lastName = $request->lastName;
            $candidate->email = $request->email;
            $candidate->phone = $request->phone;
            $candidate->address = $request->address;
            $candidate->city = $request->city;
            $candidate->postCode = $request->postCode;
            $candidate->country = $request->country;
            $candidate->state = $request->state;
            $candidate->gender = $request->gender;
            $candidate->birthdate = $request->birthdate;
            $candidate->nacionality = $request->nacionality;
            $candidate->academicDegree = $request->academicDegree;
            $candidate->workExp = $request->workExp;
            if($request->workExp == 'yes')
            {
                $candidate->currentCompany = $request->currentCompany;
                $candidate->currentSector = $request->currentSector;
                $candidate->currentRole = $request->currentRole;
                $candidate->currentStartDate = $request->currentStartDate;
                $candidate->prevCompany = $request->prevCompany;
                $candidate->prevSector = $request->prevSector;
                $candidate->prevRole = $request->prevRole;
                $candidate->prevStartDate = $request->prevStartDate;
                $candidate->prevEndDate = $request->prevEndDate;
            }
            $candidate->driveLicense = $request->driveLicense;
            $candidate->travel = $request->travel;
            $candidate->cv = 'temp';
            $candidate->school = $request->school;
            $candidate->linkdin = $request->linkdin;
            $candidate->portfolioLink = $request->portfolioLink;
            $candidate->save();



            $basePath = 'jobs/candidates/'.$candidate->id.'/'; 

            if($request->hasFile('photo'))
            {
                $imageName = pathinfo(request()->photo->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->photo->getClientOriginalExtension();

                request()->photo->move($basePath, $imageName);

                $candidate->photo = $basePath.$imageName;
            }

            if($request->hasFile('portfolioFile'))
            {
                $portfolioName = pathinfo(request()->portfolioFile->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->portfolioFile->getClientOriginalExtension();

                request()->portfolioFile->move($basePath, $portfolioName);

                $candidate->portfolioFile = $basePath.$portfolioName;
            }


            $cvName = pathinfo(request()->cv->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->cv->getClientOriginalExtension();

            request()->cv->move($basePath, $cvName);


            $candidate->cv = $basePath.$cvName;
            $candidate->save();


            $response = new JobsResponses;
            $response->id_offer = $request->offer;
            $response->id_candidate = $candidate->id;
            $response->status = 'waiting';
            $response->save();


            /**                                 
            *                                   *
            *       LANGUAGES SKILLS            *
            *                                   *
            **/

            for($i=0;$i<$request->countLanguages;$i++)
            {
                $lang = new JobsCandidatesLanguages;
                $lang->id_candidate = $candidate->id;
                $lang->language = $request->language[$i];
                $lang->level = $request->level[$i];
                $lang->save();
            }


            return response()->json('Success', 200);
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }


    public function responseCandidates(Request $request)
    {

    }

}
