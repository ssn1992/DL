<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>DelightfFULL - @yield('title') </title>

        <!-- STYLE SECTION -->
        <link href="{!! asset('css/master/master.css') !!}" media="all" rel="stylesheet" type="text/css" />
        @yield('styles')
        <!-- .STYLE SECTION -->
    </head>
    <!-- Body -->
    <body>
        <!-- Preloader -->
        <div id="preloader" data-spinner="spinner3" data-screenbg="#fff"></div>

        <!-- Page Wrapper -->
        <div class="page-wrapper">

            <!-- Mobile Header component-->
            @component('components.mobile-header.mobile-header'))
            @endcomponent


            <div id="mobile-menu">
                <div off-canvas="id-1 left push" class="off-canvas-cont">
                <div class="side-nav-tools">
                    <a href="#">
                        <i class="material-icons language"></i>
                    </a>
                    <a href="account-login.html">
                        <i class="material-icons person"></i>
                    </a>
                    <a href="#">
                        <i class="material-icons attach_money"></i>
                    </a>

                    <a href="#" class="offcanvas-toggle inner-toggle">
                        <i class="material-icons close"></i>
                    </a>
                </div>

                <div class="widget search margin-bottom-none">
                    <i class="icon material-icons search"></i>
                    <input type="text" class="form-control input-sm" placeholder="Search Shop">
                </div>

                <nav class="offcanvas-navigation" role="navigation" data-back-btn-text="Back">
                    <div class="menu-site-menu-container">
                        <ul class="menu">
                            <li class="menu-item menu-item-has-children current">
                                <a href="#">Home</a>

                                <ul class="sub-menu">
                                    <li class="menu-item current">
                                        <a href="index.html">Hero Slider</a>
                                    </li>
                                    <li class="menu-item">
                                        <a href="home-category-tiles.html">Category</a>
                                    </li>
                                    <li class="menu-item">
                                        <a href="home-featured-products.html">Feature</a>
                                    </li>
                                    <li class="menu-item">
                                        <a href="home-week-deals.html">Deals of the Week</a>
                                    </li>
                                </ul>
                            </li>

                            <li class="menu-item menu-item-has-children">
                                <a href="#">Shop</a>

                                <ul class="sub-menu">
                                    <li class="menu-item-has-children">
                                        <a href="#">Shop Pages</a>

                                        <ul class="sub-menu">
                                            <li>
                                                <a href="shop-grid-3cols-sl.html">Grid 3 Cols Sidebar Left</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-2cols-sl.html">Grid 2 Cols Sidebar Left</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-3cols-sr.html">Grid 3 Cols Sidebar Right</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-2cols-sr.html">Grid 2 Cols Sidebar Right</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-4cols-ns.html">Grid 4 Cols No Sidebar</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-3cols-ns.html">Grid 3 Cols No Sidebar</a>
                                            </li>
                                            <li>
                                                <a href="shop-grid-2cols-ns.html">Grid 2 Cols No Sidebar</a>
                                            </li>
                                            <li>
                                                <a href="shop-list-sl.html">List Sidebar Left</a>
                                            </li>
                                            <li>
                                                <a href="shop-list-sr.html">List Sidebar Right</a>
                                            </li>
                                            <li>
                                                <a href="shop-list-ns.html">List No Sidebar</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="menu-item-has-children">
                                        <a href="#">Categories</a>

                                        <ul class="sub-menu">
                                            <li>
                                                <a href="shop-cat-4cols.html">Grid 4 Columns</a>
                                            </li>
                                            <li>
                                                <a href="shop-cat-3cols.html">Grid 3 Columns</a>
                                            </li>
                                            <li>
                                                <a href="shop-cat-2cols.html">Grid 2 Columns</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="menu-item-has-children">
                                        <a href="#">Product Pages</a>

                                        <ul class="sub-menu">
                                            <li>
                                                <a href="product-gallery-left.html">Product Gallery Left</a>
                                            </li>
                                            <li>
                                                <a href="product-gallery-right.html">Product Gallery Right</a>
                                            </li>
                                            <li>
                                                <a href="product-grouped.html">Product Grouped</a>
                                            </li>
                                            <li>
                                                <a href="product-affiliate.html">Product Affiliate</a>
                                            </li>
                                            <li>
                                                <a href="product-out-stock.html">Product Out of Stock</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li class="menu-item-has-children">
                                        <a href="#">Orders</a>

                                        <ul class="sub-menu">
                                            <li>
                                                <a href="shopping-cart.html">Shopping Cart</a>
                                            </li>
                                            <li>
                                                <a href="checkout-simple.html">Checkout Simple</a>
                                            </li>
                                            <li>
                                                <a href="checkout-wizard.html">Checkout Steps Wizard</a>
                                            </li>
                                        </ul>
                                    </li>

                                    <li>
                                        <a href="products-compare.html">Products Comparison</a>
                                    </li>

                                    <li class="menu-item-has-children">
                                        <a href="#">Account</a>

                                        <ul class="sub-menu">
                                            <li>
                                                <a href="account-login.html">Log In / Sign Up</a>
                                            </li>
                                            <li>
                                                <a href="account-wishlist.html">Wishlist</a>
                                            </li>
                                            <li>
                                                <a href="account-order-track.html">Track your Order</a>
                                            </li>
                                            <li>
                                                <a href="account-orders-list.html">Orders List</a>
                                            </li>
                                            <li>
                                                <a href="account-order-info.html">Order Information</a>
                                            </li>
                                            <li>
                                                <a href="account-user-info.html">User Information</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">
                                <a href="#">Blog</a>

                                <ul class="sub-menu">
                                    <li>
                                        <a href="blog-grid.html">Grid View</a>
                                    </li>
                                    <li>
                                        <a href="blog-single.html">Single Post</a>
                                    </li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">
                                <a href="#">Gallery</a>

                                <ul class="sub-menu">
                                    <li>
                                        <a href="gallery-masonry.html">Masonry Grid</a>
                                    </li>
                                    <li>
                                        <a href="gallery-4cols.html">Grid 4 Columns</a>
                                    </li>
                                    <li>
                                        <a href="gallery-3cols.html">Grid 3 Columns</a>
                                    </li>
                                    <li>
                                        <a href="gallery-2cols.html">Grid 2 Columns</a>
                                    </li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">
                                <a href="#">Pages</a>

                                <ul class="sub-menu">
                                    <li>
                                        <a href="page-about.html">About Us</a>
                                    </li>
                                    <li>
                                        <a href="page-faq.html">FAQ</a>
                                    </li>
                                    <li>
                                        <a href="page-store-locator.html">Store Locator</a>
                                    </li>
                                    <li>
                                        <a href="page-404.html">404</a>
                                    </li>
                                </ul>
                            </li>

                            <li>
                                <a href="elements.html">Elements</a>
                            </li>

                            <li class="divider"></li>

                            <li class="menu-item-has-children">
                                <a href="#">Men</a>

                                <ul class="sub-menu">
                                    <li class="title">Outerwear</li>
                                    <li><a href="#">Running</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Training</a></li>
                                    <li><a href="#">Walking</a></li>
                                    <li><a href="#">Baseball</a></li>
                                    <li><a href="#">Hiking &amp; Trail</a></li>
                                    <li><a href="#">Soccer</a></li>
                                    <li><a href="#">Tennis</a></li>

                                    <li class="divider"></li>

                                    <li class="title">Clothing</li>
                                    <li><a href="#">Short Sleeve &amp; Sleeveless Shirts</a></li>
                                    <li><a href="#">Long Sleeve Shirts</a></li>
                                    <li><a href="#">Jackets &amp; Hoodies</a></li>
                                    <li><a href="#">Pants</a></li>
                                    <li><a href="#">Socks</a></li>
                                    <li><a href="#">Accessories and Gear</a></li>
                                    <li><a href="#">Recently Reduced Clothing</a></li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">

                                <a href="#">Women</a>

                                <ul class="sub-menu">
                                    <li class="title">Outerwear</li>
                                    <li><a href="#">Running</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Training</a></li>
                                    <li><a href="#">Walking</a></li>
                                    <li><a href="#">Baseball</a></li>
                                    <li><a href="#">Hiking &amp; Trail</a></li>
                                    <li><a href="#">Soccer</a></li>
                                    <li><a href="#">Tennis</a></li>

                                    <li class="divider"></li>

                                    <li class="title">Clothing</li>
                                    <li><a href="#">Short Sleeve &amp; Sleeveless Shirts</a></li>
                                    <li><a href="#">Long Sleeve Shirts</a></li>
                                    <li><a href="#">Jackets &amp; Hoodies</a></li>
                                    <li><a href="#">Pants</a></li>
                                    <li><a href="#">Socks</a></li>
                                    <li><a href="#">Accessories and Gear</a></li>
                                    <li><a href="#">Recently Reduced Clothing</a></li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">

                                <a href="#">Sales</a>

                                <ul class="sub-menu">
                                    <li class="title">Outerwear</li>
                                    <li><a href="#">Running</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Training</a></li>
                                    <li><a href="#">Walking</a></li>
                                    <li><a href="#">Baseball</a></li>
                                    <li><a href="#">Hiking &amp; Trail</a></li>
                                    <li><a href="#">Soccer</a></li>
                                    <li><a href="#">Tennis</a></li>

                                    <li class="divider"></li>

                                    <li class="title">Clothing</li>
                                    <li><a href="#">Short Sleeve &amp; Sleeveless Shirts</a></li>
                                    <li><a href="#">Long Sleeve Shirts</a></li>
                                    <li><a href="#">Jackets &amp; Hoodies</a></li>
                                    <li><a href="#">Pants</a></li>
                                    <li><a href="#">Socks</a></li>
                                    <li><a href="#">Accessories and Gear</a></li>
                                    <li><a href="#">Recently Reduced Clothing</a></li>
                                </ul>
                            </li>

                            <li class="menu-item-has-children">

                                <a href="#">Shoes</a>

                                <ul class="sub-menu">
                                    <li class="title">Outerwear</li>
                                    <li><a href="#">Running</a></li>
                                    <li><a href="#">Lifestyle</a></li>
                                    <li><a href="#">Training</a></li>
                                    <li><a href="#">Walking</a></li>
                                    <li><a href="#">Baseball</a></li>
                                    <li><a href="#">Hiking &amp; Trail</a></li>
                                    <li><a href="#">Soccer</a></li>
                                    <li><a href="#">Tennis</a></li>

                                    <li class="divider"></li>

                                    <li class="title">Clothing</li>
                                    <li><a href="#">Short Sleeve &amp; Sleeveless Shirts</a></li>
                                    <li><a href="#">Long Sleeve Shirts</a></li>
                                    <li><a href="#">Jackets &amp; Hoodies</a></li>
                                    <li><a href="#">Pants</a></li>
                                    <li><a href="#">Socks</a></li>
                                    <li><a href="#">Accessories and Gear</a></li>
                                    <li><a href="#">Recently Reduced Clothing</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            </div>

            <div canvas="container">
                <!-- Backdrop for Mobile menu -->
                <div class="backdrop offcanvas-toggle"></div>

                <!-- Header component-->
                @component('components.header.header'))
                @endcomponent


                <main style="display: none;">
                    <section class="fw-section">

                        <!-- Item Carousel -->
                        <div class="items-carousel">
                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/01.jpg" alt="">
                                </a>
                                <div class="tile-title">Gymwear</div>
                            </div><!-- Category Tile END -->

                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/02.jpg" alt="">
                                </a>
                                <div class="tile-title">Bags</div>
                            </div><!-- Category Tile END -->

                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/03.jpg" alt="">
                                </a>
                                <div class="tile-title">Outerwear</div>
                            </div><!-- Category Tile END -->

                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/04.jpg" alt="">
                                </a>
                                <div class="tile-title">Shoes</div>
                            </div><!-- Category Tile END -->

                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/05.jpg" alt="">
                                </a>
                                <div class="tile-title">Jeans</div>
                            </div><!-- Category Tile END -->

                            <!-- Category Tile -->
                            <div class="tile tile-category">
                                <a href="#" class="preview-box">
                                    <img src="img/tiles/category/06.jpg" alt="">
                                </a>
                                <div class="tile-title">Accessories</div>
                            </div><!-- Category Tile END -->
                        </div><!-- Item Carousel END -->
                    </section>

                    <section class="fw-section margin-bottom-3x">
                        <div class="container">
                            <div class="row">
                                <div class="col-sm-4">
                                    <div class="tile tile-banner">
                                        <a href="#" class="preview-box">
                                            <img src="img/tiles/banner/01.jpg" alt="">

                                            <div class="banner-meta text-light text-center">
                                                <h4 class="title">Cartoon Bags</h4>
                                                <span>Explore Must Have Bags</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="tile tile-banner">
                                        <a href="#" class="preview-box">
                                            <img src="img/tiles/banner/02.jpg" alt="">

                                            <div class="banner-meta text-light text-center">
                                                <h4 class="title">New Lifestyle</h4>
                                                <span>Explore Must Have Bags</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-sm-4">
                                    <div class="tile tile-banner">
                                        <a href="#" class="preview-box">
                                            <img src="img/tiles/banner/03.jpg" alt="">

                                            <div class="banner-meta text-light text-center">
                                                <h4 class="title">Back to 80`s</h4>
                                                <span>Explore Must Have Bags</span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="fw-section">
                        <div class="container-fluid">
                            <!-- Block Title -->
                            <h2 class="block-title text-center margin-bottom-2x">
                                Our Insta
                                <small>Follow Us</small>
                            </h2><!-- Block Title END -->

                            <div class="row">
                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/01.jpg" alt="">

                                            <span class="insta-meta" style="margin-left: -25px;">
                                          <i class="material-icons favorite"></i>
                                          345
                                        </span>
                                                            <span class="insta-meta" style="margin-left: 25px;">
                                          <i class="material-icons mode_comment"></i>
                                          76
                                        </span>
                                        </a>
                                    </div>
                                    <!-- Insta Tile END -->
                                </div>

                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/02.jpg" alt="">

                                            <span class="insta-meta" style="margin-left: -25px;">
                                              <i class="material-icons favorite"></i>
                                              345
                                            </span>
                                                                <span class="insta-meta" style="margin-left: 25px;">
                                              <i class="material-icons mode_comment"></i>
                                              76
                                            </span>
                                        </a>
                                    </div>
                                    <!-- Insta Tile END -->
                                </div>

                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/04.jpg" alt="">

                                            <span class="insta-meta" style="margin-left: -25px;">
                                            <i class="material-icons favorite"></i>
                                            345
                                            </span>

                                            <span class="insta-meta" style="margin-left: 25px;">
                                            <i class="material-icons mode_comment"></i>
                                            76
                                            </span>
                                        </a>
                                    </div>
                                    <!-- Insta Tile END -->
                                </div>

                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/03.jpg" alt="">

                                            <span class="insta-meta" style="margin-left: -25px;">
                                                <i class="material-icons favorite"></i>
                                                345
                                            </span>
                                            <span class="insta-meta" style="margin-left: 25px;">
                                                <i class="material-icons mode_comment"></i>
                                                76
                                            </span>
                                        </a>
                                    </div><!-- Insta Tile END -->
                                </div>

                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/05.jpg" alt="">

                                            <span class="insta-meta" style="margin-left: -25px;">
                                                <i class="material-icons favorite"></i>
                                                345
                                            </span>
                                                <span class="insta-meta" style="margin-left: 25px;">
                                                <i class="material-icons mode_comment"></i>
                                                76
                                            </span>
                                        </a>
                                    </div><!-- Insta Tile END -->
                                </div>

                                <div class="col-sm-2">
                                    <!-- Insta Tile -->
                                    <div class="tile tile-insta">
                                        <a href="#" class="preview-box">
                                            <img src="img/insta/06.jpg" alt="">

                                             <span class="insta-meta" style="margin-left: -25px;">
                                                <i class="material-icons favorite"></i>
                                                345
                                            </span>
                                            <span class="insta-meta" style="margin-left: 25px;">
                                                <i class="material-icons mode_comment"></i>
                                                76
                                            </span>
                                        </a>
                                    </div><!-- Insta Tile END -->
                                </div>

                            </div>
                        </div>
                    </section>

                    <section class="fw-section margin-top-1x padding-top-3x padding-bottom-3x" style="background-image: url(img/homes/03.jpg)">
                        <div class="container text-center">
                            <div class="row">
                                <div class="col-md-6 col-md-offset-3">
                                    <h4 class="text-default">Newsletter Sign Up</h4>
                                    <p>Just fill in your details below and let us keep you up to date with the latest news, events and stories from Sophie Hulme</p>

                                    <input type="text" class="form-control text-center margin-bottom-none" placeholder="Enter your name">
                                    <input type="text" class="form-control text-center" style="margin-top: 10px" placeholder="Enter your email">

                                    <a href="#" class="btn btn-arrow margin-right-none">Subscribe</a>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <!-- Footer component-->
                @component('components.footer.footer'))
                @endcomponent
            </div>
        </div>
        <!-- Page Wrapper END -->


        <!-- SCRIPTS SECTION-->
        <script src="{!! asset('js/master/master.js') !!}" type="text/javascript"></script>
        @yield('scripts')
        <!-- .SCRIPTS SECTION-->
    </body>
</html>
