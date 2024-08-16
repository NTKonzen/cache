# `delete`

**Deleted a key:value pair**

_Instance Method_

## Parameters

### **key**

_string_

The key of the key:value pair desired to be deleted

## Example

```js
/* cache = <Cache>{
 *    foo: "bar",
 *    fizz: "buzz"
 *  }
 **/

cache.prettyPrint()
/* returns:
 * {
 *   foo: "bar",
 *   fizz: "buzz"
 * }
 */

cache.delete("foo")

cache.prettyPrint()
/* returns:
 * {
 *   fizz: "buzz"
 * }
 */
```
