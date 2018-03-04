<?php

/*
***************************************************************************************************************

*********************************************** PROJECTS ************************************************

***************************************************************************************************************
*/



namespace App\Http\Controllers;

use App\Projects;
use App\ProjectsGallery;
use App\ProjectsGalleryHR;
use App\ProjectsProducts;
use App\ProjectsRelated;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use Session;
use File;
use App\Http\Middleware\LangMiddleware;


class ProjectsController extends Controller
{
    protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        //$this->middleware(['auth', 'isAdmin']); //isAdmin middleware lets only users with a //specific permission permission to access these resources
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


//************************************ VIEW PROJECTS MODEL ON HOMEPAGE ************************************//

    public function view()
    {
        return view('backoffice.projects.index');
    }


//************************************ VIEW PROJECTS LIST ************************************//

    public function index(Projects $project)
    {
        $projects = Projects::all();

        $data = $projects->map(function($projects){
            return [
                'id'        => $projects->id,
                'Date'      => "$projects->created_at",
                'Title'     => $projects->name,
                'Sub Title' => $projects->subTitle,
                'Author'    => $projects->autor,
                'Location'  => $projects->location,
            ];
        });

        if($projects->count() > 0)
        {
            return response()->json(['table' => [
                'tableId'   => 'project',
                'tableName' => 'Projects',
                'columns'   => array_keys($data[0]),
                'data'      => $data
            ]
            ]);
        }
        else
        {
            return response()->json(['table' => [
                'tableId'   => 'project',
                'tableName' => 'Projects',
                'columns'   => '',
                'data'      => null
            ]
            ]);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Products  $products
     * @return \Illuminate\Http\Response
     */
    public function editView($lang, $id)
    {
        \App::setlocale($lang);

        return view('backoffice.projects.edit');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Projects $project)
    {
        $products = $project->products();
        $projects = $project->projects();

        $products = $products->map(function($products){
            return [
                'id' => $products->id,
                'name' => $products->name
            ];
        });


        $projects = $projects->map(function($projects){
            return [
                'id' => $projects->id,
                'name' => $projects->name
            ];
        });


        return response()->json(['products' => $products, 'projects' => $projects]);
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
        try
        {
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();



            $this->validate($request, [
                'name'      =>'required|max:120',
                'subTitle' => 'required',
                'autor' => 'required',
                'pdf' => 'required|mimes:pdf',
                'imageAlt' => 'required',
                'imageHrAlt' => 'required',
                'location' => 'required',
                'details'   =>'required',
                //'projects_related' => 'required',
                //'products_related' => 'required',
            ]);

            $position = Projects::count() + 1;


            $project = new Projects;
            $project->name = $request->name;
            $project->subTitle = $request->subTitle;
            $project->details = $request->details;
            $project->position = $position;
            $project->pdf = 'temp';
            $project->autor = $request->autor;
            $project->location = $request->location;
            $project->save();


            $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                md5(date('ymdhis')) .
                '.' .
                request()->pdf->getClientOriginalExtension();


            $basePathImages = 'images/projects/'.$project->id.'/';
            $basePathImagesHr = 'imagesHr/projects/'.$project->id.'/';
            $basePathPdf = 'pdfs/projects/'.$project->id.'/en/';


            $project->name = 'project_'.$project->id.'.'.$project->id.'_name';
            $project->subTitle = 'project_'.$project->id.'.'.$project->id.'_subTitle';
            $project->details = 'project_'.$project->id.'.'.$project->id.'_details';
            $project->pdf = 'project_'.$project->id.'.'.$project->id.'_pdf';
            $project->save();


            request()->pdf->move($basePathPdf, $pdfName);

            for($i=0;$i < $request->counterImage;$i++)
            {
                $imageName = pathinfo(request()->image[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                    md5(date('ymdhis')) .
                    $i .
                    '.' .
                    request()->image[$i]->getClientOriginalExtension();

                $position = ProjectsGallery::where('id_project', $project->id)->count();

                $image = new ProjectsGallery;
                $image->id_project = $project->id;
                $image->img = $basePathImages.$imageName;
                $image->alt = 'temp';
                $image->position = $position;
                $image->save();


                $image->alt = 'project_'.$project->id.'.'.$image->id.'_altImage';
                $image->save();

                request()->image[$i]->move($basePathImages, $imageName);


                foreach ($languagesList as $key => $lang)
                {

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = 'project_'.$project->id;
                    $translate->key = $image->id.'_altImage';
                    $translate->value = $request->imageAlt;
                    $translate->save();

                }
            }

            for($i=0;$i < $request->counterImageHr;$i++)
            {
                $imageName = pathinfo(request()->imageHr[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                    md5(date('ymdhis')) .
                    $i .
                    '.' .
                    request()->imageHr[$i]->getClientOriginalExtension();

                $position = ProjectsGalleryHR::where('id_project', $project->id)->count();

                $imageHr = new ProjectsGalleryHR;
                $imageHr->id_project = $project->id;
                $imageHr->img = $basePathImagesHr.$imageName;
                $imageHr->alt = 'temp';
                $imageHr->position = $position;
                $imageHr->save();


                $imageHr->alt = 'project_'.$project->id.'.'.$imageHr->id.'_altImageHr';
                $imageHr->save();

                request()->imageHr[$i]->move($basePathImagesHr, $imageName);

                foreach ($languagesList as $key => $lang)
                {

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = 'project_'.$project->id;
                    $translate->key = $imageHr->id.'_altImageHr';
                    $translate->value = $request->imageHrAlt;
                    $translate->save();
                }

            }

            /*
                PRODUCTS IN PROJECT
            */

            if (!empty($request->relatedProducts))
            {
                $relatedPayload = explode(',', $request->relatedProducts);

                foreach ($relatedPayload as $key => $related)
                {
                    $prods = new ProjectsProducts;
                    $prods->id_project = $project->id;
                    $prods->id_product = $related;
                    $prods->save();
                }
            } else {

                if(ProjectsProducts::where('id_project', $request->id)->exists())
                {
                    ProjectsProducts::where('id_project', $request->id)->delete();
                }
            }



            /*
                RELATED PROJECTS
            */

            if (!empty($request->relatedProjects)) {

                $relatedPayload = explode(',', $request->relatedProjects);


                foreach ($relatedPayload as $key => $related)
                {
                    $projectsRelated = new ProjectsRelated;
                    $projectsRelated->id_project = $project->id;
                    $projectsRelated->id_proj_related = $related;
                    $projectsRelated->save();
                }
            }
            else
            {
                if(ProjectsRelated::where('id_project', $request->id)->exists())
                {
                    ProjectsRelated::where('id_project', $request->id)->delete();
                }
            }


            foreach ($languagesList as $key => $lang)
            {

                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'project_'.$project->id;
                $translate->key = $project->id.'_name';
                $translate->value = $request->name;
                $translate->save();

                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'project_'.$project->id;
                $translate2->key = $project->id.'_details';
                $translate2->value = $request->details;
                $translate2->save();

                $translate4 = new Translations;
                $translate4->status = 0;
                $translate4->locale = $lang;
                $translate4->group = 'project_'.$project->id;
                $translate4->key = $project->id.'_subTitle';
                $translate4->value = $request->subTitle;
                $translate4->save();

                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'project_'.$project->id;
                $translate->key = $project->id.'_pdf';
                $translate->value = $basePathPdf.$pdfName;
                $translate->save();
            }




            $this->manager->exportTranslations('project_'.$project->id);


        }
        catch (Exception $e) {
            $data = array(
                'status'    => 'error',
                'message'   => 'An error occurred please try again later',
            );

            return response()->json($data, 409);
        }

        return response()->json('Success', 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Projects  $projects
     * @return \Illuminate\Http\Response
     */

//************************************ VIEW PROJECT BY USER ************************************//


    public function show(Projects $projects, Request $request)
    {
        $id = $request->id;

        $project = $projects->projectsEdit($id);
        $image   = $projects->imagesEdit($id);
        $imageHr = $projects->imagesHrEdit($id);


        $projects = $project->map(function($project){
            return [
                'id' => $project->id,
                'title' => $project->name,
                'subTitle' => $project->subTitle,
                'details' => $project->details,
                'autor' => $project->autor,
                'location' => $project->location,
            ];
        });

        $images = $image->map(function($image){
            return [
                'id' => $image->id_image,
                'image' => $image->img,
                'alt' => $image->alt,
            ];
        });

        $imagesHr = $imageHr->map(function($imageHr){
            return [
                'id' => $imageHr->id_image_hr,
                'image' => $imageHr->img,
                'alt' => $imageHr->alt,
            ];
        });


        return response()->json([
            'data' => $projects,
            'images' => $images,
            'imagesHr' => $imagesHr
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Projects  $projects
     * @return \Illuminate\Http\Response
     */


//************************************ VIEW EDIT PROJECT ************************************//



    public function edit(Projects $projects, Request $request)
    {

        try {

            $id     = $request->id;

            $project = $projects->projectsEdit($id);
            $image   = $projects->imagesEdit($id);
            $imageHr = $projects->imagesHrEdit($id);


            $projects = $project->map(function($project){
                return [
                    'id' => $project->id,
                    'name' => $project->name,
                    'subTitle' => $project->subTitle,
                    'details' => $project->details,
                    'autor' => $project->autor,
                    'location' => $project->location,
                    'pdf' => $project->pdf,
                ];
            });

            $images = $image->map(function($image){
                return [
                    'id' => $image->id_image,
                    'image' => $image->img,
                    'alt' => $image->alt,
                ];
            });

            $imagesHr = $imageHr->map(function($imageHr){
                return [
                    'id' => $imageHr->id_image_hr,
                    'image' => $imageHr->img,
                    'alt' => $imageHr->alt,
                ];
            });

            /*
            RELATED PROJS
        */

            $listProjectsRelated = array();


            if(ProjectsRelated::where('id_project', $id)->exists())
            {
                $related = Projects::projectsRelated($id);

                foreach ($related as $key => $rel)
                {
                    $proj[$key] = $rel->related;
                }

                $listProjectsRelated = $proj;
            }


            /*
                RELATED PRODS
            */


            $listProductsRelated = array();

            if(ProjectsProducts::where('id_project', $id)->exists())
            {
                $related = Projects::prodsRelated($id);

                foreach ($related as $key => $rel)
                {
                    $prod[$key] = $rel->related;
                }

                $listProductsRelated = $prod;
            }

            return response()->json([
                'project'         => $projects['0'],
                'images'          => $images,
                'imagesHr'        => $imagesHr,
                'relatedProjects' => $listProjectsRelated,
                'relatedProducts' => $listProductsRelated
            ]);

        } catch (\Exception $e) {

            return response()->json($e, 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Projects  $projects
     * @return \Illuminate\Http\Response
     */



//************************************ UPDATE ************************************//



    public function update(Request $request, Projects $projects)
    {
        try{
            $this->validate($request, [
                'name'      =>'required|max:120',
                'subTitle' => 'required',
                'autor' => 'required',
                'pdf' => 'mimes:pdf',
                'imageAlt' => 'required',
                'imageHrAlt' => 'required',
                'location' => 'required',
                'details'   =>'required',
                //'projects_related' => 'required',
                //'products_related' => 'required',
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $id = $request->id;
            $lang = $request->language;

            $position = Projects::find($id);

            $project = Projects::find($id);
            $project->position = $position->position;
            $project->autor = $request->autor;
            $project->location = $request->location;
            $project->save();

            if($request->pdf != null && $request->pdf != 'null')
            {
                $basePathPdf = 'projects/'.$id.'/'.$lang.'/';

                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                    md5(date('ymdhis')) .
                    '.' .
                    request()->pdf->getClientOriginalExtension();

                if(file_exists($basePathPdf.$pdfName))
                {
                    \File::delete(public_path($basePathPdf.$pdfName));
                }

                request()->pdf->move($basePathPdf, $pdfName);

            }




            if($request->counterImage > 0)
            {
                $basePathImages = 'images/projects/'.$project->id.'/';


                for($i=0;$i < $request->counterImage;$i++)
                {
                    $imageName = pathinfo(request()->image[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                        md5(date('ymdhis')) .
                        $i .
                        '.' .
                        request()->image[$i]->getClientOriginalExtension();

                    $position = ProjectsGallery::where('id_project', $project->id)->count();

                    $image = new ProjectsGallery;
                    $image->id_project = $project->id;
                    $image->img = $basePathImages.$imageName;
                    $image->alt = 'temp';
                    $image->position = $position;
                    $image->save();


                    $image->alt = 'project_'.$project->id.'.'.$image->id.'_altImage';
                    $image->save();

                    request()->image[$i]->move($basePathImages, $imageName);


                    foreach ($languagesList as $key => $lang)
                    {

                        $translate = new Translations;
                        $translate->status = 0;
                        $translate->locale = $lang;
                        $translate->group = 'project_'.$project->id;
                        $translate->key = $image->id.'_altImage';
                        $translate->value = $request->imageAlt;
                        $translate->save();
                    }
                }
            }

            if($request->counterImageHr > 0)
            {
                $basePathImagesHr = 'imagesHr/projects/'.$project->id.'/';

                for($i=0;$i < $request->counterImageHr;$i++)
                {
                    $imageName = pathinfo(request()->imageHr[$i]->getClientOriginalName(), PATHINFO_FILENAME) .
                        md5(date('ymdhis')) .
                        $i .
                        '.' .
                        request()->imageHr[$i]->getClientOriginalExtension();

                    $position = ProjectsGalleryHR::where('id_project', $project->id)->count();

                    $imageHr = new ProjectsGalleryHR;
                    $imageHr->id_project = $project->id;
                    $imageHr->img = $basePathImagesHr.$imageName;
                    $imageHr->alt = 'temp';
                    $imageHr->position = $position;
                    $imageHr->save();


                    $imageHr->alt = 'project_'.$project->id.'.'.$imageHr->id.'_altImageHr';
                    $imageHr->save();

                    request()->imageHr[$i]->move($basePathImagesHr, $imageName);

                    foreach ($languagesList as $key => $lang)
                    {

                        $translate = new Translations;
                        $translate->status = 0;
                        $translate->locale = $lang;
                        $translate->group = 'project_'.$project->id;
                        $translate->key = $imageHr->id.'_altImageHr';
                        $translate->value = $request->imageHrAlt;
                        $translate->save();
                    }

                }
            }

            if (!empty($request->relatedProducts))
            {
                if(ProjectsProducts::where('id_project', $request->id)->exists())
                {
                    ProjectsProducts::where('id_project', $request->id)->delete();
                }

                $relatedPayload = explode(',', $request->relatedProducts);

                foreach ($relatedPayload as $key => $related)
                {
                    $prods = new ProjectsProducts;
                    $prods->id_project = $project->id;
                    $prods->id_product = $related;
                    $prods->save();
                }
            } else {

                if(ProjectsProducts::where('id_project', $request->id)->exists())
                {
                    ProjectsProducts::where('id_project', $request->id)->delete();
                }
            }

            /*
                RELATED PROJECTS
            */

            if (!empty($request->relatedProjects)) {

                if(ProjectsRelated::where('id_project', $request->id)->exists())
                {
                    ProjectsRelated::where('id_project', $request->id)->delete();
                }

                $relatedPayload = explode(',', $request->relatedProjects);


                foreach ($relatedPayload as $key => $related)
                {
                    $projectsRelated = new ProjectsRelated;
                    $projectsRelated->id_project = $project->id;
                    $projectsRelated->id_proj_related = $related;
                    $projectsRelated->save();
                }
            }
            else
            {
                if(ProjectsRelated::where('id_project', $request->id)->exists())
                {
                    ProjectsRelated::where('id_project', $request->id)->delete();
                }
            }



            $translate = Translations::where('locale', $lang)->where('group', 'project_'.$project->id)->where('key', $project->id.'_name')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();



            $translate2 = Translations::where('locale', $lang)->where('group', 'project_'.$project->id)->where('key', $project->id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();



            $translate4 = Translations::where('locale', $lang)->where('group', 'project_'.$project->id)->where('key', $project->id.'_subTitle')->firstOrFail();
            $translate4->key = $project->id.'_subTitle';
            $translate4->value = $request->subTitle;
            $translate4->save();


            $this->manager->exportTranslations('project_'.$project->id);


        }
        catch (Exception $e) {
            return $e->getMessage();
        }

    }


    public function updateImages(Request $request)
    {
        try{
            $translate = Translations::where('locale', $request->lang)
                ->where('group' , 'project_'.$request->projectId)
                ->where('key' , $request->imageId.'_altImage')
                ->firstOrFail();

            $translate->value = $request->imageAlt;
            $translate->save();

            $this->manager->exportTranslations('project_'.$request->projectId);

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }


    public function updateImagesHr(Request $request)
    {

        try{
            $translate = Translations::where('locale', $request->lang)
                ->where('group' , 'project_'.$request->projectId)
                ->where('key' , $request->imageId.'_altImageHr')
                ->firstOrFail();
            $translate->value = $request->imageHrAlt;
            $translate->save();

            $this->manager->exportTranslations('project_'.$request->projectId);

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }


    public function destroyImages(Request $request)
    {
        try {

            $image = ProjectsGallery::where('id', $request->imageId)->where('id_project', $request->projectId)->firstOrFail();

            \File::delete(public_path($image->img));
            ProjectsGallery::where('id', $request->imageId)->where('id_project', $request->projectId)->delete();

            Translations::where('group', 'project_'.$request->projectId)
                ->where('key', $request->imageId.'_altImage')
                ->delete();

            $this->manager->cleanTranslations();

            return response()->json('Success', 200);

        } catch(\Exception $e) {
            return response()->json($e, 500);
        }
    }


    public function destroyImagesHr(Request $request)
    {
        try {

            $image = ProjectsGalleryHr::where('id', $request->imageId)->where('id_project', $request->projectId)->firstOrFail();

            \File::delete(public_path($image->img));
            ProjectsGalleryHr::where('id', $request->imageId)->where('id_project', $request->projectId)->delete();


            Translations::where('group', 'project_'.$request->projectId)
                ->where('key', $request->imageId.'_altImageHr')
                ->delete();

            $this->manager->cleanTranslations();

            return response()->json('Success', 200);

        } catch(\Exception $e) {
            return response()->json($e, 500);
        }
    }


//************************************ DELETE ************************************//



    public function destroy(Projects $projects, Request $request)
    {

        try{
            $id = $request->id;

            $project = Projects::where('id', $id)->firstOrFail();

            if(ProjectsRelated::where('id_project', $id)->exists())
                ProjectsRelated::where('id_project', $id)->delete();

            ProjectsProducts::where('id_project', $id)->delete();
            ProjectsGalleryHR::where('id_project', $id)->delete();
            ProjectsGallery::where('id_project', $id)->delete();
            Projects::where('id', $id)->delete();
            Translations::where('group', 'project_'.$id)->delete();


            \File::deleteDirectory(public_path('images/projects/'.$id));
            \File::deleteDirectory(public_path('imagesHr/projects/'.$id));
            \File::deleteDirectory(public_path('pdfs/projects/'.$id));

            $this->manager->cleanTranslations();
        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }


    }

    public function getFeaturedProjects(Projects $project)
    {
        $projects = $project->projectsFeacturedRequest();

        $data = $projects->map(function($projects){
            return [
                'id'       => $projects->id,
                'name'     => $projects->name,
                'subTitle' => $projects->subTitle,
                'image'    => $projects->img,
                'alt'      => $projects->alt,
            ];
        });

        return response()->json(['data' => $data]);
    }
}
