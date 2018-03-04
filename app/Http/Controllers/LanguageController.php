<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Materials;
use App\Projects;
use App\ProductsCategory;
use App\Slider;
use App\Pages;
use App\VideosCat;
use App\ContactsDep;
use App\Markets;
use App\Products;
use App\Components;
use App\Http\Middleware\LangMiddleware;
use App\Banners;
use App\PressReleases;
use App\PressClipping;
use App\Events;

class LanguageController extends Controller
{
    public function setLanguage(Request $request)
    {
        $lang = new LangMiddleware;
        $lang->setLocale($request->lang);
    }

    public function getLanguage()
    {
        $lang = new LangMiddleware;

        return $lang->getLocale();
    }
}