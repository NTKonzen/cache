# `write`

**Writes given values at the given keys to the cache**

_Instance Method_

## **Parameters**

### {…keys: …values}

The key:value pairs to be written to the cache.

ex: `data = {foo: "bar"}`

ex: `data = {foo: "bar", a: "b"}`

### overwrite

A boolean that determines if cached keys matching given keys are overwritten

## **Examples:**

```js
/* cache = <Cache>{
 *    foo: "bar",
 *    fizz: "buzz"
 *  }
 **/
```

### Given one key:value pairs

```js
const data = { a: "b" }
cache.write(data)
cache.read("a") // returns "b"
```

### Given matching key:value pair

```js
const data = { foo: "new" }
cache.write(data)
cache.read("foo") // returns "bar"
```

#### With Overwrite

```js
const data = { foo: "new" }
cache.write(data, true)
cache.read("foo") // returns "new"
```

### Given two key:value pairs

```js
const data = { foo: "new", a: "b" }
cache.write(data)
cache.read("foo") // "bar"
cache.read("a") // "b"
```

#### With Overwrite

```js
const data = { foo: "new", a: "b" }
cache.write(data, true)
cache.read("foo") // "new"
cache.read("a") // "b"
```
