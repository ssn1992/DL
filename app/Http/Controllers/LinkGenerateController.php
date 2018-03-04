<?php

namespace App\Http\Controllers;

use App\LinkGenerate;
use Illuminate\Http\Request;

class LinkGenerateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $links = LinkGenerate::all();

        $data = $links->map(function($links){
            return [
                'id' => $links->id,
                'url' => $links->url
            ];
        });

        if($links->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId' => 'links',
                    'tableName' => 'LinkGenerate',
                    'columns'   => array_keys($data[0]),
                    'data' => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId' => 'links',
                    'tableName' => 'LinkGenerate',
                    'columns'   => '',
                    'data' => ''
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
            'url'    => 'mimes:zip,rar,pdf',
        ]);

        try
        {
            if(LinkGenerate::where('name', $request->name)->exists())
            {
                $data = array(
                    'status'    => 'error',
                    'message'   => 'This link already exist, please change the name and submit again',
                );

                return response()->json($data, 409);
            }
            else
            {

                $link = new LinkGenerate;
                $link->url = 'temp';
                $link->save();

                $basePathPdf = 'pdfs/links/'.$link->id.'/';

                $pdfName = pathinfo(request()->pdf->getClientOriginalName(), PATHINFO_FILENAME) .
                             md5(date('ymdhis')) .
                             '.' .
                             request()->pdf->getClientOriginalExtension();


                $link->url = $basePathPdf.$pdfName;
                $link->save();

                request()->pdf->move($basePathPdf, $pdfName);

                
            }

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
     * @param  \App\LinkGenerate  $linkGenerate
     * @return \Illuminate\Http\Response
     */
    public function show(LinkGenerate $linkGenerate)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\LinkGenerate  $linkGenerate
     * @return \Illuminate\Http\Response
     */
    public function edit(LinkGenerate $linkGenerate)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\LinkGenerate  $linkGenerate
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, LinkGenerate $linkGenerate)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\LinkGenerate  $linkGenerate
     * @return \Illuminate\Http\Response
     */
    public function destroy(LinkGenerate $linkGenerate, Request $request)
    {
        $id = $request->id;

        if(\File::exists('pdfs/links/'.$id.'/'))
            {
              \File::delete('pdfs/links/'.$id.'/');
              LinkGenerate::where('id', $id)->delete();

              return responses()->json('Success', 200);

            }else{
              return responses()->json('Error', 409);
            }
    }
}
