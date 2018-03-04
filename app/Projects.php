<?php

namespace App;
use DB;

use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    protected $table = "projects";

    public function projectsFeacturedRequest()
    {
    	return DB::table('projects')
    	->leftJoin('projects_gallery', 'projects.id', '=', 'projects_gallery.id_project')
    	->select('projects.name', 'projects.id', 'projects.subTitle', 'projects_gallery.img', 'projects_gallery.alt')
        ->where('projects_gallery.position', 0)
    	->orderBy('projects.created_at', 'desc')
    	->take(3)
        ->get();
    }


    public function projectsBackoffice()
    {
    	return DB::table('projects')
    	->leftJoin('projects_gallery', 'projects.id', '=', 'projects_gallery.id_project')
    	->select('projects.name', 'projects_gallery.img', 'projects_gallery.alt')
    	->orderBy('projects.position')
    	->get();
    }


    public function projectsEdit($id)
    {
    	return DB::table('projects')
    	->select('projects.id', 'projects.name', 'projects.subTitle', 'projects.details', 'projects.autor', 'projects.location', 'projects.pdf')
    	->where('projects.id', $id)
    	->get();
    }


    public function imagesEdit($id)
    {
    	return DB::table('projects_gallery')
    	->select('img', 'alt', 'id_project', 'id as id_image')
    	->where('id_project', $id)
    	->get();
    }


    public function imagesHrEdit($id)
    {
    	return DB::table('projects_gallery_hr')
    	->select('img', 'alt', 'id_project', 'id as id_image_hr')
    	->where('id_project', $id)
    	->get();
    }


    public static function prodsRelated($id)
    {
        return DB::table('projects_products')
            ->leftJoin('products', 'projects_products.id_product', '=', 'products.id')
            ->select('products.id', 'products.name', 'projects_products.id_product as related')
            ->where('projects_products.id_project', $id)
            ->get();
    }


    public static function projectsRelated($id)
    {
        return DB::table('projects_related')
            ->leftJoin('projects', 'projects_related.id_project', '=', 'projects.id')
            ->select('projects.id','projects.name', 'projects_related.id_proj_related as related')
            ->where('projects_related.id_project', $id)
            ->get();
    }


    public function products()
    {
    	return DB::table('products')
    	->leftJoin('products_category', 'product.id_category', '=', 'products_category.id')
    	->select('products.id', 'products.name', 'products_category.category')
    	->orderBy('products_category.id')
 		->orderBy('products.id')
    	->get();
    }


    public function projects()
    {
    	return DB::table('projects')
    	->select('id', 'name')
    	->get();
    }




    // public function projectsImages()
    // {
    // 	return $this->hasMany('App\ProjectsGallery');
    // }

 //    public function projectsImagesHR()
 //    {
 //    	return $this->hasMany('App\ProjectsGalleryHR');
 //    }

 //    public function projectsImagesHR()
 //    {
 //    	return $this->hasMany('App\ProjectsGalleryHR');
 //    }


	// public function projectsRelated()
 //    {
 //    	return $this->hasMany('App\ProjectsRelated');
 //    }
}
