# inViewport

Know when an element is in the window viewport or a custom viewport.

[![browser support](https://ci.testling.com/vvo/in-viewport.png)](https://ci.testling.com/vvo/in-viewport)

## Usage

Be sure to be in standard mode, quirksmode is not supported since most browsers
will report invalid values for window viewport.

### Immediate result

```js
var elem = document.getElementById('myFancyDiv');

var isInViewport = inViewport(elem); // returns `true` or `false`

alert('myFancyDiv is ' + isInViewport ? 'visible' : 'not visible' + ' in the window');
```

### Using a callback

We watch for your element to enters the viewport and call your callback when it does.

```js
var elem = document.getElementById('myFancyDiv');

inViewport(elem, visible);

function visible(elt) {
  alert(elt.id + ' is visible in the window !');
}
```
The first callback argument is always the elt that entered the viewport.

### A custom container

By default, we use the current window as the reference viewport.
But you can also specify another element as a reference viewport.

```js
var customContainer = document.getElementById('myFancyContainer');
var elem = document.getElementById('myFancyDiv');

inViewport(elem, { container: customContainer }, visible);

function visible() {
  alert('myfancyDiv is visible in the `customContainer` !');
}
```

### Specifying an offset

By default, when your element precisely enters the viewport, you get a callback / true result.
But maybe you want to know when your element is soon to be shown in the viewport.
Use an `offset` param for that !

```js
var elem = document.getElementById('myFancyDiv');

inViewport(elem, { offset: 300 }, visible);

function visible() {
  alert('myfancyDiv is visible in the `customContainer` !');
}
```

When your element is near `300px` of the viewport, you get your callback / true result.

### Dynamic element creation (document.createElement)

If you are creating elements dynamically, be sure to call `inViewport` when the
element is in the DOM. Otherwise it will fail badly.

Because we check for newly visible elements on `scroll` or `resize`.
Because we have no easy way, right now, to know when your element gets inserted
into the DOM.

We don't know when to ask for viewport visibility on your element.

We previously added a "force-check" method but it is unneeded.
Do not call `inViewport` on a detached, to-be-visible-without-scroll dom node.

## Use cases

* Images, iframes, widgets [lazyloader](/vvo/lazyload)
* infinite scroll
* loading widgets only when needed
* your ideas

## Testing

Open `test/test.html` or use a headless browser:

```bash
npm install -g mocha-phantomjs phantomjs
npm test
```

## Hacking

You need package.json dependencies and grunt.

```bash
npm install
npm install -g grunt-cli
grunt watch
```

Start an http-server in root dir:

```bash
npm install http-server -g
http-server
```

Open `test/test.html`, code, test, GOTO code.

## Building

```bash
CLOSURE_PATH="~/path/to/compiler.jar" grunt
```

You get a `build/in-viewport.min.js` file.

`compiler.jar` is [google closure compiler](https://code.google.com/p/closure-compiler/downloads/list) .jar location.

## License

Copyright (c) 2013 Vincent Voyer

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.