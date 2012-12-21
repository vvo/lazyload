# Lazyload

An image lazyloader is designed to save requests on page loading (#webperf)

Most of the time, when you have 100 images on a page, your user doesn't need them all.

This lazyloader will only load what is necessary.

It's a standalone script that weights 1398 bytes minified gzipped.

## How to use

```html
<!doctype html>
<html>
  <head>
    <title></title>
    <!-- in your concatenated bundle, inlined, alone and external -->
    <script src="lazyload.min.js"></script>
    <script>
      // For best results, initialize now
      window.lzld = (new Lazyload).lzld;
    </script>
    <!-- your scripts goes here -->
  </head>
  <body>
    <img
      data-src="real/image/src.jpg"
      src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
      onload=lzld(this) onerror=lzld(this) />  
  </body>
</html>
```

## Features

* Cut onload time, page size, number of request by 2x, 3x? Depends on your website
* Horizontal and vertical (scroll) lazy loading of images
* Custom container (default to document.body)
* Many edge cases covered (like slow domready)
* Has tests/
* Production ready: YES. Used on major websites like [lemonde](http://www.lemonde.fr), [rue89](http://www.rue89.com), [playtv](http://playtv.fr), [voyages-sncf](http://www.voyages-sncf.com)

## Why another lazyload plugin

We could not find any standalone lazyloader but [the one on stackoverflow](http://stackoverflow.com/questions/3228521/stand-alone-lazy-loading-images-no-framework-based).

We first used that one, then we re-wrote it entirely with ideas from [mod_pagespeed lazyloader](http://www.modpagespeed.com/lazyload_images.html?ModPagespeed=on&ModPagespeedFilters=lazyload_images).

We're now upgrading our lazyload from time to time to make it more robust.

## Browser support

*IE6+ or modern browser.*

IE6/7 originally does not support data uri:s images but using the onerror event on to-be-lazyloaded images, we're able to register the current image in the lazyloader.
The only drawback is that you can have red crosses showing that original data uri:s image cannot be loaded. But well, it's old IE so no big deal.

You can have IE6/7 support without the hack, use the `b.gif` image instead of the data uri:s and remove `onerror`.

## How does it works

We watch the domready event.

But if it takes too much time to fire, we use the `<img onload=lzld(this)` fallback that will fire before the domready event.

Scroll and resize events are throttled so that we do not run too often.

Adding to the `<head>` is mandatory otherwise we could not show images as fast as we want.
And we would not be the first script to register to the domready event.

The base 64 src should be the smallest possible.
Reference: http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever

Don't worry about the size overhead of adding a lot of base 64 src images to your page :
 GZIP is here to help (http://www.gzip.org/deflate.html).

## CMS integration

* [Drupal](http://drupal.org/project/lazyload), thanks to https://twitter.com/#!/cirotix
* your favorite CMS: do it!

## Automate

If you want to automatically add lazyload to your website, contact http://fasterize.com

## Licence

(The MIT Licence)

Copyright (c) 2012 Vincent Voyer, http://zeroload.net http://fasterize.com

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
