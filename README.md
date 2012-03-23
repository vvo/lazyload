# Standalone javascript image lazy loader

Use it like this :

```html
<img data-src="real/image/src.jpg" src=data:image/gif;base64,R0lGODlhAQABAID/AP///wAAACwAAAAAAQABAAACAkQBADs= onload=lzld(this) />
```

The base 64 src should be the smallest possible, taken from http://www.google-analytics.com/__utm.gif

Do not worry about the size overhead of adding a lot of base 64 src images to your page :
 GZIP is here to help (http://www.gzip.org/deflate.html).

 http://www.fasterize.com
