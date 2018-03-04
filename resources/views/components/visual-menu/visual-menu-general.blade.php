<section id="visual-menu" class="col-lg-12 col-md-12 col-sm-12 hidden-xs">
    <div class="container">

        @if($hasTitle)
        <!-- Block Title -->
        <h2 class="block-title text-center margin-bottom-2x">
            {{ $title }}
            <small> {{ $subTitle }}</small>
        </h2>
        <!-- Block Title END -->
        @endif

        <div class="row">
            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="#" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-suspension.png' )}}" alt="">
                            <div class="tile-title">Suspension</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="#" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-floor.png' )}}" alt="">
                            <div class="tile-title">Floor</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="#" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-table.png' )}}" alt="">
                            <div class="tile-title">Table</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="#" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-wall.png' )}}" alt="">
                            <div class="tile-title">Wall</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="#" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-graphic.png' )}}" alt="">
                            <div class="tile-title">Graphic</div>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-lg-2 col-md-2 col-sm-2 hidden-xs ">
                <div class="col-lg-12">
                    <div class="tile tile-visual-menu">
                        <a href="/" class="preview-box">
                            <img src="{{ asset('img/visual-menu/cat-furniture.jpg' )}}" alt="">

                            <div class="tile-title">Furniture</div>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>