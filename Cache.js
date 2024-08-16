// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: save;
const errObj = {
  cantParse: () =>
    new Error(`Unable to parse JSON, cache file in non-JSON format.`),
  isDirectory: bm => `Bookmark "${bm}" is a directory, must be a JSON file.`,
  notObject: type =>
    new Error(
      `Arguments need to be object, got type "${type}". Requires args: { filemanager, bookmark="cache.json" }`
    ),
  notInstance:
    'Argument "filemanager" must be instance of <Class> FileManager.',
  notString: type =>
    `Argument "bookmark" must be of type "string", received type "${type}".`,
  notExists: (bm, where) => `Provided bookmark "${bm}" does not exist${where}.`,
  cacheInvalid: (type, bm, path) =>
    new Error(
      `Cache must be type object, got type "${type}" at bookmark "${bm}" with path "${path}".`
    ),
  keyNotString: type =>
    new Error(
      `Key to deleted must be of type "string", received type "${type}".`
    )
}

class Cache {
  #fm
  #path
  #cache

  constructor(args) {
    const { fm, path } = this.#validateArgs(args)
    const cache = this.#initCache(args, path)

    this.#fm = fm
    this.#path = path
    this.#cache = cache
  }

  read(...props) {
    switch (true) {
      case props.length <= 0:
        return null
      case props.length === 1:
        return this.#cache[props[0]]
      default:
        return props.map(p => this.#cache[p])
    }
  }

  readAll() {
    return { ...this.#cache }
  }

  write(obj, overwrite) {
    const fm = this.#fm
    const path = this.#path
    const cache = { ...this.#cache }
    const keys = Object.keys(obj)

    for (let key of keys) {
      const exists = this.#cache[key] !== undefined
      if (!exists || overwrite === true) {
        cache[key] = obj[key]
      }
    }

    const cacheStr = JSON.stringify(cache)
    fm.writeString(path, cacheStr)
    this.#cache = cache
  }

  delete(key) {
    if (typeof key !== "string") throw errObj.keyNotString

    const fm = this.#fm
    const path = this.#path
    const cache = { ...this.#cache }

    delete cache[key]

    const cacheStr = JSON.stringify(cache)
    fm.writeString(path, cacheStr)
    this.#cache = cache
  }

  prettyPrint() {
    const cache = { ...this.#cache }
    const keys = Object.keys(cache)

    const arr = [`\n{`]
    for (let key of keys) {
      let val = cache[key]
      if (typeof val === "string") val = `"${val}"`

      arr.push(`  ${key}: ${val}`)
    }
    arr.push("}")
    const str = arr.join(`\n`)
    log(str)
    return str
  }

  #initCache({ filemanager: fm, bookmark: bm }, path) {
    path ??= fm.bookmarkedPath(bm)
    const str = fm.readString(path)
    let cache
    try {
      cache = JSON.parse(str)
    } catch (e) {
      throw errObj.cantParse()
    }
    const type = Array.isArray(cache) ? "array" : typeof cache

    if (type !== "object") throw errObj.cacheInvalid(type, bm, path)

    return cache
  }

  #validateArgs(args) {
    const type = Array.isArray(args) ? "array" : typeof args

    if (type !== "object") {
      throw errObj.notObject(type)
    }

    const { filemanager: fm, bookmark: bm } = args
    let path

    const errors = []
    let fmValid = false

    if (fm.toString().includes("FileManager")) fmValid = true

    if (!fmValid) {
      errors.push(errObj.notInstance)
    }

    const bmType = typeof bm
    if (bmType !== "string") {
      errors.push(errObj.notString(bmType))
    } else {
      let fmTemp = fm
      let where = ""
      if (!fmValid) {
        fmTemp = FileManager.local()
        where = " in local"
      }
      const exists = fmTemp.bookmarkExists(bm)
      if (!exists) errors.push(errObj.notExists(bm, where))
      else {
        path = fmTemp.bookmarkedPath(bm)
        const isDir = fmTemp.isDirectory(path)
        if (isDir) errors.push(errObj.isDirectory(bm))
      }
    }

    if (errors.length > 0) {
      const plural = errors.length > 1
      const pre = plural ? `Errors:\n` : "Error: "
      throw new Error(pre + errors.join(`\n`))
    }

    return { fm, path }
  }
}

module.exports = Cache
