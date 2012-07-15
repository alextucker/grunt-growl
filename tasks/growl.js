/*
 * grunt-growl
 * https://github.com/alextucker/grunt-growl
 *
 * Copyright (c) 2012 Alex Tucker
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var growl = require('growl');

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('growl', 'Configure system notifications from your gruntfile', function() {
    growlMessage(this.data);
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('growl', growlMessage);

  // ==========================================================================
  // SHARED FUNCTIONS
  // ==========================================================================

  function growlMessage(config) {
    growl(config.message, config);
  }

};
