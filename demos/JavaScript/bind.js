// 可以通过 apply 与 call 来实现 bind

// 第一版
Function.prototype.bind2 = function (context) {
    var _this = this;
    return function () {
        _this.apply(context);
    }
}

// 第二版，实现参数传递
Function.prototype.bind2 = function (context) {
    var _this = this;
    // 获取 bind2 函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    return function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        _this.apply(context, args.concat(bindArgs));
    }
}

// 第三版，bind 返回的函数可以当做构造函数使用
// 先了解一下 bind 返回的函数作为构造函数
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

var obj = new bindFoo('18');
// undefined, this指向obj
// daisy
// 18
console.log(obj.habit); // shopping
console.log(obj.friend); // kevin

// 实现
Function.prototype.bind2 = function (context) {
    var _this = this;
    // 获取 bind2 函数从第二个参数到最后一个参数
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        // 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        _this.apply(this instanceof _this ? this : context, args.concat(bindArgs));
    };

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    fbound.prototype = this.prototype;
    return fbound;
}

// 第四版，第三版上还是存在一些问题的。有待后续改进