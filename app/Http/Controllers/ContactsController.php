<?php

/*
***************************************************************************************************************

*********************************************** CONTACTS ************************************************

***************************************************************************************************************
*/


namespace App\Http\Controllers;

use App\Contacts;
use App\ContactsDep;
use App\Markets;
use App\ContactsMarkets;
use Illuminate\Http\Request;
use App\Translations;
use Barryvdh\TranslationManager\Manager;
use App\Http\Middleware\LangMiddleware;

class ContactsController extends Controller
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

        return view('backoffice.contacts.edit');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function view()
    {
        return view('backoffice.contacts.index');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Contacts $contact)
    {
        $contacts = $contact->getContacts();


        $data = $contacts->map(function($contacts){
            return [
                'id'         => $contacts->id,
                'Date'       => "$contacts->created_at",
                'Name'       => $contacts->name,
                'Email'      => $contacts->email,
                'Skype'      => $contacts->skype,
                'Phone'      => $contacts->phone,
                'Market'     => $contacts->market,
                'Department' => $contacts->department
            ];
        });

        if($contacts->count() > 0)
        {
            return response()->json(['table' => [
                    'tableId'   => 'contacts',
                    'tableName' => 'Contacts',
                    'columns'   => array_keys($data[0]),
                    'data'      => $data
                ]
            ]);    
        }
        else
        {
            return response()->json(['table' => [
                    'tableId'   => 'contacts',
                    'tableName' => 'Contacts',
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
        return view('backoffice.contacts.create');
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
            $this->validate($request, [
                'name'       => 'required|max:60',
                'email'      => 'required|email',
                'skype'      => 'required',
                'phone'      => 'required',
                'department' => 'required',
                'image'      => 'required|image|mimes:jpeg,jpg,png'
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $contact = new Contacts;
            $contact->id_dep = $request->department;
            $contact->name = $request->name;
            $contact->email = $request->email;
            $contact->skype = $request->skype;
            $contact->phone = $request->phone;
            $contact->img = 'temp';
            $contact->alt = 'temp';
            $contact->save();

            $basePathImage = 'images/contacts/'.$contact->id.'/';
            $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                         md5(date('ymdhis')) .
                         '.' .
                         request()->image->getClientOriginalExtension();

            $contact->img = $basePathImage.$imageName;
            $contact->alt = 'contact_'.$contact->id.'.'.$contact->id.'_alt';
            $contact->save();


            request()->image->move($basePathImage, $imageName);

            if($request->market =! null && $request->market =! 'null')
            {
                $market = new ContactsMarkets;
                $market->id_market = $request->market;
                $market->id_contact = $contact->id;
                $market->save();
            }


            foreach ($languagesList as $key => $lang) 
            {

                $translate3 = new Translations;
                $translate3->status = 0;
                $translate3->locale = $lang;
                $translate3->group = "contact_".$contact->id;
                $translate3->key = $contact->id.'_alt';
                $translate3->value = $request->imageAlt;
                $translate3->save();

            }


            $this->manager->exportTranslations('contact_'.$contact->id);

        }
        catch(Exception $e)
        {
            return response()->json($e, 409);
        }

       
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Contacts  $contacts
     * @return \Illuminate\Http\Response
     */
    public function show(Contacts $contacts)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Contacts  $contacts
     * @return \Illuminate\Http\Response
     */
    public function edit(Contacts $contacts, Request $request)
    {
        $id = $request->id;

        $contact = Contacts::where('id',$id)->get();

        $data_contact = $contact->map(function($contact){
            return [
                'id'         => $contact->id,
                'idDep'      => $contact->id_dep,
                'name'       => $contact->name,
                'email'      => $contact->email,
                'skype'      => $contact->skype,
                'phone'      => $contact->phone,
                'image'      => $contact->img,
                'imageAlt'   => $contact->alt
            ];
        });

        if(ContactsMarkets::where('id_contact', $id)->exists())
        {
            $market = ContactsMarkets::where('id_contact', $id)->get();

            $data_market = $market->map(function($market){
                return [
                    'idMarket' => $market->id_market,
                ];
            });
        }
        else
        {
            $data_market = null;
        }
        
        return response()->json([
            'contact' => $data_contact['0'],
            'market' => $data_market['0'],
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Contacts  $contacts
     * @return \Illuminate\Http\Response
     */


//************************************ UPDATE ************************************//


    public function update(Request $request, Contacts $contacts)
    {
        try
        {
            $this->validate($request, [
                'name'       => 'required|max:60',
                'email'      => 'required|email',
                'skype'      => 'required',
                'phone'      => 'required',
                'department' => 'required',
                'image'      => 'image|mimes:jpeg,jpg,png'
            ]);


            $id = $request->id;
            $lang = $request->language;

            if($lang == 'en')
            {

                $contact = Contacts::find($id);
                $contact->id_dep = $request->department;
                $contact->name = $request->name;
                $contact->email = $request->email;
                $contact->skype = $request->skype;
                $contact->phone = $request->phone;

                if($request->hasFile('image'))
                {
                    $old = Contacts::where('id', $id)->firstOrFail();

                    \File::delete(public_path($old->img));

                    $old->img = 'temp';
                    $old->save();
                    
                    $basePathImage = 'images/contacts/'.$id.'/';
                    $imageName = pathinfo(request()->image->getClientOriginalName(), PATHINFO_FILENAME) .
                                 md5(date('ymdhis')) .
                                 '.' .
                                 request()->image->getClientOriginalExtension();
                    request()->image->move($basePathImage, $imageName);

                    $contact->img = $basePathImage.$imageName;


                    $translate3 = Translations::where('locale', $lang)->where('group', 'contact_'.$id)->where('key', $id.'_alt')->firstOrFail();
                    $translate3->value = $request->imageAlt;
                    $translate3->save();

                    $this->manager->exportTranslations('contact_'.$id);
                }
                $contact->save();



                if($request->market != null && $request->market != 'null')
                {
                    $market = ContactsMarkets::where('id_contact', $id)->firstOrFail();
                    $market->id_market = $request->market;
                    $market->id_contact = $id;
                    $market->save();
                }
                else if(ContactsMarkets::where('id_contact', $id)->exists())
                {
                    ContactsMarkets::where('id_contact', $id)->delete();
                }
            }

        }
        catch(\Exception $e)
        {
            return $e->getMessage();
        }


    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Contacts  $contacts
     * @return \Illuminate\Http\Response
     */


    public function updateImage(Request $request)
    {
        try {


            $translate3 = Translations::where('locale', $request->lang)->where('group', 'contact_'.$request->contactId)->where('key', $request->contactId.'_alt')->firstOrFail();
            $translate3->value = $request->imageAlt;
            $translate3->save();

            $this->manager->exportTranslations('contact_'.$request->contactId);


            return response()->json('Success', 200);
            
        } catch (Exception $e) {

            return $e->getMessage();
            
        }
        
    }




//************************************ DELETE ************************************//


    public function destroy(Contacts $contacts, Request $request)
    {
        try
        {
            $id = $request->id;
            
            $contact = Contacts::where('id', $id)->firstOrFail();

            \File::deleteDirectory(public_path('images/contacts/'.$id));
            Contacts::where('id', $id)->delete();
              
            if(ContactsMarkets::where('id_contact', $id)->exists())
                ContactsMarkets::where('id_contact', $id)->delete();

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }




/*
***************************************************************************************************************

*********************************************** DEPARTMENTS ***********************************************

***************************************************************************************************************
*/


    public function createDepartments()
    {
        return view('backoffice.departments.create');
    }


//************************************ STORE DEPARTMENTS ************************************//


    public function storeDepartments(Request $request)
    {
        try{
            $this->validate($request, [
                'name' => 'required',
            ]);

            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $dep = new ContactsDep;
            $dep->department = $request->name;
            $dep->save();


            $dep->department = 'department_'.$dep->id.'.'.$dep->id.'_department';
            $dep->save();

            
            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = "department_".$dep->id;
                $translate->key = $dep->id.'_department';
                $translate->value = $request->name;
                $translate->save();
            }


            

            $this->manager->exportTranslations("department_".$dep->id);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }


    public function editDepartments(Contacts $contacts)
    {
     //   $department = ContactsDep::find($id);
    }


//************************************ UPDATE DEPARTMENTS ************************************//


    public function updateDepartments(Request $request, Contacts $contacts)
    {
        try{
            $this->validate($request, [
                'name' => 'required',
            ]);
            
            $lang = $request->language;
            $id = $request->id;

            $translate = Translations::where('locale', $lang)->where('group', 'department_'.$id)->where('key', $id.'_department')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $this->manager->exportTranslations('department_'.$id);

            return response()->json('Success', 200);
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

       
    }




//************************************ DELETE DEPARTMENTS ************************************//


    public function destroyDepartments(Contacts $contacts, Request $request)
    {
        try
        {
            $id = $request->id;

            Contacts::where('id_dep', $id)->delete();
            ContactsDep::where('id', $id)->delete();
            Translations::where('group', 'department_'.$id)->delete();
            
            $this->manager->cleanTranslations();
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }





/*
***************************************************************************************************************

*********************************************** MARKETS ************************************************

***************************************************************************************************************
*/


    public function createMarkets()
    {
        return view('backoffice.markets.create');
    }


//************************************ STORE MARKETS ************************************//


    public function storeMarkets(Request $request)
    {
        try{
            $this->validate($request, [
                'name' => 'required',
            ]);

            
            $lang = new LangMiddleware;
            $languagesList = $lang->languagesList();

            $market = new Markets;
            $market->market = $request->name;
            $market->save();


            $market->market = 'market_'.$market->id.'.'.$market->id.'_market';
            $market->save();


            foreach ($languagesList as $key => $lang) 
            {
                $translate = new Translations;
                $translate->status = 0;
                $translate->locale = $lang;
                $translate->group = 'market_'.$market->id;
                $translate->key = $market->id.'_market';
                $translate->value = $request->name;
                $translate->save();
            }


            $this->manager->exportTranslations('market_'.$market->id);
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }


    }


    public function editMarkets(Contacts $contacts, Request $request)
    {
        try {

            $markets = Markets::where('id', $request->id)->get();


            if($markets->count() > 0)
            {
                $dataMarkets = $markets->map(function($markets){
                    return [
                        'id'   => $markets->id,
                        'name' => $markets->market
                    ];
                });
            }
            else
            {
                $dataMarkets = $markets;
            }

            return response()->json(['market' => $dataMarkets]);
            
        } catch (Exception $e) {
            
            return $e->getMessage();
        }
    }


//************************************ UPDATE MARKETS ************************************//


    public function updateMarkets(Request $request, Contacts $contacts)
    {
        try{
            $this->validate($request, [
                'name' => 'required',
            ]);
            
            $lang = $request->language;
            $id = $request->id;

            $translate = Translations::where('locale', $lang)->where('group', 'market_'.$id)->where('key', $id.'_market')->firstOrFail();
            $translate->value = $request->name;
            $translate->save();


            $this->manager->exportTranslations('market_'.$id);

        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }


//************************************ DELETE MARKETS ************************************//


    public function destroyMarkets(Contacts $contacts, Request $request)
    {
        try
        {
            $id = $request->id;

            Markets::where('id',$id)->delete();
            Translations::where('group', 'market_'.$id)->delete();
            
            $this->manager->cleanTranslations();
        }
        catch(Exception $e)
        {
            return $e->getMessage();
        }

    }


}
