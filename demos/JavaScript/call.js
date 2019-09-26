// 所以我们模拟 call 的步骤可以分为：

// 1. 将函数设为对象的属性
// 2. 执行该函数
// 3. 删除该函数

// 第一版
Function.prototype.call2 = function (context) {
    // this 表示执行 call2 的函数
    context.fn = this;
    context.fn();
    delete context.fn;
}

// 第二版，实现参数传递
Function.prototype.call2 = function (context) {
    context.fn = this;
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']');
    }
    eval('context.fn(' + args + ')');
    delete context.fn;
}

// 也可以采用es6的方法
Function.prototype.call2 = function (context, ...rest) {
    context.fn = this;
    context.fn(...rest);
    delete context.fn;
}

// 第三版，实现传递 null,以及返回值
Function.prototype.call2 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for (var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args + ')');

    delete context.fn;
    return result;
}