@extends('layouts.app')

@section('page_heading')
Homepage Areas
@endsection

@section('content')

<div id="menu-home" class="col-xs-12 col-sm-12 col-md-12 ">
                        
                            
    <li id="m1" class="homeBtn"><a title="Drag n drop to reorder the blocks" class="current tip-bottom" href="{{url('')}}">Slider  </a></li>

    <li id="m2" class="homeBtn"><a title="Drag n drop to reorder the blocks" class="current tip-bottom" href="{{url('')}}">Categories  </a></li>

    <li id="m3" class="homeBtn"><a title="Drag n drop to reorder the blocks" class="current tip-bottom" href="{{url('')}}">Projects  </a></li>

    <li id="m4" class="homeBtn"><a title="Drag n drop to reorder the blocks" href="{{url('')}}">Newsletter Sign Up  </a></li>

    <li id="m5" class="homeBtn"><a title="Drag n drop to reorder the blocks" class="current tip-bottom" href="{{url('')}}">Instagram  </a></li>

    <li id="m6" class="homeBtn"><a title="Drag n drop to reorder the blocks" class="current tip-bottom" href="{{url('')}}">Banner  </a></li>



   
</div>

@endsection
