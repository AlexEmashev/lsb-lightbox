!(function(y) {
  'use strict';
  (y.fn.lightspeedBox = function(t) {
    var s,
      l,
      o,
      n,
      a,
      h,
      g,
      d,
      r,
      c,
      w,
      v,
      u = y.extend(
        {
          showImageTitle: !0,
          showImageCount: !0,
          showDownloadButton: !0,
          showPlayButton: !0,
          slideshow: !1,
          playbackTiming: 3500,
          zIndex: 30,
          locale: {
            nextButton: 'Next image',
            prevButton: 'Previous image',
            closeButton: 'Close',
            downloadButton: 'Download image',
            noImageFound: 'Sorry, no image found.',
            playButton: 'Play slideshow',
            pauseButton: 'Stop slideshow'
          }
        },
        t
      ),
      i = 400,
      p = !0,
      m = {
        current: null,
        images: [],
        getImagesInSet: function(t) {
          var i,
            o = [],
            n = 0,
            e = t.attr('data-lsb-group');
          if (e) {
            i = y('.lsb-preview[data-lsb-group="' + e + '"]');
            var a = t.attr('href');
            i.each(function(t, i) {
              var e = i.getAttribute('href'),
                s = y(i)
                  .find('img')
                  .attr('alt'),
                l = i.getAttribute('data-lsb-download-link');
              o.push({ href: e, alt: s, downloadUrl: l }), e === a && (n = t);
            });
          } else
            o.push({
              href: t.attr('href'),
              alt: t.find('img').attr('alt'),
              downloadUrl: t.attr('data-lsb-download-link')
            });
          (this.images = o),
            (this.current = n),
            1 === this.images.length
              ? (d.css('visibility', 'hidden'),
                g.css('visibility', 'hidden'),
                w.hide())
              : (d.css('visibility', 'visible'),
                g.css('visibility', 'visible'),
                u.showPlayButton && w.show());
        },
        nextImage: function() {
          return 0 === this.images.length
            ? ''
            : ((this.current += 1),
              this.current > this.images.length - 1 && (this.current = 0),
              this.images[this.current]);
        },
        previousImage: function() {
          return 0 === this.images.length
            ? ''
            : ((this.current -= 1),
              this.current < 0 && (this.current = this.images.length - 1),
              this.images[this.current]);
        },
        canSwitch: function() {
          return 1 < this.images.length;
        }
      };
    function f(t) {
      void 0 !== t && (t.stopPropagation(), q(!1)),
        1 < m.images.length ? B(m.nextImage()) : b();
    }
    function q(t) {
      t
        ? ((u.slideshow = !0),
          w.hide(),
          v.show(),
          window.setTimeout(x, u.playbackTiming))
        : ((u.slideshow = !1), w.show(), v.hide());
    }
    function b() {
      s.removeClass('lsb-active'),
        o.removeClass('lsb-image-loaded'),
        o.addClass('lsb-noimage'),
        (p = !0);
    }
    function x() {
      u.slideshow && f(),
        u.slideshow && !p && window.setTimeout(x, u.playbackTiming);
    }
    function B(t) {
      o.addClass('lsb-noimage'),
        o.removeClass('lsb-image-loaded'),
        n.addClass('lsb-image-notitle'),
        h.hide(),
        window.setTimeout(function() {
          !(function(i) {
            l.show(),
              u.showImageCount && 1 < m.images.length
                ? a.text(m.current + 1 + '/' + m.images.length)
                : a.text('');
            var t = y('<img />')
              .attr('src', i.href)
              .on('load', function() {
                o.attr('src', t.attr('src')),
                  u.showImageTitle && n.text(i.alt),
                  i.downloadUrl
                    ? c.attr('href', i.downloadUrl)
                    : c.attr('href', i.href),
                  l.hide(),
                  o.removeClass('lsb-noimage'),
                  o.addClass('lsb-image-loaded'),
                  n.removeClass('lsb-image-notitle');
              })
              .on('error', function(t) {
                l.hide(),
                  n.text(i.alt),
                  h.show(),
                  console.log('[LSB Error]:', t);
              });
          })(t);
        }, i);
    }
    !(function() {
      for (var t = '', i = 0; i < 12; i++)
        t += '<div class="waitingicon-circle"></div>';
      y('body').append(
        '<div class="lightspeed-box"><div class="lsb-content"><header class="lsb-header"><div class="lsb-image-count"></div><div class="lsb-image-title"></div></header><div class="lsb-control-panel"><a class="lsb-control lsb-panel-button lsb-play" title="Slideshow"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1408 1792"><path fill="#000" d="M1384 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1408 1792"><path fill="#fff" d="M1384 927l-1328 738q-23 13-39.5 3t-16.5-36v-1472q0-26 16.5-36t39.5 3l1328 738q23 13 23 31t-23 31z" /></svg></a><a class="lsb-control lsb-panel-button lsb-pause" title="Stop Slideshow"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1536 1792"><path fill="#000" d="M1536 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zM640 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1536 1792"><path fill="#fff" d="M1536 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45zM640 192v1408q0 26-19 45t-45 19h-512q-26 0-45-19t-19-45v-1408q0-26 19-45t45-19h512q26 0 45 19t19 45z" /></svg></a><a class="lsb-control lsb-panel-button lsb-download" download title="Download Image"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1664 1792"><path fill="#000" d="M1280 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zM1536 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zM1664 1120v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zM1339 551q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1664 1792"><path fill="#fff" d="M1280 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zM1536 1344q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zM1664 1120v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h465l135 136q58 56 136 56t136-56l136-136h464q40 0 68 28t28 68zM1339 551q17 41-14 70l-448 448q-18 19-45 19t-45-19l-448-448q-31-29-14-70 17-39 59-39h256v-448q0-26 19-45t45-19h256q26 0 45 19t19 45v448h256q42 0 59 39z" /></svg></a></div><div class="lsb-image-container"><div class="lsb-no-image-found"><div class="no-found-msg">Sorry, no image found.</div></div><img class="lsb-image lsb-noimage"></div><div class="waitingicon">' +
          t +
          '</div><div class="lsb-control lsb-close"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1408 1792"><path fill="#000" d="M1298 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1408 1792"><path fill="#fff" d="M1298 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z" /></svg></div><div class="lsb-control lsb-prev" title="Previous Image"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 640 1792"><path fill="#000" d="M627 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 640 1792"><path fill="#fff" d="M627 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" /></svg></div><div class="lsb-control lsb-next" title="Next Image"><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 640 1792"><path fill="#000" d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" /></svg><svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 640 1792"><path fill="#fff" d="M595 960q0 13-10 23l-466 466q-10 10-23 10t-23-10l-50-50q-10-10-10-23t10-23l393-393-393-393q-10-10-10-23t10-23l50-50q10-10 23-10t23 10l466 466q10 10 10 23z" /></svg></div></div></div>'
      ),
        (s = y('.lightspeed-box')).css('z-index', u.zIndex),
        (l = y('.waitingicon')),
        (o = s.find('.lsb-image')),
        (n = s.find('.lsb-image-title')),
        (a = s.find('.lsb-image-count')),
        (h = s.find('.lsb-no-image-found')),
        (g = s.find('.lsb-next')),
        (d = s.find('.lsb-prev')),
        (r = s.find('.lsb-close')),
        (c = s.find('.lsb-download')),
        (w = s.find('.lsb-play')),
        (v = s.find('.lsb-pause')),
        u.showDownloadButton || c.hide(),
        u.showPlayButton || w.hide(),
        v.hide(),
        g.attr('title', u.locale.nextButton),
        d.attr('title', u.locale.prevButton),
        r.attr('title', u.locale.closeButton),
        c.attr('title', u.locale.downloadButton),
        w.attr('title', u.locale.playButton),
        v.attr('title', u.locale.pauseButton),
        h.find('.no-found-msg').text(u.locale.noImageFound);
      var e = { x: 0, y: 0 };
      y('.lsb-preview').mousedown(function(t) {
        (e.x = t.clientX), (e.y = t.clientY);
      }),
        y('.lsb-preview').mouseup(function(t) {
          Math.abs(e.x - t.clientX) < 20 &&
            Math.abs(e.y - t.clientY) < 20 &&
            (m.getImagesInSet(y(this)),
            (p = !1),
            a.text(''),
            s.addClass('lsb-active'),
            B(m.images[m.current]),
            u.slideshow && window.setTimeout(x, u.playbackTiming));
        }),
        y('.lsb-preview').click(function(t) {
          t.preventDefault();
        }),
        s.swipeDetector().on('swipeLeft.lsb swipeRight.lsb', function(t) {
          1 < m.images.length &&
            ('swipeLeft' === t.type
              ? B(m.nextImage())
              : 'swipeRight' === t.type && B(m.previousImage()));
        }),
        y(document).on('keyup.lightspeed-box', function(t) {
          s.hasClass('lsb-active') &&
            (39 === t.which && 1 < m.images.length
              ? (t.stopPropagation(), B(m.nextImage()))
              : 37 === t.which && 1 < m.images.length
              ? (t.stopPropagation(), B(m.previousImage()))
              : 27 === t.which && b());
        }),
        g.click(function(t) {
          t.stopPropagation(), (u.slideshow = !1), B(m.nextImage());
        }),
        d.click(function(t) {
          t.stopPropagation(), (u.slideshow = !1), B(m.previousImage());
        }),
        w.click(function(t) {
          t.stopPropagation(), q(!0);
        }),
        v.click(function(t) {
          t.stopPropagation(), q(!1);
        }),
        c.click(function(t) {
          t.stopPropagation();
        }),
        h.click(f),
        o.click(f),
        s.click(function(t) {
          q(!1), b();
        }),
        n.click(function(t) {
          t.stopPropagation();
        });
    })();
  }),
    (y.fn.swipeDetector = function(s) {
      var l = 0,
        o = 0,
        n = 0,
        a = 0,
        h = 0,
        i = this,
        t = { swipeThreshold: 70, useOnlyTouch: !0 };
      function e(t) {
        (s.useOnlyTouch && !t.originalEvent.touches) ||
          (t.originalEvent.touches && (t = t.originalEvent.touches[0]),
          0 === l && ((l = 1), (o = t.clientX), (n = t.clientY)));
      }
      function g(t) {
        2 === l &&
          ((l = 0),
          Math.abs(a) > Math.abs(h) && Math.abs(a) > s.swipeThreshold
            ? a < 0
              ? i.trigger(y.Event('swipeLeft.lsb'))
              : i.trigger(y.Event('swipeRight.lsb'))
            : Math.abs(h) > s.swipeThreshold &&
              (h < 0
                ? i.trigger(y.Event('swipeUp.lsb'))
                : i.trigger(y.Event('swipeDown.lsb'))));
      }
      function d(t) {
        if (1 === l) {
          t.originalEvent.touches && (t = t.originalEvent.touches[0]);
          var i = t.clientX - o,
            e = t.clientY - n;
          (Math.abs(i) > s.swipeThreshold || Math.abs(e) > s.swipeThreshold) &&
            ((l = 2), (a = i), (h = e));
        }
      }
      return (
        (s = y.extend(t, s)),
        i.on('mousedown touchstart', e),
        y('html').on('mouseup touchend', g),
        y('html').on('mousemove touchmove', d),
        i
      );
    });
})(jQuery);
