<?php
// To use this module use like:
// @component('components.video.video', array('title' => 'DelightFull',
//                                            'subTitle' => 'Video',
//                                            'links' => [['col-lg-12', 'https://www.youtube.com/embed/ymssP1G4pqU']] ))
?>

@foreach($links as $link)

<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x padding-bottom-1x video-block">

    {{-- Block Title  --}}
    <h2 class="block-title text-center">
        {{ $link[0] }}
        <small>{{ $link[1] }}</small>
    </h2>
    {{-- -Block Title  --}}

</div>

@foreach($link[2] as $video)

<div class="{{ $video[0] }}">
    <div class="embed-responsive embed-responsive-16by9">
        <iframe class="embed-responsive-item" src="{{ url($video[1]) }}" allowfullscreen></iframe>
    </div>
    <h6 class="text-center sub-title">{{ $video[2] }} </h6>
</div>

@endforeach


@endforeach

