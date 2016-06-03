#LightSpeedBox (lightbox jQuery plugin)

##About

LightSpeedBox is a jQuery plugin that represents a fancy image preview box (also called a lightbox).

Please see [demo page here](http://).

##Features

- Click thumbnail to show the lightbox
- Individual image preview as well as go through a gallery
- Responsive
- Slideshow (auto playback)
- Controls: next, previous image, close button, keyboard, swipe for touch screens
- Smooth transitions and animations
- Localization

##Dependencies

- [jQuery](http://jquery.com/)

##Installation

###Manual Installation

For manual installation just include these two files into your page:
[lsb.js](http://alexemashev.github.io/lightspeedbox/dist/lsb.js)
[lsb.css](http://alexemashev.github.io/lightspeedbox/dist/lsb.css)

You'll also need to add [jQuery](http://jquery.com/) library if it's not already.

###Using Bower

Use following command:
`bower install lightspeedbox`
or
`bower install lightspeedbox --save`
to save to your project as dependency.

##Usage

To initialize the plugin put this script into your head tag.

```JavaScript
<script>
$(window).load(function() {
  $.fn.lightspeedBox();
});
</script>
```

In HTML wrap image in **&lt;a&gt;** tag and add class **.lsb-preview**.
```HTML
<a href="img/full_scale.jpg" class="lsb-preview">
  <img src="img/preview.jpg" alt="Image Title">
</a>
```

If you add to the **&lt;a&gt;** tag data attribute **data-lsb-group** with unique name for the group lightbox will find all pictures in group and allow to switch between them.

##API

The plugin accepts following parameters:

| Property         | Default   | Description                                                                       |
|------------------|-----------|----------------------------------------------------------------------------------|
|showImageTitle|true       |Show image title (from alt attribute).|
|showImageCount|true       |Number of images in group and number of current image (doesn't show up when single image displayed).|
|showDownloadButton    |true|Show download full-size image button.|
|showAutoPlayButton          |true      |Slideshow button (doesn't show up when single image displayed).|
|autoPlayback   |false      |Slideshow enabled, when lightbox first time open.|
|playbackTiming   |3500      |Slideshow delay (msec).|
|zIndex           |30      |z-index property of lightbox (bump it higher if it shows up beneath the other elements).|
|locale           |see below     |Localization object for element titles.|

Locale object looks like this:

```JSON
{
  nextButton: 'Next image',
  prevButton: 'Previous image',
  closeButton: 'Close',
  downloadButton: 'Download image',
  noImageFound: 'Sorry, no image found.',
  downloadButton: 'Download image',
  autoplayButton: 'Enable autoplay'
}
```

##License

The MIT public license.