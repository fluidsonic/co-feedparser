'use strict';

const FeedParser = require('feedparser');
const request = require('request');


module.exports = function feedParser(stream, options) {
	options = options || {};

	return function(finalCallback) {
		let completed = false;
		const callback = function callback() {
			if (completed) {
				return;
			}

			completed = true;
			finalCallback.apply(this, arguments);
		};

		if (typeof stream === 'string') {
			stream = request(stream, options.requestOptions);
		}

		delete options.requestOptions;

		let result;

		const handleEnd = function handleEnd() {
			callback(null, result);
		};

		const handleMeta = function handleMeta(meta) {
			if (completed || result) {
				return;
			}

			result = meta;
			result.articles = [];
		};

		const handleReadable = function handleReadable() {
			if (completed) {
				return;
			}

			const articles = result.articles;

			let article;
			while ((article = this.read())) {
				articles.push(article);
			}
		};

		stream
			.pipe(new FeedParser(options))
			.on('error', callback)
			.on('meta', handleMeta)
			.on('readable', handleReadable)
			.on('end', handleEnd);
	};
};
