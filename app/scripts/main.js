var GuitarWithGuru = function () {
  'use strict';
};

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
    /*    if (this.isRightSidebarVisible) {
     this.startVideo();
     }*/

  },
  startVideo: function() {
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  }


});

window.onload = function() {
  var gwg = new GuitarWithGuru();
  gwg.init();
};

/*// 3. This function creates an <iframe> (and YouTube player)
 //    after the API code downloads.
 var player;
 function onYouTubeIframeAPIReady() {
 player = new YT.Player('player', {
 height: '300',
 width: '100%',
 videoId: 'NavVfpp-1L4',
 events: {
 'onReady': onPlayerReady,
 'onStateChange': onPlayerStateChange
 }
 });
 }

 function onPlayerReady(event) {

 }

 function onPlayerStateChange(event) {

 }

 function stopVideo() {
 player.stopVideo();
 }*/
