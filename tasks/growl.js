/*
 * grunt-growl
 * https://github.com/alextucker/grunt-growl
 *
 * Copyright (c) 2012 Alex Tucker
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('growl', 'Configure system notifications from your gruntfile', function() {
    var growl = require('growl');
    var _ = require('underscore');
    var config = {}
      
    if(_.has(this.data, 'title')) {
      config.title = this.data.title
    }

    if(_.has(this.data, 'image')) {
      config.image= this.data.image
    }
      
    growl(this.data.message, config);
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('growl', function() {
    return 'growl!!!';
  });

};
