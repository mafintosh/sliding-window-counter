var cyclist = require('cyclist');

var counter = function(time, buckets) {
	if (!buckets) buckets = Math.ceil(Math.log(time) / Math.log(2));

	var interval = Math.max((time / buckets) | 0, 250);
	var list = cyclist(buckets+1);
	var ptr = 0;
	var cnt = 0;

	var timer = setInterval(function() {
		ptr = list.put(++ptr, cnt);
	}, interval);

	if (timer.unref) timer.unref();

	return function(inc) {
		if (inc) list.put(ptr, cnt += inc);
		return list.get(ptr) - (list.get(ptr-buckets) || 0);
	};
};

module.exports = counter;