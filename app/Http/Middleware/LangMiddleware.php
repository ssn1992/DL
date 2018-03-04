<?php

namespace App\Http\Middleware;

use Closure;
use Session;
use App;
use Config;

class LangMiddleware
{
    /**
     * Default Language.
     *
     * @string $languageDefault
     */
    protected $languageDefault = 'en';

    /**
     * Availables languages.
     *
     * @array $languages
     */
    const languages = ['en','fr', 'de', 'ru', 'it'];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        // Set Default Language
        $locale = $this->languageDefault;

        // If Requested and browser language are not in the language array set EN as default locale and redirect
        if (!in_array($request->lang, self::languages) && (!in_array(substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2), self::languages))) {
            return redirect($locale);

        // If Requested language (@param {$request->lang}) is in the language array set requested language as locale
        } else if(in_array($request->lang, self::languages)) {
            $locale = $request->lang;

        // If Browser language (@Param {$request->server('HTTP_ACCEPT_LANGUAGE')}) is in the language array set requested language as locale
        } else if (in_array(substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2), self::languages)) {
            $locale = substr($request->server('HTTP_ACCEPT_LANGUAGE'), 0, 2);return redirect($locale . '/');
        }

        // Set locale
        App::setLocale($locale);

        return $next($request);

    }


    public function languagesList()
    {
        return self::languages;
    }


    public function getLocale()
    {
        $locale = App::getLocale();
        return $locale;
    }

    public function setLocale($locale)
    {
        App::setLocale($locale);
    }
}
