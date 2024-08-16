# `prettyPrint`

**Returns a string of the cached key:value pairs in a readable format. Good for debugging**

_Instance Method_

## Example

```js
/* cache = <Cache>{
 *    foo: "bar",
 *    fizz: "buzz"
 *  }
 **/

const readout = cache.prettyPrint()
log(readout)
/* logs:
 * {
 *   foo: "bar",
 *   fizz: "buzz"
 * }
 */
```
