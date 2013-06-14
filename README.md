# lazyload
Lazyload images, iframes, divs, widgets.

Pretty stable but still in alpha.
Battle tested against IE8+ Android Ch FF.

[![browser support](https://ci.testling.com/vvo/lazyload.png)](https://ci.testling.com/vvo/lazyload)

## Usage

### lazyloading all body images

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
</body>
```

If you do not want to use a data-uri as your src, you can also use the provided [b.gif](b.gif) which is
the [tiniest gif ever](http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever).

On most websites, you better let the first top images not bound to lzld method.
So that they shows really fast.

### options

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

### retina images

When giving a function to the `src` param, you can implement a custom src selector.
So you can handle retina/hd images.

```html
<!doctype html>
<script src="lazyload.min.js"></script>
<script>
var lazyRetina = lazyload({ src: chooseSrc });

function chooseSrc(img) {
  if(youWantTheRetinaImage) {
    return img['data-src-hd'];
  }
}
</script>
<body>
  <img
    data-src-hd="images/src-hd.jpg"
    src="images/src-desktop.jpg"
    onload=lazyRetina(this) />
</body>
```

Here you go! You are now loading a standard desktop image and loading the hd version when needed.
You could also load a blank image at start and choose either the desktop or hd version.

Because you have full control on the code that choose the image's src.

If `chooseSrc` does not returns anything then the initial image will stay.

### lazyload all the things

#### iframes

Yes! You can also lazyload iframes untill they are visible in the viewport:

```html
<!doctype html>
<script src="lazyload.min.js"></script>
<body>
  <div>A lot of content</div>

  <iframe
    data-src="yourpage.html"
    src="about:blank"
    onload=lzld(this)></iframe>
</body>
```

#### widgets

#### your mum

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
