# lazyload

This image lazyloader is designed to help you save http requests on images.

Most of the time, when you have 100 images on a page, your user doesn't need them all.

It's like http://davidwalsh.name/lazyload-plugin but standalone and faster to
show images at page load.

## How to use

Add lazyload.min.js to your page in the `<head>` section, either src or inline if
you do not have any other scripts in the `<head>`.

Change all `<img>` tags to lazyload :

```html
  <img
    data-src="real/image/src.jpg"
    src=data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
    onload=lzld(this) />
```

## More infos

### Why another lazyload plugin

We could not find any standalone lazyloader but [the one on stackoverflow](http://stackoverflow.com/questions/3228521/stand-alone-lazy-loading-images-no-framework-based).

We first used this one, then we re-wrote it entirely with ideas from [mod_pagespeed lazyloader](http://www.modpagespeed.com/lazyload_images.html?ModPagespeed=on&ModPagespeedFilters=lazyload_images).

mod_pagespeed lazyloader fails on IE because it triggers an infinite onload loop. We solved that.

### Browser support

IE8+ or modern browser. IE6 & 7 does not support base64 images.

If you need IE6 & 7, use the b.gif image instead of the base64 src.

### How we do it

We built our lazyloader with efficiency and speed in mind.

We do not call `documents.getElementsByTagName` (not at start, not in a loop). Each image register itself to the
lazyloader. This was a great idea taken from mod_pagespeed.

Scroll and resize events are throttled so that we do not run too often.

Adding to the `<head>` is mandatory otherwise we could not show images as fast as we want.

I recommend adding the script in inline in the `<head>`. It only weights
< 500 bytes gzipped.

The base 64 src should be the smallest possible it is from http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever

Do not worry about the size overhead of adding a lot of base 64 src images to your page :
 GZIP is here to help (http://www.gzip.org/deflate.html).

## Contact

If you want to automatically add lazyload to your website, contact us at http://fasterize.com

## Licence

(The MIT Licence)

Copyright (c) 2012 Vincent Voyer, Stéphane Rios

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
