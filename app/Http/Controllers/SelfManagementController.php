<?php

namespace App\Http\Controllers; 

use Illuminate\Http\Request; 

use Symfony\Component\Process\Process; 

class SelfManagementController extends Controller
{ 
   public function commandexec(Request $request){
       $response = "";
       define('WORKDIR',  'cd ../dl && ');
       $process = new Process(WORKDIR.$request->command);
       $process->run();

       foreach ($process as $type => $data) {
           if ($process::OUT === $type) {
               $response = $data;

           } else {
               $response = $data;
           }
       }

       return json_encode($response);
   }
} 