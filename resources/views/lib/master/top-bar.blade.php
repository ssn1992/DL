{{-- Top Bar Section --}}
<div class="top-bar">
    <div class="container">
        <div class="row">
            <div class="col-sm-4">
                <span class="text-light">Welcome to DelightFULL <i class="material-icons info_outline"></i></span>
            </div>
            <div class="col-sm-4 text-center">
                <a href="https://www.facebook.com/delightfull.lab" target="_blank" class="social socicon-facebook"></a>
                <a href="https://twitter.com/Delightfulll" target="_blank" class="social socicon-twitter"></a>
                <a href="https://pt.pinterest.com/delightfulll" target="_blank" class="social socicon-pinterest"></a>
                <a href="https://www.youtube.com/user/DelightfullLighting" target="_blank" class="social socicon-youtube"></a>
                <a href="https://plus.google.com/+DelightfullUniquelamps" target="_blank" class="social socicon-googleplus"></a>
                <a href="https://www.instagram.com/delightfulll" target="_blank" class="social socicon-instagram"></a>
                <a href="https://issuu.com/delightfull" target="_blank" class="social socicon-issuu"></a>
                <a href="https://www.linkedin.com/company/delightfull" target="_blank" class="social socicon-linkedin"></a>
            </div>
            <div class="col-sm-4 text-right">
                <ul class="tools">
                    <li class="dropdown">
                        <a href="#">
                            <i class="material-icons language"></i>
                            <span class="hidden-md">Language</span>
                        </a>

                        <ul class="sub-menu">
                            <li><a href="/en">English</a></li>
                            <li><a href="/fr">French</a></li>
                            <li><a href="/de">German</a></li>
                            <li><a href="/ru">Russian</a></li>
                            <li><a href="/it">Italian</a></li>
                        </ul>
                    </li>

                    <li>
                        <a href="{{ url('login') }}">
                            <i class="material-icons person"></i>
                            <span class="hidden-md">My Account</span>
                        </a>
                    </li>

                    {{-- Admin Area --}}
                    @hasrole('Admin')
                    <li>
                        <a href="{{ url('admin-area/dashboard') }}">
                            <i class="material-icons lock"></i>
                            <span class="hidden-md">Admin Area</span>
                        </a>
                    </li>
                    @endhasrole
                    {{-- .Admin Area --}}

                </ul>
            </div>
        </div>
    </div>
</div>
{{-- .Top Bar Section --}}