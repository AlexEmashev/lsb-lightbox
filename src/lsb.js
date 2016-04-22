"use strict";

/**
 * jQuery plugin "Lightspeed box".
 * Lightbox plugin with transitions and wait cursor.
 *
 * Author: Alexander Emashev
 * License: The MIT public license.
 */
(function ($) {
  $.fn.lightspeedBox = function () {
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
    // Image download button.
    var $download;
    // Used for transition effect between slides.
    var transitionTimeout = 700;

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
        var images = $('.lightspeed-preview');
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
      },
      /**
       * Returns next image reference.
       */
      nextImage: function () {
        if (this.collection.length <= 1) {
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
        if (this.collection.length <= 1) {
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
        spinCircle += '<div class="spin-circle"></div>';
      }

      $('body').append(
        '<div class="lightspeed-box">' +
        '<div class="lsb-content">' +
        '<img class="lsb-image lsb-noimage">' +
        '<div class="fading-spinner wait-icon">' +
        spinCircle +
        '</div>' +
        '<div class="lsb-controls">' +
        '<span class="lsb-control lsb-prev" title="Previous image"></span>' +
        '<a class="lsb-control lsb-download" href="#" target="_blank" download title="Download image"></a>'+
        '<span class="lsb-control lsb-next" title="Next image"></span>' +
        '</div>' +
        '</div>' +
        '</div>'
      );

      // Lightbox element.
      $lsb = $('.lightspeed-box');
      $spinner = $('.fading-spinner');
      $lsbImage = $lsb.find('.lsb-image');
      // Next image button.
      $next = $lsb.find('.lsb-next');
      // Previous image button.
      $prev = $lsb.find('.lsb-prev');
      $download = $lsb.find('.lsb-download');

      ///// Add event handlers for elements.
      
      /**
       * Next image button click.
       */
      $next.click(function (event) {
        event.preventDefault();
        var img = imageCollection.nextImage();
        switchImage(img);
      });

      /**
       * Previous image button click.
       */
      $prev.click(function (event) {
        event.preventDefault();
        var img = imageCollection.previousImage();
        switchImage(img);
      });

      /**
       * Click on empty space of lightbox.
       */
      $lsb.click(function (event) {
        // Return if lightbox controls were clicked.
        if ($(event.target.parentElement).hasClass('lsb-controls')) {
          return;
        }
        
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
    
    var imageLoaded = false;
    var transitionTimerElapsed = false;
    
    /**
    * Shows image when animation has finished.
    */
    function displayImage() {
      if (transitionTimerElapsed) {
        transitionTimerElapsed = false
        $spinner.css('opacity', 0);
        $lsbImage.removeClass('lsb-noimage');
        $lsbImage.addClass('lsb-image-loaded');
      }
    }

    /**
     * Switches image to specific.
     * @param href image reference.
     */
    function switchImage(href) {
      imageLoaded = false;
      $lsbImage.addClass('lsb-noimage');
      $lsbImage.removeClass('lsb-image-loaded');
      $spinner.css('opacity', 1);
      // Set timeout to show the transition effect.
      // Normally it'll be visible without timer, since image takes time to load.
      // But if image is already in cache, there won't be any animation.
      window.setTimeout(function(){
        transitionTimerElapsed = true;
        if(imageLoaded) {
          displayImage();
        }
      }, transitionTimeout);
      
      //Load image.
      var $img = $('<img />').attr('src', href).on('load', function () {
        // Get all images to set.
        imageCollection.getImagesInSet(href);

        if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
          // ToDo: show something, when image is broken.
          // Image is broken.
          //$template.append('<span>No Image</span>');
        } else {
          $lsbImage.attr('src', $img.attr('src'));
          // Set download button reference
          $download.attr('href', href);
          displayImage();
        }
        
        imageLoaded = true;
      });
    }

    ////////// Event handlers ///////////

    /**
     * Click on any of the previews.
     */
    $('.lightspeed-preview').click(function (event) {
      event.preventDefault();
      var fullSizeHref = event.target.parentElement.getAttribute('href');
      showLightbox();
      switchImage(fullSizeHref);
    });
  };
}(jQuery));