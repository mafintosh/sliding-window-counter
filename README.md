# sliding-window-counter

Count stuff within a time interval e.g. how many users logged in the last hour?

	npm install sliding-window-counter

## Usage

``` js
var counter = require('sliding-window-counter');
var cnt = counter(10000); // Track events the last 10s

cnt(5); // add 5 events

setInterval(function() {
	cnt(1); // add 1 event
}, 2000);

setInterval(function() {
	console.log(cnt(), 'events during the last 10s');
}, 1000);
```

## License

MIT