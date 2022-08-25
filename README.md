#browserify-handlebars

A browserify transform for handlebar templates! Yay!

###Installation:

`npm install browserify-handlebars`

###Usage:

Make a handlebars template like so:

```html
<!DOCTYPE html>
<html>
<head>
  <title>{{ title }}</title>
</head>
<body>
<p>Hello there, {{name}}</p>
</body>
</html>
```

Now `require()` the handlebar template file in code like so:

```javascript
var aTemplateFunction = require('./template.handlebars');

var html = aTemplateFunction({title: "An instantiated template!", name: "David"});
```

and run browserify with the transform option:

`browserify -t browserify-handlebars entry-point.js`

That's all!

## Implementation details

This transform module packages the handlebars templates with the handlebars runtime, which is smaller than the complete handlebars library. This is good, because it means smaller bundle files for you.

## Usage with Browserify and Gulp

Here are a couple of examples for how to use this transform with Gulp.

If the handlebars templates are in the same directory as the `gulpfile`, you should be able to just pass `browserifyHandlebars` as a transform for browserify:

```javascript
browserify(e, {
      standalone: 'noscope',
      debug: true,
      transform: [browserifyHandlebars]
    })
```

If the handlebars templates are in a nested directory, you will need to pass the root directory path for your project (or any path information that will lead to `/node_modules/**/handlebars.runtime`). In this example, where the `gulpfile` is in the same directory as the required `node_modules` directory (both are nested in a directory at the project root) but the handlebars templates are deeply nested in a different directory at the project root, the `__dirname` is being passed:

```javascript
browserify(e, {
      standalone: 'noscope',
      debug: true,
      transform: [[browserifyHandlebars, {dir: path.resolve(__dirname)}]]
    })
```

