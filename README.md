# lazyload

This image lazyloader is designed to help you save http requests on images.

Most of the time, when you have 100 images on a page, your user doesn't need them all.

It's like http://davidwalsh.name/lazyload-plugin but standalone and faster to
show images at page load.

## How to use

Add lazyload.min.js to your page just before the `</head>` section, either src or inline if
you do not have any other scripts in the `<head>`.

Change all `<img>` tags to lazyload :

```html
  <img
    data-src="real/image/src.jpg"
    src=data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
    onload=lzld(this) onerror=lzld(this) />
```

## Production ready

So, is it safe to use this piece of software? Don't trust us, trust them:

* [mobile.lemonde.fr](http://mobile.lemonde.fr/), news, 1st mobile website in France. [source](http://www.mediametrie.fr/internet/communiques/telecharger.php?f=26408ffa703a72e8ac0117e74ad46f33) (pdf)
* [rue89.com](http://www.rue89.com/), news, 40 millions page views per month. [source](http://www.ojd-internet.com/chiffres-internet/7851-rue89.com)
* [playtv.fr](http://playtv.fr/), tv guide, millions of page views per month. [source](http://www.mediametrie.fr/internet/communiques/telecharger.php?f=26408ffa703a72e8ac0117e74ad46f33) (pdf)

They all use lazyload for production websites and are happy with it. Customers told us that
they cut page download size by 2!

There's a lot of other happy customers (smaller).

## Why another lazyload plugin

We could not find any standalone lazyloader but [the one on stackoverflow](http://stackoverflow.com/questions/3228521/stand-alone-lazy-loading-images-no-framework-based).

We first used that one, then we re-wrote it entirely with ideas from [mod_pagespeed lazyloader](http://www.modpagespeed.com/lazyload_images.html?ModPagespeed=on&ModPagespeedFilters=lazyload_images).

Also, mod_pagespeed lazyloader fails on IE because it triggers an infinite onload loop. We [solved that](https://github.com/fasterize/lazyload/commit/d1bddf3207f9b873df65d7e46de9eceeabc7690e#L0R96).

## Browser support

IE6+ or modern browser.

IE6/7 originally does not support data uri:s images but using the onerror event on to-be-lazyloaded images, we're able to register the current image in the lazyloader.
The only drawback is that you can have red crosses showing that original data uri:s image cannot be loaded. But well, it's old IE so no big deal.

You can have IE6/7 support without the hack, use the `b.gif` image instead of the data uri:s.

## How we do it

We built our lazyloader with efficiency and speed in mind.

We do not call `documents.getElementsByTagName` (not at start, not in a loop). Each image register itself to the
lazyloader. This was a great idea taken from mod_pagespeed.

Scroll and resize events are throttled so that we do not run too often.

Adding to the `<head>` is mandatory otherwise we could not show images as fast as we want.

I recommend adding the script in inline in the `<head>`. It only weights
~ 550 bytes gzipped.

The base 64 src should be the smallest possible it is from http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever

Do not worry about the size overhead of adding a lot of base 64 src images to your page :
 GZIP is here to help (http://www.gzip.org/deflate.html).

## Contact

If you want to automatically add lazyload to your website, contact us at http://fasterize.com

## CMS integration

* [Drupa](http://drupal.org/project/lazyload), thanks to https://twitter.com/#!/cirotix
* your favorite CMS: do it!

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
