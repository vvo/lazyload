# lazyload

Lazyload images, iframes, divs, widgets untill they are visible in the viewport.

Battle tested against IE8+ Android Ch FF.

[![browser support](https://ci.testling.com/vvo/lazyload.png)](https://ci.testling.com/vvo/lazyload)

## Usage

```html
<!doctype html>
<script src="lazyload.min.js"></script>
<body>
  <!-- You should not lazyload first images of your website -->
  <img src="not/lazyloaded.jpg" />

  <img
    data-src="real/image/src.jpg"
    src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
    onload=lzld(this) />

  <iframe
    data-src="yourpage.html"
    src="about:blank"
    onload=lzld(this)></iframe>
</body>
```

If you do not want to use a data-uri as your src, you can also use the provided [b.gif](b.gif) which is
the [tiniest gif ever](http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever).

On most websites, you better let the first top images not bound to lzld method.
So that they shows really fast.

## Options

Here are the options and defaults.
All parameters are optional.

```js
var myLzld = lazyload({
  container: document.body,
  offset: 200,
  src: 'data-src' // or function(elt) { return customSrc }
});
```

* **container**: Which element to be used as the `viewport`
* **offset**: When watched element is `offset`px near the viewport bounds, show it (horizontal, vertical)
* **src**: Where to find the real src of your element, either in another attribute (data-src) or
    using a custom function

## hidpi images

When giving a function to the `src` param, you can implement a custom src selector.
So you can handle resolution dependent images.

```html
<!doctype html>
<script src="lazyload.min.js"></script>
<script>
var lazyHd = lazyload({ src: hidpi });

function hidpi(img) {
  if(window.devicePixelRatio > 1) {
    return img.getAttribute('data-src-hd');
  }
}
</script>
<body>
  <img
    data-src-hd="images/src-hd.jpg"
    src="images/src-desktop.jpg"
    onload=lazyHd(this) />
</body>
```

Here you go! You are now loading a standard desktop image and loading the hd version when needed.
You could also load a blank image at start and choose either the desktop or hd version.

If your function does not returns anything special then the initial `src=` image will not be changed.

## Testing

Open `test/test.html` or use a headless browser:

```bash
# you may need to install phantomjs manually if you are on osx or windows
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

Open `test/test.html`, code, test.

## Building

We use closure compiler.

```bash
CLOSURE_PATH="~/path/to/compiler.jar" grunt
```

You get a `build/lazyload.min.js` file.

`compiler.jar` is [google closure compiler](https://code.google.com/p/closure-compiler/downloads/list) .jar location.

## Sites using lazyload

Millions of pageviews are served using this project:

* [fasterize.com](http://fasterize.com) `lazyload` was first developed at fasterize (WPO solution)
* [lemonde.fr](http://www.lemonde.fr)
* [pluzz.francetv.fr](http://pluzz.francetv.fr)
* [pcinpact.com](http://www.pcinpact.com)
* [elpais.com](http://www.elpais.com)
* [playtv.fr](http://playtv.fr)
* [voyages-sncf.com](http://www.voyages-sncf.com)
* [rue89.com](http://www.rue89.com)

## Licence

Also see [LICENCE.fasterize](LICENCE.fasterize)

(The MIT Licence)

Copyright (c) 2012-2013 Vincent Voyer

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
