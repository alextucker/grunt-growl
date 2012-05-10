# grunt-growl

Configure desktop notifications inside your gruntfile. Makes 'grunt watch' more fun.

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-growl`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-growl');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

## Documentation
This grunt multitask allows you to configure desktop notifications inside your gruntfile and use them inside your tasks. This tasks makes use of [node-growl] in order to make desktop  notifications cross platform-ish.

[node-growl]: https://github.com/visionmedia/node-growl

### Example

```javascript
grunt.initConfig({
    growl : {
    	myMessage : {
    		message : "Some message",
    		title : "Notification Title",
    		image : __dirname + "/foo.png"
    	}
	}	
});

grunt.loadNpmTasks('grunt-growl');

grunt.registerTask('default', 'growl:myMessage');
```
If you run 'grunt' you would see something like this:

![grunt-growl example](https://github.com/alextucker/grunt-growl/raw/master/example.png)

### Notification Properties
* message (required) : The message of the of notification
* title (optional) : The title of the notification
* image (optional) : The image of the notification. Use __dirname to make path to image relative to your gruntfile.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt][grunt].

## Release History
_(Nothing yet)_

## License
Copyright (c) 2012 Alex Tucker  
Licensed under the MIT license.
