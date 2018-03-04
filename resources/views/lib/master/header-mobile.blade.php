<div id="mobile-header">
    <div off-canvas="id-1 left push" class="off-canvas-cont">
        <div class="side-nav-tools">
            <li class="dropdown mobile">
                <a href="#">
                    <i class="material-icons language"></i>
                </a>

                <ul class="sub-menu" style="font-size: 14px">
                    <li><a href="/en">English</a></li>
                    <li><a href="/fr">French</a></li>
                    <li><a href="/de">German</a></li>
                    <li><a href="/ru">Russian</a></li>
                    <li><a href="/it">Italian</a></li>
                </ul>
            </li>

            <a href="{{ url('login') }}">
                <i class="material-icons person"></i>
            </a>

            {{-- Admin Area --}}
            @hasrole('Admin')
            <a href="{{ url('admin-area/dashboard') }}">
                <i class="material-icons lock"></i>
            </a>
            @endhasrole
            {{-- .Admin Area --}}


            <a href="#">
                <i class="material-icons attach_money"></i>
            </a>

            <a href="#" class="offcanvas-toggle inner-toggle">
                <i class="material-icons close"></i>
            </a>
        </div>

        <div class="widget search margin-bottom-none padding-bottom-1x">
            <i class="icon material-icons search"></i>
            <input type="text" class="form-control input-sm" placeholder="Search Shop">
        </div>

        <nav class="offcanvas-navigation" role="navigation" data-back-btn-text="Back">
            <div class="menu-site-menu-container">
                <ul class="menu main-nav">
                    <li class="menu-item">
                        <a href="#">All Products</a>
                    </li>
                    <li class="menu-item cat-suspension">
                        <a href="#">Suspension</a>
                    </li>
                    <li class="menu-item cat-floor">
                        <a href="#">Floor</a>
                    </li>
                    <li class="menu-item cat-table">
                        <a href="#">Table</a>
                    </li>
                    <li class="menu-item cat-wall">
                        <a href="#">Wall</a>
                    </li>
                    <li class="menu-item cat-graphic">
                        <a href="#">Graphic</a>
                    </li>
                    <li class="menu-item cat-furniture">
                        <a href="#">Furniture</a>
                    </li>
                    <li class="menu-item cat-press">
                        <a href="{{ url(app()->getLocale() . "/press-area") }}">Press</a>
                    </li>
                    <li class="menu-item">
                        <a href="#">Projects</a>
                    </li>
                    <li class="menu-item">
                        <a href="#">Inspirations</a>
                    </li>
                    <li class="menu-item">
                        <a href="#">Unique Blog</a>
                    </li>

                </ul>
            </div>
        </nav>
    </div>
</div>