<section id="{{ $id }}">
    <div class="items-carousel">
        @foreach($sliders as $slider)
            <div class="slider">
                <img src="{{  asset($slider['0']) }}" alt="{{ asset($slider['1']) }}">
            </div>
        @endforeach
    </div>
</section>