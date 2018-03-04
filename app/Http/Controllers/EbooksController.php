<?php

/*
***************************************************************************************************************

*********************************************** EBOOKS ************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Ebooks;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use Session;
use File;
use App\Http\Middleware\LangMiddleware;

class EbooksController extends Controller
{
	protected $manager;

    public function __construct(Manager $manager)
    {
        $this->manager = $manager;
        $this->middleware(['auth', 'isAdmin']);
    }

    public function view()
    {
        return view('backoffice.ebooks.index');
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

        return view('backoffice.ebooks.edit');
    }


//************************************ VIEW EBOOKS LIST ************************************//
 

    public function index()
    {
    	$ebooks = Ebooks::all();

        $data = $ebooks->map(function($ebooks){
            return [
                'id'   => $ebooks->id,
                'Date' => "$ebooks->created_at",
                'Name' => $ebooks->name
            ];
        });

        if($ebooks->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'ebooks',
                    'tableName' => 'Ebooks',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'ebooks',
                    'tableName' => 'Ebooks',
                    'columns'   => '',
                    'data'      => null
                ]
            ]);   
        }

    }



//************************************ CREATE ************************************//


    public function create(Ebooks $ebooks)
    {
        return view('backoffice.ebooks.create');
    }


//************************************ STORE ************************************//


    public function store(Request $request)
    {

    	try
    	{
            $this->validate($request, [
                'name'     =>'required|max:120',
                'details'  =>'required',
                'pdf'      => 'required|mimes:pdf',
                'image'    => 'required|mimes:jpeg,jpg,png',
                'imageAlt' => 'required',
            ]);

            if(Ebooks::where('name', $request->name)->exists())
            {
                $data = array(
                    'status'    => 'error',
                    'message'   => 'This ebook already exist, please change the name and submit again',
                );

                return response()->json($data, 409);
            }
            else
            {
                $lang = new LangMiddleware;
                $languagesList = $lang->languagesList();

                

        		$position = Ebooks::count() + 1;


    		  	$ebook = new Ebooks;
    	    	$ebook->name = $request->name;
    	    	$ebook->details = $request->details;
    	    	$ebook->img = 'temp';
    	    	$ebook->alt = $request->imageAlt;
    	    	$ebook->pdf = 'temp';
    	    	$ebook->position = $position;
    	    	$ebook->save();


                $basePathImage = 'images/ebooks/'.$ebook->id.'/';

                $basePathPdf = 'pdfs/ebooks/'.$ebook->id.'/en/';

                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->pdf->getClientOriginalExtension();

                $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->image->getClientOriginalExtension();

                $ebook->name = 'ebook_'.$ebook->id.'.'.$ebook->id.'_name';
                $ebook->details = 'ebook_'.$ebook->id.'.'.$ebook->id.'_details';
                $ebook->alt = 'ebook_'.$ebook->id.'.'.$ebook->id.'_alt';
                $ebook->img = $basePathImage.$imageName;
                $ebook->pdf = 'ebook_'.$ebook->id.'.'.$ebook->id.'_pdf';
                $ebook->save();

    	    	request()->pdf->move($basePathPdf, $pdfName);

                request()->image->move($basePathImage, $imageName);

                foreach ($languagesList as $key => $lang) 
                {

                    $translate = new Translations;
                    $translate->status = 0;
                    $translate->locale = $lang;
                    $translate->group = "ebook_".$ebook->id;
                    $translate->key = $ebook->id.'_name';
                    $translate->value = $request->name;
                    $translate->save();

                    $translate2 = new Translations;
                    $translate2->status = 0;
                    $translate2->locale = $lang;
                    $translate2->group = "ebook_".$ebook->id;
                    $translate2->key = $ebook->id.'_details';
                    $translate2->value = $request->details;
                    $translate2->save();

                    $translate3 = new Translations;
                    $translate3->status = 0;
                    $translate3->locale = $lang;
                    $translate3->group = "ebook_".$ebook->id;
                    $translate3->key = $ebook->id.'_alt';
                    $translate3->value = $request->imageAlt;
                    $translate3->save();


                    $translate3 = new Translations;
                    $translate3->status = 0;
                    $translate3->locale = $lang;
                    $translate3->group = "ebook_".$ebook->id;
                    $translate3->key = $ebook->id.'_pdf';
                    $translate3->value = $basePathPdf.$pdfName;
                    $translate3->save();
                }


    	    	

    	    	$this->manager->exportTranslations('ebook_'.$ebook->id);
            }

		}
		catch (\Exception $e)
        {
            return $e;
        }

        return response()->json('Success', 200);

    }



