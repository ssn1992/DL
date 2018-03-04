<section id="banner" class="padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12">
    <div class="container">
        <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <a href="{{ $banner->btn_link }}" target="_self" class="preview-box">
                    <img src="{{ asset($banner->img)}}" alt="{{ trans($banner->alt) }}">
                </a>
            </div>
        </div>
    </div>
</section>