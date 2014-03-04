var cyclist = require('cyclist');

var counter = function(time, buckets) {
	if (typeof time === 'object') return counter(time.time, time.buckets);
	if (!buckets) return counter(time, []);

	var count = Math.ceil(Math.log(time) / Math.log(2));
	if (buckets.length) count = buckets.length;

	var interval = Math.max((time / count) | 0, 250);
	var list = cyclist(count+1);
	var ptr = 0;
	var cnt = 0;

	(buckets||[]).forEach(function(n, i) {
		list.put(i, n);
		ptr++;
	});

	var timer = setInterval(function() {
		ptr = list.put(++ptr, cnt);
	}, interval);

	if (timer.unref) timer.unref();

	var res = function(inc) {
		if (inc) list.put(ptr, cnt += inc);
		return list.get(ptr) - (list.get(ptr-count) || 0);
	};
	res.toJSON = function() {
		var arr = [];
		for (var i=0; i<count; i++) {
			arr[i] = list.get(i) || 0;
		}
		return {
			time: time,
			buckets: arr
		}
	};
	return res;
};

module.exports = counter;