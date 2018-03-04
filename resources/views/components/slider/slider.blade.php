<section id="sliders">
    <div class="items-carousel">
        @foreach($sliders as $slider)
            <div class="slider">
                <img src="{{ asset($slider->img)}}" alt="{{ $slider->alt }}">
            </div>
        @endforeach
    </div>
</section>