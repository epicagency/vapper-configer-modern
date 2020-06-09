# NOTES

## Safari fix

```js
// https://gist.github.com/samthor/64b114e4a4f539915a95b91ffd340acc
const safariFix =
  // eslint-disable-next-line max-len
  '!function(){var e=document,t=e.createElement("script");if(!("noModule"in t)&&"onbeforeload"in t){var n=!1;e.addEventListener("beforeload",function(e){if(e.target===t)n=!0;else if(!e.target.hasAttribute("nomodule")||!n)return;e.preventDefault()},!0),t.type="module",t.src=".",e.head.appendChild(t),t.remove()}}();'

// Inject inline Safari 10 nomodule fix
data.body.push({
  tagName: 'script',
  closeTag: true,
  innerHTML: safariFix,
})
```
