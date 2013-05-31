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

---

Failing tests: create issues with possible ways
Auto start option
RESIZE EVENT must showimages, add failing test
Be able to give multiple data srcs
Provide callback to choose the data src
Provide callback to choose how to show the image (add fadeIn example)
Show example using a spinner then fadeIn
Update github pages, create beautifull one with all examples and features
Double script fails sur IE

--
laredoute
http://www.laredoute.co.uk/
elpais.com
http://www.vertbaudet.es/ch/pt/uk
http://www.daxon.co.uk/

-- remove slow images or use your own

proposer module hasScrolled seul
utiliser components?
lazyload des iframes aussi.

Gérer une liste d'instances, s'enregistrer sur le domready au plus vite, s'enregistrer sur le
htmlImage le plus vite.

Pour éviter les cas de chargement ajax.