// run a JavaScript file
// node src\app\script.js

var Zone = {
    run: function(callback) {
        if(this.beforeTask)
          this.beforeTask();
        callback();
        if(this.afterTask)
          this.afterTask();
    }
}

Zone.beforeTask = () => { console.log("Before"); }
Zone.afterTask = () => { console.log("After"); }
Zone.run(() => { console.log("Hello World"); })

console.log("----------Second example! -----");

var _setTimeout = setTimeout;
setTimeout = (callback, timeout) => {
    Zone.run(() => {
        _setTimeout(callback, timeout);
    });
}

setTimeout(() => console.log("SETTIMEOUT"));