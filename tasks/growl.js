/*
 * grunt-growl
 * https://github.com/alextucker/grunt-growl
 *
 * Copyright (c) 2012 Alex Tucker
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  var growl = require('growl'),
      path = require('path'),
      messages = [],
      ignoreWatch = false;

  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/cowboy/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // SHARED FUNCTIONS
  // ==========================================================================

  function growlMessage(config) {
    growl(config.message, config);
  }

  function flushMessages(status) {
    if( messages.length <= 0 ) {
      return;
    }

    growlMessage({
      message: messages.join('\n'),
      title: 'Grunt',
      image: __dirname + '/../img/' + status + '.png'
    });
    messages = [];
  }

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('growl', 'Configure system notifications from your gruntfile', function() {
    growlMessage(this.data);
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  grunt.registerHelper('growl', function(config){
    growlMessage(config);
  });

  grunt.registerHelper('growlmock', function(mock){
    growlMessage = mock;
  });

  // ==========================================================================
  // DEFAULT NOTIFICATIONS
  // ==========================================================================

  function initGrowlStatus() {
    grunt.utils.hooker.hook(grunt.log, 'write', function(msg){
      if( grunt.log.uncolor(msg).match(/Waiting.../) ) { flushMessages('ok'); }
    });

    grunt.utils.hooker.hook(grunt.log, 'header', function(msg){
      msg = grunt.log.uncolor(msg);

      if( ignoreWatch && msg.match(/"watch" task/) ) { return; }

      if( msg.match(/".+:.+"/) ) { return; }

      if( !ignoreWatch && msg.match(/"watch" task/) ) {
        msg += ' for ' + path.basename(process.cwd());
        ignoreWatch = true;
      }

      messages.push(msg);
    });

    grunt.utils.hooker.hook(grunt.log, 'ok', function(msg){
      if( typeof msg === 'string' ) {
       messages.push(grunt.log.uncolor(msg));
      }
    });

    grunt.utils.hooker.hook(grunt, 'warn', function(error){
      var warning = [];

      if( typeof error !== 'undefined' ) {
        warning.push(messages[0]);
        warning.push(messages[messages.length-1]);
        warning.push(String(error.message || error));
        messages = warning;
        flushMessages('error');
      }
    });

    grunt.utils.hooker.hook(grunt.log, 'error', function(msg){
      if( typeof msg === 'string' ) {
       messages.push(grunt.log.uncolor(msg));
       flushMessages('error');
      }
    });
  }

  grunt.utils.hooker.hook(grunt, 'initConfig', {
    once: true,
    post: function(){
      if( grunt.config('growlstatus') !== false ) {
        initGrowlStatus();
      }
    }
  });

};
