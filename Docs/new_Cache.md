# `new Cache`

**Constructs a cache**

_Instance method_

## **Parameters**

### **filemanager**

_FileManager_

An instance of FileManager.

ex: `const filemanager = FileManager.local()`

### **bookmark**

_string_

A Scriptable bookmark. Must be pointed toward a file, not a directory. Bookmarked file **_must_** contain a JSON object, not an array or any other data format. Bookmarks can be created in Scriptable settings.
ex: `const bookmark = "cache.json"`

---

## **Example**:

```js
const filemanager = FileManager.iCloud()
const bookmark = "My Bookmark"
const cache = new Cache({
  filemanager,
  bookmark
})
```
