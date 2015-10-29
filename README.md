# lazyload [![Dependency Status](http://img.shields.io/david/vvo/lazyload.svg?style=flat-square)](https://david-dm.org/vvo/lazyload) [![devDependency Status](http://img.shields.io/david/dev/vvo/lazyload.svg?style=flat-square)](https://david-dm.org/vvo/lazyload#info=devDependencies)

Lazyload images, iframes or any src* element until they are visible in the viewport.

[![Selenium Test Status](https://saucelabs.com/browser-matrix/lazyloadvvo.svg)](https://saucelabs.com/u/lazyloadvvo)

## Install

```shell
npm install lazyloadjs --save
```

## Simple example

See more [examples](examples/).

```html
<!DOCTYPE html>
<html>
  <head>
    <title>lazyload</title>
  </head>
  <body>
    <script src="lazyload.min.js"></script>

    <!-- A lot of content -->
    <!-- A lot of content -->

    <img
      data-src="real/image/src.jpg"
      src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
      onload="lzld(this)">
  </body>
</html>
```

Make sure your webpage is in [standards mode](http://en.wikipedia.org/wiki/Document_Type_Declaration#HTML5_DTD-less_DOCTYPE).

Viewport computing is badly handled by browsers when in [quirksmode](http://en.wikipedia.org/wiki/Quirks_mode).

If you do not want to use a data-uri as your src, you can also use the provided [b.gif](b.gif) which is
the [tiniest gif ever](http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever).

On most websites, you better let the first top images not bound to lzld method.
So that they shows really fast.

## Advanced example

`lazyloadjs` is an npm module and is compatible with browserify.

```js
global.myLazyload = require('lazyloadjs')();
```

```html
<img
  data-src="real/image/src.jpg"
  src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
  onload="myLazyload(this)">
```

Per default, `lazyloadjs` exposes the `lzld` instance on the global
object. So that in most cases, you just need to require it in your webpage.

## API

## var lzld = lazyload([opts])

`opts` is an object with these defaults:

```js
{
  container: document.body,
  offset: 333,
  src: 'data-src' // or function(elt) { return customSrc }
}
```

`opts.container` is the referencing container, it's the viewport, defaults to `document.body`

`opts.offset` is a length in pixels used to compute when an element will
soon be visible. So that you load it just before it becomes visible.

`src` is the attribute name storing the real src of the element to load.

`src` can also be a `function`, so that you can have your custom `src` computing algorithm.
You can use it to [lazyload High DPI/retina images](examples/hidpi.html).

## Launching the examples

```shell
npm run examples
```

## Developing

Launch the dev server:

```shell
npm run dev
```

Browse to [http://localhost:8080/__zuul](http://localhost:8080/__zuul).

[Tests](test/) are written with [mocha](https://github.com/visionmedia/mocha).

## Building

We provide a pre-built version of `lazyloadjs` in `build/lazyload.min.js`.

But you can build your own:

```shell
npm run build
```

You get the build in `build/lazyload.min.js`.

Please consider using [browserify](https://github.com/substack/node-browserify).

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
* [mapado.com](http://www.mapado.com/)
* [decitre.fr](http://www.decitre.fr/)
* [base-orb.fr](http://www.base-orb.fr/)

.. And many unlisted websites, [add yours](https://github.com/vvo/lazyload/edit/master/README.md)!

## Licence

Also see [LICENCE.fasterize](LICENCE.fasterize)

(The MIT Licence)

Copyright (c) Vincent Voyer

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
