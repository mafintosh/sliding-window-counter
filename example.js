var counter = require('./');
var cnt = counter(10000);

cnt(1);
cnt(1);
cnt(1);

console.log(cnt());

setInterval(function() {
	cnt(1);
}, 2000);

setInterval(function() {
	console.log(cnt());
}, 1000);

setInterval(function() {
	var data = cnt.toJSON();
	var cnt2 = counter(data);
	cnt(1);
	cnt2(1);
	console.log(data.buckets);
	console.log(cnt2.toJSON().buckets);
}, 4000);