"use strict";

/**
 * jQuery plugin "Lightspeed box".
 * Lightbox plugin with transitions and wait cursor.
 *
 * Author: Alexander Emashev
 * License: The MIT public license.
 */
(function ($) {
  $.fn.lightspeedBox = function (options) {
    var defaultSettings = {
      showDownloadButton: true
    };
    var settings = $.extend(defaultSettings, options);

    // Lightbox element..
    var $lsb;
    // Wait cursor.
    var $spinner;
    // Image reference in lightbox.
    var $lsbImage;
    // Next image button.
    var $next;
    // Previous image button.
    var $prev;
    // Close button
    var $close;
    // Image download button.
    var $download;
    // Used for transition effect between slides.
    var transitionTimeout = 400;

    /**
     * Collection of images to show in lightbox.
     */
    var imageCollection = {
      /** 
       * Current selected image.
       */
      current: null,
      /**
       * Image addresses collection.
       */
      collection: [],
      /**
       * Fills image collection with appropriate images
       * @param currentHref - current image reference.
       * @groupAttr - attribute to split images in groups.
       */
      getImagesInSet: function (currentHref, groupAttr) {
        var images;
        if (groupAttr) {
          images = $('.lightspeed-preview[data-lsb-group="' + groupAttr + '"]');
        } else {
          images = $('.lightspeed-preview:not([data-lsb-group])');
        }

        var hrefCollection = [];
        var currentImage = null;

        images.each(function (i, element) {
          var elementHref = element.getAttribute('href');
          hrefCollection.push(elementHref);
          if (elementHref === currentHref) {
            currentImage = i;
          }
        });

        this.collection = hrefCollection;
        this.current = currentImage;

        // Hide next and previous buttons if there is only one image.
        if (this.collection.length === 1) {
          $prev.css('visibility', 'hidden');
          $next.css('visibility', 'hidden');
        } else {
          $prev.css('visibility', 'visible');
          $next.css('visibility', 'visible');
        }
      },
      /**
       * Returns next image reference.
       */
      nextImage: function () {
        if (this.collection.length === 0) {
          return '';
        }

        this.current += 1;
        if (this.current > this.collection.length - 1) {
          this.current = 0;
        }

        return this.collection[this.current];
      },
      /**
       * Returns previous image reference.
       */
      previousImage: function () {
        if (this.collection.length === 0) {
          return '';
        }

        this.current -= 1;
        if (this.current < 0) {
          this.current = this.collection.length - 1;
        }

        return this.collection[this.current];
      },
      /**
       * Returns true if collection holds more than just one image.
       */
      canSwitch: function () {
        return this.collection.length > 1;
      }
    };

    ////////////// Functions /////////////

    /**
     * Initializes the lightbox.
     */
    (function init() {
      var spinCircle = '';

      var i;
      for (i = 0; i < 12; i++) {
        spinCircle += '<div class="waitingicon-circle"></div>';
      }

      $('body').append(
        '<div class="lightspeed-box">' +
        '<div class="lsb-content">' +
        '<div class="lsb-image-container">' +
        '<img class="lsb-image lsb-noimage">' +
        '</div>' +
        '<div class="waitingicon">' +
        spinCircle +
        '</div>' +
        '<div class="lsb-control lsb-close"><span class="lsb-control-text">˟</span></div>' +
        '<div class="lsb-control lsb-prev"><span class="lsb-control-text">&lt;</span></div>' +
        '<div class="lsb-control lsb-next"><span class="lsb-control-text">&gt;</span></div>' +
        '</div>' +
        '</div>'
      );

      // Lightbox element.
      $lsb = $('.lightspeed-box');
      $spinner = $('.waitingicon');
      $lsbImage = $lsb.find('.lsb-image');
      // Next image button.
      $next = $lsb.find('.lsb-next');
      // Previous image button.
      $prev = $lsb.find('.lsb-prev');
      $close = $lsb.find('.lsb-close');
      $download = $lsb.find('.lsb-download');

      if (!settings.showDownloadButton) {
        $download.css('display', 'none');
      }

      // Add swipe detection plugin
      $lsb.swipeDetector().on('swipeLeft.lsb swipeRight.lsb', function (event) {
        if (imageCollection.collection.length > 1) {
          if (event.type === 'swipeLeft') {
            switchImage(imageCollection.nextImage());
          } else if (event.type === 'swipeRight') {
            switchImage(imageCollection.previousImage());
          }
        }
      });

      ///// Add event handlers for elements.

      /**
       * Next image button click.
       */
      $next.click(function (event) {
        event.stopPropagation();
        var img = imageCollection.nextImage();
        switchImage(img);
      });

      /**
       * Previous image button click.
       */
      $prev.click(function (event) {
        event.stopPropagation();
        var img = imageCollection.previousImage();
        switchImage(img);
      });

      $lsbImage.click(function (event) {
        event.stopPropagation();
        if (imageCollection.collection.length > 1) {
          switchImage(imageCollection.nextImage());
        } else {
          closeLightbox();
        }
      });

      /**
       * Click on empty space of lightbox.
       */
      $lsb.click(function (event) {
        console.log('Close clicked', event);
        closeLightbox();
      });
    })();

    /**
     * Shows lightbox.
     */
    function showLightbox() {
      $lsb.addClass('lsb-active');
    }
    /**
     * Hides lightbox.
     */
    function closeLightbox() {
      $lsb.removeClass('lsb-active');
      $lsbImage.removeClass('lsb-image-loaded');
      $lsbImage.addClass('lsb-noimage');
    }

    /**
     * Shows image when animation has finished.
     */
    function displayImage() {
      $spinner.css('display', 'none');
      $lsbImage.removeClass('lsb-noimage');
      $lsbImage.addClass('lsb-image-loaded');
    }

    /**
     * Switches image to specific.
     * @param href image reference.
     */
    function switchImage(href) {
      $lsbImage.addClass('lsb-noimage');
      $lsbImage.removeClass('lsb-image-loaded');

      // Use timeout to let the image transition effect play.
      window.setTimeout(function () {
        loadImage(href);
      }, transitionTimeout);
    }


    function loadImage(href) {
      $spinner.css('display', 'block');
      //Load image.
      var $img = $('<img />').attr('src', href).on('load', function () {
        if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
          // ToDo: show something, when image is broken.
          // Image is broken.
          //$template.append('<span>No Image</span>');
        } else {
          $lsbImage.attr('src', $img.attr('src'));
          // Set download button reference
          $download.attr('href', href);
          displayImage();
        }
      });
    }

    ////////// Event handlers ///////////

    /**
     * Click on any of the previews.
     */
    $('.lightspeed-preview').click(function (event) {
      event.preventDefault();
      var fullSizeHref = event.target.parentElement.getAttribute('href');
      var group = $(this).attr('data-lsb-group');
      // Get all images to set.
      imageCollection.getImagesInSet(fullSizeHref, group);

      showLightbox();
      switchImage(fullSizeHref);
    });
  };

  /** Plugin to detect swipes
   */
  $.fn.swipeDetector = function (options) {
    // States: 0 - no swipe, 1 - swipe started, 2 - swipe released
    var swipeState = 0;
    // Coordinates when swipe started
    var startX = 0;
    var startY = 0;
    // Distance of swipe
    var pixelOffsetX = 0;
    var pixelOffsetY = 0;
    // Target element which should detect swipes.
    var swipeTarget = this;
    var defaultSettings = {
      // Amount of pixels, when swipe don't count.
      swipeTreshold: 20
    };

    // Initializer
    (function init() {
      options = $.extend(defaultSettings, options);
      // Support touch and mouse as well.
      swipeTarget.on('mousedown touchstart', swipeStart);
      $('html').on('mouseup touchend', swipeEnd);
      $('html').on('mousemove touchmove', swiping);
    })();

    function swipeStart(event) {
      if (event.originalEvent.touches)
        event = event.originalEvent.touches[0];

      if (swipeState === 0) {
        swipeState = 1;
        startX = event.clientX;
        startY = event.clientY;
      }
    }

    function swipeEnd(event) {
      if (swipeState === 2) {
        swipeState = 0;

        if (Math.abs(pixelOffsetX) > Math.abs(pixelOffsetY)) { // Horizontal Swipe
          if (pixelOffsetX < 0) {
            swipeTarget.trigger($.Event('swipeLeft.lsb'));
          } else {
            swipeTarget.trigger($.Event('swipeRight.lsb'));
          }
        } else { // Vertical swipe
          if (pixelOffsetY < 0) {
            swipeTarget.trigger($.Event('swipeUp.lsb'));
          } else {
            swipeTarget.trigger($.Event('swipeDown.lsb'));
          }
        }
      }
    }

    function swiping(event) {
      // If swipe don't occuring, do nothing.
      if (swipeState !== 1)
        return;


      if (event.originalEvent.touches) {
        event = event.originalEvent.touches[0];
      }

      var swipeOffsetX = event.clientX - startX;
      var swipeOffsetY = event.clientY - startY;

      if ((Math.abs(swipeOffsetX) > options.swipeTreshold) ||
        (Math.abs(swipeOffsetY) > options.swipeTreshold)) {
        swipeState = 2;
        pixelOffsetX = swipeOffsetX;
        pixelOffsetY = swipeOffsetY;
      }
    }

    return swipeTarget; // Return element available for chaining.
  }
}(jQuery));