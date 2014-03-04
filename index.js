var cyclist = require('cyclist');

var counter = function(time, buckets) {
	if (typeof time === 'object') return counter(time.time, time.buckets);
	if (!buckets) buckets = [];

	var len = buckets.length ? buckets.length : Math.ceil(Math.log(time) / Math.log(2));
	var interval = Math.max((time / len) | 0, 250);
	var list = cyclist(len+1);
	var ptr = 0;

	buckets.forEach(function(n) {
		list.put(++ptr, n);
	});

	var head = list.get(ptr) || 0;
	var timer = setInterval(function() {
		ptr = list.put(++ptr, head);
	}, interval);

	if (timer.unref) timer.unref();

	var res = function(inc) {
		if (inc) list.put(ptr, head += inc);
		return list.get(ptr) - (list.get(ptr-len) || 0);
	};

	res.toJSON = function() {
		var arr = [];
		for (var i = 0; i < len; i++) arr[i] = list.get(ptr-i) || 0;
		return {time:time, buckets:arr.reverse()};
	};

	return res;
};

module.exports = counter;