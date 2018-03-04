<?php

namespace App\Http\Controllers;

use App\Forms;
use Illuminate\Http\Request;

class FormsController extends Controller
{
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Forms  $forms
     * @return \Illuminate\Http\Response
     */
    public function show(Forms $forms)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Forms  $forms
     * @return \Illuminate\Http\Response
     */
    public function edit(Forms $forms)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Forms  $forms
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Forms $forms)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Forms  $forms
     * @return \Illuminate\Http\Response
     */
    public function destroy(Forms $forms)
    {
        //
    }


    public function sendData(Request $request)
    {
        $this->validate($request, [
            'form' => 'required',
            'download' => 'required',
            'type' => 'required',
            'pageUrl' => 'required',
        ]);

        try
        {

            $form = new Forms;
            $form->form = $request->form;
            $form->id_download = $request->download;
            $form->type = $request->type;
            $form->pageUrl = $request->pageUrl;
            $form->save();



            /**************************
                IMPACT CODE
            ***************************/


            //extract data from the post
            //set POST variables
            $url = 'http://webuzz.com.pt/subscribers_get/post_infos.php';
            $fields = array(
                'name' => $name,
                'email' => $email,
                'marca' => 'Brabbu',
                'country' => $country,
                'tipo_request' => 'Lead',
                'tipo' => 'Order now',
                'url'=> $_POST["origin"],
                'token_webuzz' => 'g2zAsJ8NrvZHmdCuvydCWoGWNjYRsr9jYbPpDIqf',
                'ip_client' => $_SERVER['REMOTE_ADDR']
            );

            //open connection
            $ch = curl_init();

            //set the url, number of POST vars, POST data
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_REFERER, $_SERVER['HTTP_REFERER']);
            curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query($fields));

            //execute post
            $result = curl_exec($ch);

            //close connection
            curl_close($ch);
            echo $result;



            /**************************
                SALESFORCE CODE
            ***************************/



            //set variables
            if($country!="United States"){
                $states='';
                    }

            $url = 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8';
            $fields = array(
                'first_name' => $firstNameSplit,
                'last_name' => $lastNameSplit,
                'email' => $email,
                'country' => $country,
                'state' => $states,
                '00Nb0000009UgZK' => 'Lead',
                '00Nb000000A1ZxB' => 'Website',
                '00Nb000000A1ZxG' => 'Forms',
                '00Nb000000A1ZxV' => 'Buy Now',
                'company' => $company,
                '00Nb000000A9e0M' => 'BRABBU',
                'oid'=> '00Db0000000ckMX',
                'debug' => 1,
                'phone' => $phone,
                'debugEmail' => 'debug@webuzz.com.pt',
                '00Nb0000009UgZA' => $product_name." | ".$sub_typology_name,
            );

            //open connection
            $ch = curl_init();
            //set the url,POST data
            curl_setopt($ch,CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_HEADER, 1);
            curl_setopt($ch,CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query($fields));
            //execute
            $result_sf = curl_exec($ch);
            if(curl_errno($ch))
            {
                echo 'Curl error: ' . curl_error($ch).'<br>';
            }
            curl_close($ch);



            /**************************
                SEND MESSAGE FOR CLIENT
            ***************************/

                $subject_cliente = "Response to your application!";



                $data = array(
                    'offer_name' => $offer_name,
                    );


                Mail::send('emails.reject_candidate', $data, function($message) use ($offer_name,$email,$name,$subject_cliente)
                                {
                                    $message->from('info@brabbu.com', 'BRABBU APPLICATION '.$offer_name);
                                    $message->to($email, $name)->subject($subject_cliente);
                                });
           


            /**************************
                SEND MESSAGE FOR DL
            ***************************/

                $subject_cliente = "Response to your application!";



                $data = array(
                    'offer_name' => $offer_name,
                    );


                Mail::send('emails.reject_candidate', $data, function($message) use ($offer_name,$email,$name,$subject_cliente)
                                {
                                    $message->from('info@brabbu.com', 'BRABBU APPLICATION '.$offer_name);
                                    $message->to($email, $name)->subject($subject_cliente);
                                });


          

            return response()->json('Success', 200);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }
    }
}
