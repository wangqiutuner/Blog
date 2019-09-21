// 防抖一般的应用场景：输入搜索联想，点赞收藏

// 第一版
// clearTimeout()函数接受取消定时器的标识符。
// 传入一个错误的 ID 给 clearTimeout()不会有任何影响；也不会抛出异常。
function debounce(func, wait) {
    var timeout;
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait);
    }
}

// 第二版
// 相对第一版没有this指向问题
function debounce(func, wait) {
    var timeout;
    return function () {
        var _this = this;

        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(_this);
        }, wait);
    }
}

// 第三版
// 相对于第二版可以在func中获取到 event 对象
function debounce(func, wait) {
    var timeout;
    return function () {
        var _this = this;
        var args = arguments;

        clearTimeout(timeout)
        timeout = setTimeout(function () {
            func.apply(_this, args);
        }, wait);
    }
}