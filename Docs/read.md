# `read`

**Reads cached values of given keys**

_Instance Method_

## **Parameters**

### **…keys**

_string_

A string representing a key in the cache.

ex: `const value = cache.read("foo")`

---

## **Example:**

```js
/* cache = <Cache>{
 *    foo: "bar",
 *    fizz: "buzz"
 *  }
 **/
const one = cache.read("foo")
log(one) // logs "bar"
const many = cache.read("foo", "fizz")
log(many) // logs ["bar", "buzz"]
```
