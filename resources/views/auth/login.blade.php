<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>DelightfFULL </title>

    {{-- STYLE SECTION --}}
    <link href="{!! asset('css/master-backoffice/login.css') !!}" media="all" rel="stylesheet" type="text/css" />
    @yield('styles')
    {{-- .STYLE SECTION --}}
</head>
<body class="signup-page">

<div class="wrapper">
    <div id="login-background" class="header header-filter">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">

                    <div onclick="window.location='{{ URL::to('/') }}'" id="brand-login" class="text-center">
                        <h4> DelightFULL</h4>
                    </div>

                    <div class="card card-signup">
                        <form class="form-horizontal" method="POST" action="{{ route('login') }}">
                            {{ csrf_field() }}

                            <div class="header header-primary text-center">
                                <h4>Sign In</h4>
                            </div>
                            <div class="content">

                                <div class="input-group {{ $errors->has('email') ? ' has-error' : '' }}">
										<span class="input-group-addon">
											<i class="material-icons">email</i>
										</span>
                                    <input id="email" type="email" name="email" class="form-control" placeholder="Email..." value="{{ old('email') }}" required>
                                </div>


                                <div class="input-group {{ $errors->has('email') ? ' has-error' : '' }}">
                                    @if ($errors->has('email'))
                                        <span class="help-block text-center">
                                                <strong>{{ $errors->first('email') }}</strong>
                                            </span>
                                    @endif
                                </div>

                                <div class="input-group{{ $errors->has('password') ? ' has-error' : '' }}">
										<span class="input-group-addon">
											<i class="material-icons">lock_outline</i>
										</span>
                                    <input id="password" type="password" name="password" placeholder="Password..." class="form-control" required/>

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>

                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" id="checkbox" type="checkbox" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                        Remember-me
                                    </label>
                                </div>

                            </div>
                            <div class="footer text-center">
                                <button type="submit" class="btn btn-simple btn-primary btn-lg">Login</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

{{-- SCRIPTS SECTION --}}
<script src="{!! asset('js/master-backoffice/master.js') !!}" type="text/javascript"></script>

</body>
</html>


