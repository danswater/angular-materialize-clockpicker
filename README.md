# triton-materialize-clockpicker

An angular wrapper for [chingyawhao/materialize-clockpicker](https://github.com/chingyawhao/materialize-clockpicker). Source code are base from [linagora/angular-clockpicker](https://github.com/linagora/angular-clockpicker)

## How to use

You can install it with bower package manager

```bower install triton-materialize-clockpicker```

To check if the dependencies are also installed.

```bower list --path```

## Quick setup

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <meta name="viewport", content="width=device-width, initial-scale=1">
  <title>clockpicker wrapper</title>
  <link rel="stylesheet" type="text/css" href="../bower_components/materialize/dist/css/materialize.css">
  <link rel="stylesheet" type="text/css" href="../src/materialize.clockpicker.css">
</head>
<body ng-app="app">

  <div ng-controller="dateCtrl">
    <p>
        Date : {{time.format('hh:mm A')}}
    </p>
    <p>
        <input type="text" data-ng-model='time' data-tm-clockpicker data-tm-clockpicker-options='options'></input>
        <button type="button" data-ng-click='randomTime()'>Random time</button>
    </p>
  </div>

  <script src="../bower_components/jquery/dist/jquery.js"></script>
  <script src="../bower_components/angular/angular.js"></script>
  <script src="../bower_components/moment/moment.js"></script>
  <script src="../bower_components/angular-moment/angular-moment.js"></script>
  <script src="../src/materialize.clockpicker.js"></script>
  <script src="../src/triton.materialize.clockpicker.js"></script>
  <script type="text/javascript">
    ( function () {
      angular.module( 'app', [
        'triton.materialize.clockpicker'
      ] )
      .controller( 'dateCtrl', function ( $scope ) {
        $scope.options = {
          done: 'Ok !!',
          twelvehour: true
        };
      } );
    } )();
  </script>
</body>
</html>
```

```html
<input type="text"
	data-ng-model='time'
	data-tm-clockpicker
	data-tm-clockpicker-options='options'>
</input>
```

You must always set the ```ng-model```, ```m-clockpicker-options``` is optional.

## note
This project does not support

 * mobile ( not yet tested )
 * 24 hour format
 * this will only output string value ```e.g 12:00 PM```
