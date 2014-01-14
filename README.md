co-feedparser
=============

[co](https://github.com/visionmedia/co) wrapper for [feedparser](https://github.com/danmactough/node-feedparser) package.



Quickstart
----------

```javascript
const feedParser = require('co-feedparser');

const meta = yield feedParser('https://github.com/blog/all.atom');
const articles = meta.articles;
```



Usage
--------

### feedParser (stream | uri, [options])

Uses [feedparser](https://github.com/danmactough/node-feedparser) on the given stream and fetches all articles at once.

Returns [feedparser's meta data](https://github.com/danmactough/node-feedparser#list-of-meta-properties) with an additional property `articles`.

#### Parameters

- `stream` - A readable stream from which feedparser will read its data.

- `uri` - A string can also be given instead of a stream which is a shortcut for `request(uri)`.

- `options` - [Options used by feedparser](https://github.com/danmactough/node-feedparser#options).

- `options.requestOptions` - When passing a `uri` instead of a stream, these options will be passed to `request(uri, options)`.



Installation
------------

	$ npm install co-feedparser



Requirements
------------

Node 0.11+, run with `--harmony` flag.



License
-------

MIT
