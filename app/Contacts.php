<?php

namespace App;

use DB;
use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    protected $table = "contacts";

    // public function department()
    // {
    // 	return $this->belongTo('App\ContactsDep');
    // }


    public function getContacts()
    {
    	return DB::table('contacts')
    	->join('contacts_dep', 'contacts.id_dep', '=', 'contacts_dep.id')
    	->join('contacts_markets', 'contacts.id', '=', 'contacts_markets.id_contact')
    	->join('markets', 'contacts_markets.id_market', '=', 'markets.id')
    	->select('markets.market', 'contacts_dep.department', 'contacts.*')
    	->get();
    }
}
