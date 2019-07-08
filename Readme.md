# LightSpeedBox (lightbox jQuery plugin)

## About

LightSpeedBox is a jQuery plugin for a fancy image preview box (also called a lightbox).

![Preview](http://alexemashev.github.io/lsb-lightbox/img/preview.gif)

Please see [demo page here](http://alexemashev.github.io/lsb-lightbox/).

## Features

- Click thumbnail to show the lightbox
- Individual image preview as well as go through a gallery
- Responsive
- Slideshow
- Controls: next, previous image, close button, keyboard, swipe for touch screens
- Smooth transitions and animations using CSS
- Localization

## Dependencies

Ubiquitous [jQuery](http://jquery.com/) library

## Installation

### Manual Installation

For manual installation just include these two files into **&lt;head&gt;** of your page:
[lsb.min.js](http://alexemashev.github.io/lightspeedbox/dist/lsb.min.js)
[lsb.css](http://alexemashev.github.io/lightspeedbox/dist/lsb.css)

You'll also need to add [jQuery](http://jquery.com/) library if it's not already added.

### Using Bower

Use following command:
`bower install lightspeedbox`
or
`bower install lightspeedbox --save`
to save to your project as dependency.

## Usage

To initialize the plugin put this script into your head tag.

```JavaScript
<script>
$(window).load(function() {
  $.fn.lightspeedBox();
});
</script>
```

In HTML wrap images in **&lt;a&gt;** tag with class **.lsb-preview**.

```HTML
<a href="img/full_scale.jpg" class="lsb-preview">
  <img src="img/preview.jpg" alt="Image Title">
</a>
```

Use data-lsb-group data attribute with group name in **&lt;a&gt;** tag to combine images into single group to switch between them.

```HTML
<a href="img/full_scale.jpg" class="lsb-preview" data-lsb-group="group1">
  <img src="img/preview.jpg" alt="Image Title">
</a>
<a href="img/full_scale2.jpg" class="lsb-preview" data-lsb-group="group1">
  <img src="img/preview2.jpg" alt="Image Title 2">
</a>
```

Use data-lsb-download-link data attribute in **&lt;a&gt;** tag to provide alternative image for downloading.

```HTML
<a href="img/lightbox-image.jpg" class="lsb-preview" data-lsb-download-link="http://example.com/fullsize-image.jpg">
  <img src="img/preview.jpg" alt="Image Title">
</a>
```

## Settings

The plugin accepts following parameters as a simple JavaScript object:

| Property           | Default   | Description                                                                                             |
| ------------------ | --------- | ------------------------------------------------------------------------------------------------------- |
| showImageTitle     | true      | Show image title (title uses alt attribute of an image).                                                |
| showImageCount     | true      | Number of images in group and number of current image (doesn't show up when single image is displayed). |
| showDownloadButton | true      | Show download full-size image button.                                                                   |
| showPlayButton     | true      | Slideshow button (doesn't show up when single image is displayed).                                      |
| slideShow          | false     | Slideshow enabled, when lightbox first time open.                                                       |
| slideShowTiming    | 3500      | Slideshow delay (msec).                                                                                 |
| zIndex             | 30        | z-index property of lightbox (bump it higher if it shows up beneath the other elements).                |
| locale             | see below | Localization object for element titles.                                                                 |

## Localization

Locale object looks like this:

```JavaScript
{
  nextButton: 'Next image',
  prevButton: 'Previous image',
  closeButton: 'Close',
  downloadButton: 'Download image',
  noImageFound: 'Sorry, no image found.',
  playButton: 'Play slideShow',
  pauseButton: 'Stop slideShow'
}
```

Example of using the settings:

```JavaScript
<script>
$(window).load(function() {
  $.fn.lightspeedBox({showImageCount: false, locale: {noImageFound: 'Image is missing'}});
});
</script>
```

## License

The MIT License (MIT)
Copyright (c) 2019 Alexander Emashev

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
