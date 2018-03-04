<div class="sidebar" data-color="red" data-image="{!! asset('img/backoffice/sidebar-1.jpg') !!}">
    <!--
Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

Tip 2: you can also add an image using data-image tag
-->
    <div class="logo text-center">
        <a href="{{ url('/') }}" class="logo">
            <img src="{{asset('img/logos/header-logo.png')}}" alt="logo" style="width: 120px;">
        </a>
    </div>
    <div class="sidebar-wrapper">

        <div class="user">
            <div class="photo">
                <img width="34px" src="{!! asset('img/backoffice/avatar.jpeg') !!}">
            </div>
            <div class="info">
                <a data-toggle="collapse" href="#collapseExample" class="collapsed" aria-expanded="false">
                            <span>
                                Bárbara Lopes
                                <b class="caret"></b>
                            </span>
                </a>
                <div class="clearfix"></div>
                <div class="collapse" id="collapseExample" aria-expanded="false" style="height: 0px;">
                    <ul class="nav" style="padding-left: 39px;">
                        <li>
                            <a href="{{ route('logout') }}" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                <span class="sidebar-normal">Log out</span>
                            </a>
                            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                {{ csrf_field() }}
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <nav id="backoffice-nav-bar" class="navbar navbar-default" role="navigation">
            <div class="container-fluid">
                <div >
                    <ul class="nav">
                        <li class="@if(Request::is('admin-area/dashboard')) active @endif dropdown">
                            <a href="{{ url("admin-area/dashboard") }}">
                                <i class="material-icons">dashboard</i>
                                <p>Dashboard</p>
                            </a>
                        </li>

                        {{-- User Profile--}}
                        <li class="@if(Request::is('admin-area/user/*')) active @endif dropdown">
                            <a href="{{ url("admin-area/user") }}">
                                <i class="material-icons">&#xE851;</i>
                                <p>User Profile</p>
                            </a>
                        </li>
                        {{-- .User Profile--}}

                        {{-- Materials--}}
                        <li class="dropdown @if(Request::is('admin-area/materials/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE335;</i>
                                <p>Materials</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/materials/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/materials/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Materials--}}

                        {{-- Products--}}
                        <li class="dropdown @if(Request::is('admin-area/products/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE42E;</i>
                                <p>Products</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/products/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/products/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Products--}}

                        {{-- Projects--}}
                        <li class="dropdown @if(Request::is('admin-area/projects/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE8F8;</i>
                                <p>Projects</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/projects/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/projects/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Projects--}}

                        {{-- Ebooks--}}
                        <li class="dropdown @if(Request::is('admin-area/ebooks/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE865;</i>
                                <p>Ebooks</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/ebooks/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/ebooks/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Ebooks--}}

                        {{-- Banners--}}
                        <li class="dropdown @if(Request::is('admin-area/banners/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE8C4;</i>
                                <p>Banners</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/banners/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/banners/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Banners--}}

                        {{-- Sliders--}}
                        <li class="dropdown @if(Request::is('admin-area/sliders/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE8EA;</i>
                                <p>Sliders</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/sliders/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/sliders/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Sliders--}}

                        {{-- Videos--}}
                        <li class="dropdown @if(Request::is('admin-area/videos/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE04B;</i>
                                <p>Videos</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/videos/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/videos/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Videos--}}

                        {{-- Press Releases--}}
                        <li class="dropdown @if(Request::is('admin-area/press-releases/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE8AA;</i>
                                <p>Press Releases</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/press-releases/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/press-releases/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Press Releases--}}

                        {{-- Press Clipping--}}
                        <li class="dropdown @if(Request::is('admin-area/press-clipping/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE911;</i>
                                <p>Press Clipping</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/press-clipping/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/press-clipping/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Press Clipping--}}

                        {{-- Contacts--}}
                        <li class="dropdown @if(Request::is('admin-area/contacts/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE0BA;</i>
                                <p>Contacts</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/contacts/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/contacts/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Contacts--}}

                        {{-- Events--}}
                        <li class="dropdown @if(Request::is('admin-area/events/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE878;</i>
                                <p>Events</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/events/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/events/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Events--}}

                        {{-- SEO--}}
                        <li class="dropdown @if(Request::is('admin-area/seo/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE051;</i>
                                <p>SEO</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/seo/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/seo/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .SEO--}}

                        {{-- Catalogue--}}
                        <li class="dropdown @if(Request::is('admin-area/catalogue/*')) active @endif">
                            <a class="dropdown-toggle" data-toggle="dropdown"><b class="caret"></b>
                                <i class="material-icons">&#xE0E0;</i>
                                <p>Catalogue</p>
                            </a>

                            <ul class="dropdown-menu">
                                <li><a href="{{ url("admin-area/catalogue/add") }}">Add</a></li>
                                <li><a href="{{ url("admin-area/catalogue/actions") }}">List</a></li>
                            </ul>
                        </li>
                        {{-- .Catalogue--}}

                        {{-- Console--}}
                        @if(Auth::user()->id == 1)
                            <li class="@if(Request::is('admin-area/console')) active @endif dropdown">
                                <a href="{{ url("admin-area/console") }}">
                                    <i class="material-icons">code</i>
                                    <p>Console</p>
                                </a>
                            </li>
                        @endif
                        {{-- .Console--}}

                    </ul>
                </div>
            </div>
        </nav>
    </div>
</div>