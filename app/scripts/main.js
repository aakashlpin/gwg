"use strict";

var $ = require('jquery/dist/jquery')(window);
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var Router = require('./router');
var router = new Router();

Backbone.history.start();


var GuitarWithGuru = function () {};

_.extend(GuitarWithGuru.prototype, {
  isRightSidebarVisible: false,
  init: function() {
    this.initCycleDataKeywords();
    this.initRightSidebarBar();

  },
  initCycleDataKeywords: function() {
    var keywordElements = document.querySelectorAll('[data-keywords]');
    _.each(keywordElements, function(keywordElem) {
      var keywords = keywordElem.getAttribute('data-keywords');
      this.cycleDataKeywords.call(this, keywordElem, keywords);

    }, this);

  },
  cycleDataKeywords: function(keywordElem, keywords) {
    var i = 0;
    var keywordsArray = keywords.substr(1, keywords.length -2).split(',');
    var keywordsLength = keywordsArray.length;
    setInterval(function() {
      if (++i >= keywordsLength) {
        i = 0;
      }
      keywordElem.style.display = 'none';
      keywordElem.innerHTML = keywordsArray[i];
      $(keywordElem).fadeIn();
    }, 3000);

  },
  initRightSidebarBar: function() {
    var faces = document.querySelectorAll('.list-faces a');
    $(faces).on('click', this.toggleRightSidebar.bind(this));

  },
  toggleRightSidebar: function(e) {
    e.preventDefault();
    this.isRightSidebarVisible = !this.isRightSidebarVisible;
    $('.right-sidebar').toggleClass('open');
    $('body').toggleClass('is--pushed-left');
    $('#usp').toggle();
    $('#header').toggle();

  }
});

window.onload = function() {
  var gwg = new GuitarWithGuru();
  gwg.init();
};
