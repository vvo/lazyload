# Standalone, fast & cross browser JavaScript image lazy loader

This image lazy loader is designed to help you save http requests on images.
Because when you have 100 images on a page, your user doesn't need them all.

It's like http://davidwalsh.name/lazyload-plugin but standalone and faster to
show images at page load.

## How to use

1. Add lazyload.min.js to your page in the <head> section, either src or inline if
you do not have any other scripts in the <head>
2. Change all <img> tags to this :

```html
  <img
  data-src="real/image/src.jpg"
  src=data:image/gif;base64,R0lGODlhAQABAID/AP///wAAACwAAAAAAQABAAACAkQBADs=
  onload=lzld(this) />
```
3. Enjoy!

## More

We build our lazyloader with efficiency and speed in mind.

There's 0 call to documents.getElementsByTagName. Each image register itself to the
lazy loader.

Scroll and resize events are throttled so that we do not run too often.

Adding to the <head> is mandatory otherwise we could not show images as fast as we want.

I recommend adding the script in inline in the <head>. It only weights
< 500 bytes gzipped.

The base 64 src should be the smallest possible it is from http://www.google-analytics.com/__utm.gif

Do not worry about the size overhead of adding a lot of base 64 src images to your page :
 GZIP is here to help (http://www.gzip.org/deflate.html).

If you want to automatically add lazy load to your website, contact us @ http://fasterize.com
