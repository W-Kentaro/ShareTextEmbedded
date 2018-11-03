'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*!
* Copyright (c) 2018 W-Kentaro
* Released under the MIT license
* https://opensource.org/licenses/mit-license.php
*/

var ShareTextEmbedded = function () {
  function ShareTextEmbedded() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    _classCallCheck(this, ShareTextEmbedded);

    this.GetOG = {
      url: '',
      description: '',
      Get: function Get() {
        for (var i = 0; i < document.head.children.length; i++) {
          if (document.head.children[i].getAttribute('property') === 'og:url') {
            this.url = document.head.children[i].getAttribute('content');
          }
          if (document.head.children[i].getAttribute('property') === 'og:description') {
            this.description = document.head.children[i].getAttribute('content');
          }
        }
      }
    };
    this.GetOG.Get();

    this.init = data.init || false;

    this.url = data.url || this.GetOG.url;
    this.text = data.text || this.GetOG.description;
    this.twitter = data.twitter || false;
    this.twitter = {
      elem: this.twitter.elem || '[data-share="twitter"]',
      url: this.twitter.url || this.url,
      text: this.twitter.text === null ? null : this.twitter.text || this.text,
      hash: this.twitter.hash || false,
      via: this.twitter.via || false,
      related: this.twitter.related || false
    };
    console.log(this.twitter.url);
    this.facebook = data.facebook || false;
    this.facebook = {
      elem: this.facebook.elem || '[data-share="facebook"]',
      url: this.facebook.url || this.url,
      text: this.facebook.text || this.text
    };
    this.line = data.line || false;
    this.line = {
      elem: this.line.elem || '[data-share="line"]',
      url: this.line.url === null ? null : this.line.url || this.url,
      text: this.line.text || this.text
    };

    this.shareText = {
      twitter: '',
      facebook: '',
      line: ''
    };
    if (!this.init) {
      this.Encode();
    }
  }

  _createClass(ShareTextEmbedded, [{
    key: 'Encode',
    value: function Encode() {
      this.url = encodeURIComponent(this.url);
      this.twitter.url = encodeURIComponent(this.twitter.url);
      this.twitter.text = this.twitter.text === null ? null : encodeURIComponent(this.twitter.text);
      this.twitter.hash = this.twitter.hash ? encodeURIComponent(this.twitter.hash) : this.twitter.hash;
      this.twitter.via = this.twitter.via ? encodeURIComponent(this.twitter.via) : this.twitter.via;
      this.twitter.related = this.twitter.related ? encodeURIComponent(this.twitter.related) : this.twitter.related;
      this.facebook.url = encodeURIComponent(this.facebook.url);
      this.facebook.text = encodeURIComponent(this.facebook.text);
      this.line.url = this.line.url === null ? null : encodeURIComponent(this.line.url);
      this.line.text = encodeURIComponent(this.line.text);

      this.Push();
    }
  }, {
    key: 'Push',
    value: function Push() {
      this.shareText = {
        twitter: 'http://twitter.com/share?url=' + this.twitter.url + (this.twitter.text === null ? '' : '&text=' + this.twitter.text) + (this.twitter.hash ? '&hashtags=' + this.twitter.hash : '') + (this.twitter.via ? '&via=' + this.twitter.via : '') + (this.twitter.related ? '&related=' + this.twitter.related : ''),
        facebook: 'http://www.facebook.com/sharer.php?u=' + this.facebook.url + '&t=' + this.facebook.text,
        line: 'http://line.me/R/msg/text/?' + this.line.text + (this.line.url === null ? '' : '%20' + this.line.url)
      };

      console.log(this.shareText.twitter);

      this.Embed(this.twitter.elem, 'twitter');
      this.Embed(this.facebook.elem, 'facebook');
      this.Embed(this.line.elem, 'line');
    }
  }, {
    key: 'Embed',
    value: function Embed(e, sns) {
      var item = document.querySelectorAll(e);
      for (var i = 0; i < item.length; i++) {
        if (sns === 'twitter') {
          item[i].setAttribute('href', this.shareText.twitter);
        }
        if (sns === 'facebook') {
          item[i].setAttribute('href', this.shareText.facebook);
        }
        if (sns === 'line') {
          item[i].setAttribute('href', this.shareText.line);
        }
      }
    }
  }, {
    key: 'Init',
    value: function Init() {
      this.Encode();
    }
  }]);

  return ShareTextEmbedded;
}();