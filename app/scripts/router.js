/**
 * Created by aakash on 1/22/14.
 */
"use strict";

var $ = require('jquery/dist/jquery')(window),
  Backbone = require('backbone');

Backbone.$ = $;

module.exports = Backbone.Router.extend({

  routes: {
    "": "home"
  },

  home: function () {
    console.log("voila");
  }
});
