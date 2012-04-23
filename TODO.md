- We should handle the case where an hidden lazy image trigger onload after we unsubscribed
  Right now we do not restart listeners so that image will never be shown
- We could use this handy function for h/v offset checking
```js
function elementInViewport(el) {
  var rect = el.getBoundingClientRect()
  return (
    rect.top + rect.height >= 0 &&
    rect.left + rect.width >= 0 &&
    rect.bottom - rect.height <= window.innerHeight &&
    rect.right - rect.width <= window.innerWidth
    )
}
```
- Add automated tests using casperjs
- Check for resize event
- Add IE6/IE7 support ? + Test
- Add "used by" section in README
- Provide fallback for users w/o JS ?