//************************************ VIEW EDIT ************************************//


    public function edit(Ebooks $ebooks, Request $request)
    {
        $id = $request->id;
        $ebook = $ebooks->ebookEdit($id);

        $ebooks = $ebook->map(function($ebook){
            return [
                'id'      => $ebook->id,
                'name'    => $ebook->name,
                'details' => $ebook->details,
                'image'   => $ebook->img,
                'alt'     => $ebook->alt,
                'pdf'     => $ebook->pdf,
            ];
        });

        return response()->json(['ebook' => $ebooks['0']]);
    }



//************************************ VIEW EBOOK BY USER ************************************//


    public function show(Ebooks $ebooks, Request $request)
    {
        $id = $request->id;
        $ebook = $ebooks->ebookEdit($id);

        $ebooks = $ebook->map(function($ebook){
            return [
                'id' => $ebook->id,
                'name' => $ebook->name,
                'details' => $ebook->details,
                'image' => $ebook->img,
                'alt' => $ebook->alt,
                'pdf' => $ebook->pdf,
            ];
        });

        return response()->json(['ebook' => $ebooks]);
    }



//************************************ UPDATE ************************************//


    public function update(Request $request)
    {
        try
        {
            $id = $request->id;
            $lang = $request->language;
            $ebook = Ebooks::find($id);

            if($lang == 'en')
            {

                $this->validate($request, [
                    'name'     =>'required|max:120',
                    'details'  =>'required',
                    'pdf'      => 'mimes:pdf',
                    'image'    => 'mimes:jpeg,jpg,png',
                    'imageAlt' => 'required',
                ]);



                if($request->hasFile('image'))
                {
                    $old = Ebooks::where('id', $id)->firstOrFail();

                    \File::delete(public_path($old->img));

                    $old->img = 'temp';
                    $old->save();

                    $basePathImage = 'images/ebooks/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                        md5(date('ymdhis')) .
                        '.' .
                        request()->image->getClientOriginalExtension();

                    request()->image->move($basePathImage, $imageName);

                    $ebook->img = $basePathImage.$imageName;

                    $translate3 = Translations::where('locale', $lang)->where('group', 'ebook_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();

                }

                $ebook->save();
            }


            if($request->hasFile('pdf'))
            {

                $basePathPdf = 'pdfs/ebooks/'.$id.'/'.$lang.'/';
                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                    md5(date('ymdhis')) .
                    '.' .
                    request()->pdf->getClientOriginalExtension();


                if(file_exists($basePathPdf.$pdfName))
                {
                    \File::delete(public_path($basePathPdf.$pdfName));
                }


                request()->pdf->move($basePathPdf, $pdfName);


                $translate3 = Translations::where('locale', $lang)->where('group', 'ebook_'.$id)->where('key', $id.'_pdf')->firstOrFail();
                $translate3->value = $basePathPdf.$pdfName;
                $translate3->save();
            }

            $translate = Translations::where('locale', $lang)->where('group', 'ebook_'.$id)->where('key', $id.'_name')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $translate2 = Translations::where('locale', $lang)->where('group', 'ebook_'.$id)->where('key', $id.'_details')->firstOrFail();
            $translate2->value = $request->details;
            $translate2->save();

            $this->manager->exportTranslations('ebook_'.$id);


            return response()->json('Success', 200);



        }
        catch (\Exception $e)
        {
            return $e->getMessage();
        }
    }



    public function updateImage(Request $request)
    {
        try {

            $translate3 = Translations::where('locale', $request->lang)->where('group', 'ebook_'.$request->ebookId)->where('key', $request->ebookId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();



            $this->manager->exportTranslations('ebook_'.$request->ebookId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }




//************************************ DELETE ************************************//


    public function destroy(Ebooks $ebooks, Request $request)
    {
        try{

            $id = $request->id;

        	$ebook = Ebooks::where('id', $id)->firstOrFail();

            \File::deleteDirectory(public_path('images/ebooks/'.$id));


    		\File::deleteDirectory(public_path('pdfs/ebooks/'.$id));
            

            
            Ebooks::where('id', $id)->delete();
			

            Translations::where('group', 'ebook_'.$id)->delete();

            $this->manager->cleanTranslations();

        }
        catch (Exception $e)
        {
            return $e->getMessage();
        }

    }
}
