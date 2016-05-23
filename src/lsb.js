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
      showDownloadButton: true,
      showImageTitle: true,
      showImageCount: true
    };
    /**
    * Settings of the plugin.
    */
    var settings = $.extend(defaultSettings, options);

    /**
    * Lightbox element.
    */
    var $lsb;
    /**
    * Wait cursor.
    */
    var $spinner;
    /**
    * Image reference in lightbox.
    */
    var $lsbImage;
    /**
    * Image title from alt tag.
    */
    var $lsbTitle;
    /**
    * Image count
    */
    var $lsbCount;
    /**
    * Next image button.
    */
    var $next;
    /**
    * Previous image button.
    */
    var $prev;
    /**
    * Close button.
    */
    var $close;
    /**
    * Image download button.
    */
    var $download;
    /**
    * Used for transition effect between slides.
    */
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
       * {href: 'www.example.com/img.jpg', alt: 'Sample image &quot;1&quot;'}
       */
      images: [],
      /**
       * Fills image collection with appropriate images
       * @param selectedImg - current image element.
       */
      getImagesInSet: function (selectedImg) {
        var previews;
        // Reset previous images.
        var collectedImages = [];
        var curImgIndex = 0;
        
        // Get selected image props
        var selectedImgHref = event.target.parentElement.getAttribute('href');
        var selectedImgAlt = event.target.getAttribute('alt');
        // Check if element is in group.
        var group = event.target.parentElement.getAttribute('data-lsb-group');
        
        // Get all images in group
        if (group) {
          previews = $('.lightspeed-preview[data-lsb-group="' + group + '"]');
          // Fill collection with found elements.
          previews.each(function (i, element) {
            var elementHref = element.getAttribute('href');
            var alt = element.getAttribute('alt');

            collectedImages.push({href:elementHref, alt:alt});
            // Calculate image of the collection that should be displayed (the one user clicked).
            if (elementHref === selectedImgHref) {
              curImgIndex = i;
            }
          });
        } else { // If it is a single image
          collectedImages.push({href: selectedImgHref, alt: selectedImgAlt});
        }

        this.images = collectedImages;
        this.current = curImgIndex;
        // Hide next and previous buttons if there is only one image.
        if (this.images.length === 1) {
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
        if (this.images.length === 0) {
          return '';
        }

        this.current += 1;
        if (this.current > this.images.length - 1) {
          this.current = 0;
        }
        
        return this.images[this.current];
      },
      /**
       * Returns previous image reference.
       */
      previousImage: function () {
        if (this.images.length === 0) {
          return '';
        }

        this.current -= 1;
        if (this.current < 0) {
          this.current = this.images.length - 1;
        }

        return this.images[this.current];
      },
      /**
       * Returns true if images holds more than just one image.
       */
      canSwitch: function () {
        return this.images.length > 1;
      }
    };

    ////////////// Functions /////////////

    /**
     * Initializes the lightbox.
     */
    (function init() {
      var waitingIconCircle = '';

      for (var i = 0; i < 12; i++) {
        waitingIconCircle += '<div class="waitingicon-circle"></div>';
      }

      $('body').append(
        '<div class="lightspeed-box">' +
        '<div class="lsb-content">' +
        '<h3 class="lsb-image-count"></h3>' +
        '<h2 class="lsb-image-title"></h2>' +
        '<div class="lsb-image-container">' +
        '<img class="lsb-image lsb-noimage">' +
        '</div>' +
        '<div class="waitingicon">' +
        waitingIconCircle +
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
      $lsbTitle = $lsb.find('.lsb-image-title');
      $lsbCount = $lsb.find('.lsb-image-count');
      // Next image button.
      $next = $lsb.find('.lsb-next');
      // Previous image button.
      $prev = $lsb.find('.lsb-prev');
      $close = $lsb.find('.lsb-close');
      $download = $lsb.find('.lsb-download');

      if (!settings.showDownloadButton) {
        $download.css('display', 'none');
      }
      
      ///// Add event handlers for elements.

      // Add swipe detection plugin
      $lsb.swipeDetector().on('swipeLeft.lsb swipeRight.lsb', function (event) {
        console.log('swipe', event);
        if (imageCollection.images.length > 1) {
          if (event.type === 'swipeLeft') {
            switchImage(imageCollection.nextImage());
          } else if (event.type === 'swipeRight') {
            switchImage(imageCollection.previousImage());
          }
        }
      });
      
      /**
      * Keyboard support.
      */
      $(document).on('keyup.lightspeed-box', function (event) {
        if ($lsb.hasClass('lsb-active')) {
          // Right button press. Image switching make sence only if there are more than one image in collection.
          if (event.which === 39 && imageCollection.images.length > 1) {
            event.stopPropagation();
            switchImage(imageCollection.nextImage());
          } else if (event.which === 37 && imageCollection.images.length > 1) { // Left button press
            event.stopPropagation();
            switchImage(imageCollection.previousImage());
          } else if (event.which === 27) { // Esc button press
            closeLightbox();
          }
        }
      });


      /**
       * Next image button click.
       */
      $next.click(function (event) {
        event.stopPropagation();
        switchImage(imageCollection.nextImage());
      });

      /**
       * Previous image button click.
       */
      $prev.click(function (event) {
        event.stopPropagation();
        switchImage(imageCollection.previousImage());
      });

      $lsbImage.click(function (event) {
        event.stopPropagation();
        if (imageCollection.images.length > 1) {
          switchImage(imageCollection.nextImage());
        } else {
          closeLightbox();
        }
      });

      /**
       * Click on empty space of lightbox.
       */
      $lsb.click(function (event) {
        closeLightbox();
      });
      
      /**
      * Allow user to click or select image title.
      */
      $lsbTitle.click(function (event) {
        event.stopPropagation();
      });
      
    })();
    
        /**
     * Click on any of the previews.
     */
    $('.lightspeed-preview').click(function (event) {
      event.preventDefault();
      // Get all images to set.
      imageCollection.getImagesInSet(this);

      showLightbox();
      switchImage(imageCollection.images[imageCollection.current]);
    });

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
     * Switches image to specific.
     * @param imageObj image to which to switch to reference.
     */
    function switchImage(imageObj) {
      $lsbImage.addClass('lsb-noimage');
      $lsbImage.removeClass('lsb-image-loaded');
      $lsbTitle.addClass('lsb-image-notitle');

      // Use timeout to let the image transition effect play.
      window.setTimeout(function () {
        loadImage(imageObj);
      }, transitionTimeout);
    }


    /**
    * Loads full size image.
    */
    function loadImage(imageObj) {
      $spinner.css('display', 'block');
      console.log('Curr img collection:', imageCollection);
      // Show current image number.
      if (settings.showImageCount && imageCollection.images.length > 1) {
        console.log(imageCollection);
        $lsbCount.text((imageCollection.current + 1) + '/' + imageCollection.images.length);
      } else {
          $lsbCount.text('');
      }
      
      //Load image.
      var $img = $('<img />').attr('src', imageObj.href).on('load', function () {
        if (!this.complete || typeof this.naturalWidth === "undefined" || this.naturalWidth === 0) {
          // ToDo: show something, when image is broken.
          // Image is broken.
          //$template.append('<span>No Image</span>');
          $download.attr('href', imageObj.href);
          // Show at least a title, so user can refer it as didn't load image.
          $lsbTitle.text(imageObj.alt);
          console.log('Image not loaded');
        } else {
          // Set image.
          $lsbImage.attr('src', $img.attr('src'));
          if(settings.showImageTitle) {
            // Set image title.
            $lsbTitle.text(imageObj.alt);
          }
          // Set download button reference
          $download.attr('href', imageObj.href);
          displayImage();
        }
      });
    }
    
    /**
     * Shows image when animation has finished.
     */
    function displayImage() {
      $spinner.css('display', 'none');
      $lsbImage.removeClass('lsb-noimage');
      $lsbImage.addClass('lsb-image-loaded');
      $lsbTitle.removeClass('lsb-image-notitle');
    }
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