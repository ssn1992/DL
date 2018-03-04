<?php

namespace App\Http\Controllers;

use App\Materials;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use File;
use DB;
use App\Http\Middleware\LangMiddleware;


class MaterialsController extends Controller
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

        return view('backoffice.materials.edit');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $materials = Materials::all();

        $data = $materials->map(function($materials){
            return [
                'id'   => $materials->id,
                'Date' => "$materials->created_at",
                'Name' => $materials->material
            ];
        });

        if($materials->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'materials',
                    'tableName' => 'Materials',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'materials',
                    'tableName' => 'Materials',
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
        $this->validate($request, [
            'name' => 'required',
            'image' => 'required|image|mimes:jpg,png,jpeg',
            'imageAlt' => 'required',
        ]);


        try
        {
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();
            

            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();


            $material = new Materials;
            $material->material = $request->name;
            $material->img = 'temp';
            $material->alt = 'temp';
            $material->save();

            $basePathImage = 'images/materials/'.$material->id.'/';

            $material->material = 'material_'.$material->id.'.'.$material->id.'_material';
            $material->alt = 'material_'.$material->id.'.'.$material->id.'_alt';

            $material->img = $basePathImage.$imageName;
            $material->save();


            request()->image->move($basePathImage, $imageName);



            foreach ($languagesList as $key => $lang)
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'material_'.$material->id;
                $translate->key = $material->id.'_material';
                $translate->value = $request->name;
                $translate->save();


                $translate2 = new Translations;
                $translate2->status = 0;
                $translate2->locale = $lang;
                $translate2->group = 'material_'.$material->id;
                $translate2->key = $material->id.'_alt';
                $translate2->value = $request->imageAlt;
                $translate2->save();
            }

            $this->manager->exportTranslations('material_'.$material->id);


        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

        

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Materials  $materials
     * @return \Illuminate\Http\Response
     */
    public function show(Materials $materials)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Materials  $materials
     * @return \Illuminate\Http\Response
     */
    public function edit(Materials $materials, Request $request)
    {
        try {
            
            $materials = Materials::where('id', $request->id)->get();

            if($materials->count() > 0)
            {
                $dataMaterials = $materials->map(function($materials){
                    return [
                        'id'    => $materials->id,
                        'name'  => $materials->material,
                        'image' => $materials->img,
                        'alt'   => $materials->alt
                    ];
                });
            }
            else
            {
                $dataMaterials = $materials;
            }


            return response()->json(['material' => $dataMaterials['0']]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Materials  $materials
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Materials $materials)
    {
        try
        {
            $id = $request->id;
            $lang = $request->language;

            
            if($lang == 'en')
            {
                $material = Materials::find($id);

                if($request->hasFile('image'))
                {
                    File::delete(public_path('images/materials/'.$id.'/'));

                    $basePathImage = 'images/materials/'.$id.'/';
                    
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();

                    $material->img = $basePathImage.$imageName;

                    request()->image->move($basePathImage, $imageName);

                    $translate2 = Translations::where('locale', $lang)->where('group', 'material_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate2->value = $request->imageAlt;
                    $translate2->save();
                }

                $material->save();
            }


            $translate = Translations::where('locale', $lang)->where('group', 'material_'.$id)->where('key', $id.'_material')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $this->manager->exportTranslations('material_'.$id);


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

            $translate3 = Translations::where('locale', $request->lang)->where('group', 'material_'.$request->materialId)->where('key', $request->materialId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();



            $this->manager->exportTranslations('material_'.$request->materialId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Materials  $materials
     * @return \Illuminate\Http\Response
     */
    public function destroy(Materials $materials, Request $request)
    {
        try
        {
            $id = $request->id;

            File::deleteDirectory(public_path('images/materials/'.$id));
            
            DB::table('products_materials')->where('id_material', $id)->delete();
            Materials::where('id', $id)->delete();

            Translations::where('group', 'material_'.$id)->delete();

            $this->manager->cleanTranslations();
            
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }
}
