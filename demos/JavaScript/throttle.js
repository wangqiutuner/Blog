// 节流一般的应用场景：滚动监听事件

// 第一版，时间戳版本
// 触发时事件会立即执行，之后没过wait毫秒执行1次，停止触发后不再执行。（有头无尾）
function throttle(func, wait) {
    var previous = 0;

    return function () {
        var now = +new Date();
        if (now - previous > wait) {
            func.apply(this, arguments);
            previous = now;
        }
    };
}

// 第二版，定时器版本
// 事件会在wait毫秒后第一次执行，停止触发后依然会再执行一次。（无头有尾）
function throttle(func, wait) {
    var timeout;

    return function () {
        var _this = this;
        var args = arguments;
        if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(_this, args);
                clearTimeout(timeout);
                timeout = null;
            }, wait);
        }
    };
}

// 第三版，结合时间戳与定时器（有头有尾）
function throttle(func, wait) {
    var previous = 0;
    var timeout;

    return function () {
        var now = +new Date();
        var remain = wait - (now - previous);
        var _this = this;
        var args = arguments;
        if (remain <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(_this, args);
            previous = now;
        } else if (!timeout) {
            timeout = setTimeout(function () {
                func.apply(_this, args);
                clearTimeout(timeout);
                timeout = null;
            }, remain);
        }
    };
}

// 第四版，增加配置选项（有待测试与修改）
function throttle(func, wait, options) {
    var previous = 0;
    var timeout;
    var defaults = {
        leading: true, // 是否进行第一次执行
        trailing: false, // 是否进行停止时的事件执行
    };
    let params = Object.assign({}, defaults, options || {});

    return function () {
        var now = +new Date();
        if (!previous && !params.leading) previous = now;
        var remain = wait - (now - previous);
        var _this = this;
        var args = arguments;
        if (remain <= 0) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            func.apply(_this, args);
            previous = now;
        } else if (!timeout && params.trailing) {
            timeout = setTimeout(function () {
                func.apply(_this, args);
                clearTimeout(timeout);
                timeout = null;
            }, remain);
        }
    };
}
