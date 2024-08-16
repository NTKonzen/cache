// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: user-graduate;
const fm = FileManager.iCloud()
const Cache = importModule("/Cache.js")

const args = {
  filemanager: fm,
  bookmark: "cache.json"
}

const cache = new Cache(args)
const str = cache.prettyPrint()
QuickLook.present(str)
