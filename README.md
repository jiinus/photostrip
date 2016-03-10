# Photostrip

Photostrip is a lightweight JQuery-plugin to adjust arbitrary number of blocks on an evenly justified rows.

## Example

### HTML
```html
<div class="photostrip">
	<div class="photo" data-original-width="300" data-original-height="200">
		<img src="photo1.jpg">
	</div>
	<div class="photo" data-original-width="300" data-original-height="200">
		<img src="photo2.jpg">
	</div>
	<div class="photo" data-original-width="300" data-original-height="200">
		<img src="photo3.jpg">
	</div>
	<div class="photo" data-original-width="300" data-original-height="200">
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
