# lazyload

Lazyload images, iframes, divs, widgets untill they are visible in the viewport.

[![Dependency Status](http://img.shields.io/david/vvo/lazyload.svg?style=flat-square)](https://david-dm.org/vvo/lazyload)
[![devDependency Status](http://img.shields.io/david/dev/vvo/lazyload.svg?style=flat-square)](https://david-dm.org/vvo/lazyload#info=devDependencies)

[![Selenium Test Status](https://saucelabs.com/browser-matrix/lazyloadvvo.svg)](https://saucelabs.com/u/lazyloadvvo)

## Usage

Make sure you are in [standards mode](http://en.wikipedia.org/wiki/Document_Type_Declaration#HTML5_DTD-less_DOCTYPE).

Viewport computing is badly handled by browsers when in [quirksmode](http://en.wikipedia.org/wiki/Quirks_mode).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>lazyload</title>
  </head>
  <body>
    <script src="lazyload.min.js"></script>

    <img
      data-src="real/image/src.jpg"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      onload="lzld(this)">

    <iframe
      data-src="yourpage.html"
      src="about:blank"
      onload="lzld(this)"></iframe>
  </body>
</html>
```

Script should be included after the `<body>` element and before any
lazyloaded image.

See more [examples](examples/).

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
  offset: 333,
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
<!DOCTYPE html>
<html>
  <head>
    <title>lazyload</title>
    <script src="lazyload.min.js"></script>
    <script>
      var lazyHd = lazyload({ src: hidpi });

      function hidpi(img) {
        if(window.devicePixelRatio > 1) {
          return img.getAttribute('data-src-hd');
        }
      }
    </script>
  </head>
  <body>
    <img
      data-src-hd="images/src-hd.jpg"
      src="images/src-desktop.jpg"
      onload="lazyHd(this)">
  </body>
</html>
```

Here you go! You are now loading a standard desktop image and loading the hd version when needed.
You could also load a blank image at start and choose either the desktop or hd version.

If your function does not returns anything special then the initial `src=` image will not be changed.

## Testing

```shell
npm install -g zuul
zuul --local 8080 -- test/*.js
```

Browse to [http://localhost:8080/__zuul](http://localhost:8080/__zuul).

[Tests](test/) are written with [mocha](https://github.com/visionmedia/mocha).

## Building

[Install](http://code.google.com/p/closure-compiler/downloads/list) closure-compiler.

```bash
CLOSURE_PATH=~/path/to/closure-compiler/ grunt
```

You get the [build/lazyload.min.js](build/lazyload.min.js) file.

## Sites using lazyload

Tens of millions of pageviews are served each month using this project:

* [fasterize.com](http://fasterize.com) `lazyload` was first developed at fasterize (WPO solution)
* [lemonde.fr](http://www.lemonde.fr)
* [pluzz.francetv.fr](http://pluzz.francetv.fr)
* [pcinpact.com](http://www.pcinpact.com)
* [elpais.com](http://www.elpais.com)
* [playtv.fr](http://playtv.fr)
* [voyages-sncf.com](http://www.voyages-sncf.com)
* [rue89.com](http://www.rue89.com)
* [flipkart.com](http://www.flipkart.com/)
* [clubic.com](http://clubic.com)
* [achetezfacile.com](http://www.achetezfacile.com/)

.. And many unlisted websites, [add yours](https://github.com/vvo/lazyload/edit/master/README.md)!

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
