# Photostrip

Photostrip is a lightweight JQuery-plugin to layout differently sized elements to evenly justified rows.

## Example
```
 _____   _______________   __________
|     | |               | |          |
|     | |               | |          |
|_____| |_______________| |__________|
 ____________________   _____________
|                    | |             |
|                    | |             |
|____________________| |_____________|
 ______________   _________   _______
|              | |         | |       |
|              | |         | |       |
|______________| |_________| |_______|
```

## Usage

### HTML
```html
<div class="photostrip">
	<div class="photo" data-original-width="300" data-original-height="200">
		<img src="photo1.jpg">
	</div>
	<div class="photo" data-original-width="100" data-original-height="500">
		<img src="photo2.jpg">
	</div>
	<div class="photo" data-original-width="300" data-original-height="300">
		<img src="photo3.jpg">
	</div>
	<div class="photo" data-original-width="200" data-original-height="600">
		<img src="photo4.jpg">
	</div>
</div>
```

### CSS
```css
.photostrip .photo {
	width: 100%;
	height: 100%;
}
```

### Javascript
```javascript
$('.photostrip').photostrip({
	height: 300,		// Maximum height of photos on a row
	gap: 8,				// Gap between the photos
	watchResize: true	// Update layout when browser is resized
});
```

### Angular-plugin

There's also an Angular-plugin which can be used to live-update the layout when the parameters change, for example if you want to use larger photo size for other view mode and smaller for another or something like that.

#### Usage

Load the script file:
```html
<script type="text/javascript" src="angular-photostrip.js"></script>
```

Add the photostrip module as a dependency to your application module:
```javascript
var app = angular.module('MyApp', ['ng-photostrip'])
```

Apply the directive to your photostrip-container:
```html
<div class="photostrip" ng-photostrip="{ height: photostripHeight, gap: photostripGap }">
	...
</div>
```