<header class="header">

    {{-- Navbar Section --}}
    <div class="navbar">
        <div class="container">
            <div class="navbar-inner">
                <div class="column"></div>

                <div class="column text-center">
                    {{-- Main Logo  --}}
                    <a href="{{ url('/') }}" class="logo">
                        <img src="{{asset('img/logos/header-logo.png')}}" alt="logo">
                    </a>
                    {{-- .Main Logo  --}}
                </div>

                {{-- Header Tools  --}}
                <div class="column">
                    <div class="header-tools text-right">
                        <div class="widget search">
                            <i class="icon material-icons search"></i>
                            <input type="text" class="form-control input-sm" placeholder="Search Shop">
                        </div>

                        <a href="account-wishlist.html" class="header-tools-link wishlist">
                            <i class="material-icons favorite"></i>
                        </a>

                        {{-- Cart dropdown element --}}
                        <div class="cart-container dropdown">
                            <a href="#" class="header-tools-link cart-link">
                                <i class="material-icons email"></i>
                                <span class="counter">24</span>
                            </a>

                            <div class="sub-menu">
                                <div class="widget cart-widget">
                                    <div class="widget-title">
                                        Latest Products
                                    </div>

                                    <ul class="cart-list">
                                        {{--  Cart List Item  --}}
                                        <li></li>

                                        {{--  Cart List Item  --}}
                                        <li></li>

                                        {{--  Cart List Item  --}}
                                        <li></li>
                                    </ul>

                                    <a href="shopping-cart.html" class="btn btn-default btn-block margin-right-none">Go to cart</a>
                                    <a href="checkout-wizard.html" class="btn btn-default btn-block margin-right-none">Poceed to checkout</a>
                                </div>
                            </div>
                        </div>
                        {{-- .Cart dropdown element --}}
                    </div>
                </div>
                {{-- .Header Tools  --}}
            </div>
        </div>

        {{-- Menu --}}
        <div class="menu-desktop column text-center">
            <div class="container">
                {{--  Main Navigation --}}
                <ul class="main-nav">
                    <div class="main-nav-header">
                        <!-- Main Navigation Level -->
                        <li class="nav-item">
                            <a href="#">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">About</a>
                        </li>
                        <li class="nav-item cat-suspension">
                            <a href="#">New desings</a>
                        </li>
                        <li class="nav-item cat-floor">
                            <a href="#">Projects</a>
                        </li>
                        <li class="nav-item cat-table">
                            <a href="#">Events</a>
                        </li>
                        <li class="nav-item cat-wall">
                            <a href="#">Lifestyle & Events</a>
                        </li>
                        <li class="nav-item cat-graphic">
                            <a href="#">Cut-out Images</a>
                        </li>
                        <li class="nav-item cat-furniture">
                            <a href="#">Press Releases</a>
                        </li>
                        <li class="nav-item cat-press">
                            <a href="#">Press Clipping</a>
                        </li>
                        <li class="nav-item">
                            <a href="#">Videos</a>
                        </li>
                    </div>
                    {{--  .Main Navigation Level --}}
                </ul>
                {{--  .Main Navigation --}}
            </div>
        </div>
        {{--  Menu --}}
    </div>
    {{-- .Navbar Section --}}

    {{-- Mobile Tools--}}
    <div class="mobile-view">
        <div class="container">
            {{-- OffCanvas Toggle--}}
            <a href="#" class="offcanvas-toggle">
                <i class="material-icons menu"></i>
            </a>

            {{-- Mobile View Logo--}}
            <a href="index.html" class="logo">
                <img src="{{asset('img/logos/header-logo.png')}}" alt="">
            </a>

            <div class="mobile-tools">
                {{-- Wishlist Link --}}
                <a href="account-wishlist.html" class="wishlist">
                    <i class="material-icons favorite"></i>
                </a>

                {{-- Cart dropdown element --}}
                <div class="cart-container">
                    <a href="shopping-cart.html" class="cart-link">
                        <i class="material-icons email"></i>
                        <span class="counter">24</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    {{-- .Mobile Tools--}}
</header>