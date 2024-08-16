# `readAll`

**Returns copy of all key:value pairs**

_Instance Method_

## **Example:**

```js
/* cache = <Cache>{
 *    foo: "bar",
 *    fizz: "buzz"
 *  }
 **/
const all = cache.readAll()
log(all) // logs {foo: "bar", fizz: "buzz"}
all.foo = "new"
const all2 = cache.readAll()
log(all2) // logs {foo: "bar", fizz: "buzz"}
```
