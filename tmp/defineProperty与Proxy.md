# defineProperty与Proxy

## 一、`defineProperty()`

`Object.definePropery` 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

**语法：**

> ```Object.defineProperty(obj,prop,descriptor)```
>
> **参数(`obj`)**：要定义属性的对象。
>
> **参数(`prop`)**：要定义或者修改的属性的名称或 `Symbol`。
>
> **参数(`descriptor`)**：要定义或修改的属性描述符。
>
> **返回值**：被传递给函数的对象。

其中第三个参数属性描述符 `descriptor` 有两种形式：**数据描述符**和**存储描述符**。数据描述符采用一个值来表示对象的属性，这个值可以选择是否可以重写。存储描述符使用 getter 函数和 setter 函数来描述对象的属性。属性描述符参数只能是上述的一种，数据描述符或者存储描述符。

这两种描述符都是对象。它们都可以使用以下可选属性名：

- `configurable`：当且仅当该属性值为 `true` 时，表示描述符中的除 `value` 和 `writable` 外的其他属性可以被修改，并且方法定义的属性可以从对应的对象上删除。默认为 `false`。
- `enumerabel`：当且仅当该属性值为 `true` 时，方法定义的属性才能在 `for...in`、`Object.keys()`以及扩展运算符中枚举出来。默认为 `false`。

数据运算符可以使用以下可选属性名：

- `value`：方法定义的属性对应的值，可以是任何有效的JavaScript值（数值，对象，函数等）。默认为 `undefined`。
- `writable`：表示方法定义的属性的值是否能够被赋值运算符改变。默认为 `false`。

存储运算符可以使用以下可选属性名：

- `get`：属性的 getter 函数，当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入 `this` 对象。该函数的返回值会被用作属性的值。默认 `undefined`。
- `set`：属性的 setter 函数，当属性值被修改时，会调用此函数。该方法接受一个参数（被赋予的新值），会传入赋值时的 `this` 对象。默认 `undefined`。

**示例：**

```javascript
// 1、Configurable属性
var obj = {};
Object.defineProperty(obj, 'a', {
    value: 1,
    configurable: false,
});

// 其他属性无法修改
Object.defineProperty(obj, 'a', {
    enumerable: true,
}); // throws a TypeError
Object.defineProperty(obj, 'a', {
    configurable: true,
}); // throws a TypeError

// 属性无法删除
console.log(obj.a); // 1
delete obj.a;   // 无事发生
console.log(obj.a); // 1
```

```javascript
// 2、Enumerable属性
var obj = {};
Object.defineProperty(obj, 'a', { value: 1, enumerabel: true });
Object.defineProperty(obj, 'b', { value: 2 });
obj.c = 3;
Object.defineProperty(obj, Symbol.for('d'), { value: 4, enumerabel: true });

for(var i in obj){
    console.log(i); // a,c
}

Object.keys(i); // a,c

// 判断对象属性是否可枚举
obj.propertyIsEnumerable('a');  // true

// 扩展运算符也无效
var p = { ...obj };
p.a;    // 1
p.b;    // undefined
p.c;    // 3
p[Symbol.for('d')];    // 4
```

```javascript
// 3、数值描述符
var obj = {};

obj.a = 1;
// 等同于：
Object.defineProperty(obj,'a',{
    value:1,
    writable:true,
    configurable:true,
    enumerable:true,
});

// 另一方面
Object.defineProperty(obj,'a',{ value: 1 });
// 等同于：
Object.defineProperty(obj,'a',{
    value:1,
    writable:false,
    configurable:false,
    enumrable:false,
})
```

```javascript
// 4、Writable属性
(function(){
    'use strict';
    var obj = {};
    Object.defineProperty(obj, 'a', {
        value: 1,
        writable: false,
    });
    obj.a = 3;  // 严格模式下报错（普通模式下不会）, throws TypeError: "a" is read-only
}());
```

```javascript
// 5、Getter 与 Setter
var obj = {},
    value = null;
Object.defineProperty(obj, 'a', {
    get: function(){
        return value;
    },
    set: function(newValue){
        value = newValue;
    }
})
```

## 二、观察者模式

观察者模式指的是，一个主题（`Subject`）与多个观察者（`Observer`）相关联，当主题被激活时，会通知这些观察者对象进行更新。

在观察者模式中，`Subject` 对象拥有添加、删除和通知观察者的方法，`Observer` 拥有更新的方法。

下面给出观察者模式的例子：

```javascript
// 定义主题类
class Subject{
    constructor(){
        this.observers = [];
    }
    // 增加观察者
    add(observer){
        this.observers.push(observer);
    }
    // 移除观察者
    remove(observer){
        this.observers.forEach((val,ind) => {
            if(val === observer){
                this.observers.splice(ind,1);
            }
        })
    }
    // 通知所有观察者
    notify(){
        this.observers.forEach(val => {
            val.update(this);
        })
    }
}
```

上边介绍了主题类对象，下面是观察者对象：

```javascript
// 定义观察者类
class Observer{
    constructor(){
    }
    update(){
        console.log('观察者对象更新');
    }
}
```

当具体的主题对象通知观察者时，一般会将其所控制的资源或者消息传递过去。

```javascript
// 定义一个具体的主题类
class actualSubject extends Subject{
    constructor(){
        super();
        // 由主题控制的资源，供观察者使用
        this.resource = null;
    }

    getResource(){
        return this.resource;
    }

    setResource(res){
        this.resource = res;
        // 资源变更通知所有观察者
        this.notify();
    }
}
```

作为观察者，在收到主题对象发出的通知后，可以去处理主题的资源。

```javascript
class actualObserver extends Observer{
    constructor(){
        super();
        // 主题资源一开始不存在
        this.resource = {};
    }

    update(subject){
        // 获取主题的资源
        this.resource = subject.getResource();
        // 处理主题的资源
        this.work();
    }

    work(){
        const res = this.resource;
        ...
        console.log('资源处理中')
    }
}
```

这样观察者模式运作的方式如下:

```javascript
// 创建主题
const sub = new actualSubject();
// 创建观察者
const A = new actualObserver();
const B = new actualObserver();
const C = new actualObserver();
const D = new actualObserver();

// 资源对象
const res = {
  a:100
}

// 添加主题的观察者
sub.add(A);
sub.add(B);
sub.add(C);
sub.add(D);

// 设置主题资源
sub.setResource(res);
```

## 三、Vue响应式原理

vue的响应式原理，是指当修改vue的数据模型（JavaScript对象）时，视图也会随之更新。这里便是通过观察者模式来实现的。

![Vue的响应式原理](http://ww1.sinaimg.cn/large/e833be84gy1ghmvr68z4uj20xc0kuq38.jpg)

上边是vue官方的流程图，当组件渲染时，它会触发它“接触（Touch）”过的数据属性的 `getter`，从而进行“依赖收集”。而Watcher作为观察者对象，会被收集到当前闭包中的订阅者Dep的subs中。

当Data对象的 `setter` 触发后，会通知Dep中的每一个Watch，Watcher就会开始调用update从而使它关联的组件重新渲染。

下边我们结合 `Object.defineProperty()` 与观察者模式来实现Vue的响应式原理，首先我们定义订阅者Dep（主题）和观察者Watcher。

```javascript
class Dep {
    constructor () {
        // 用来存放Watcher对象的数组
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    // 通知所有Watcher对象更新视图
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}

class Watcher {
    constructor(){
    }
    // 更新视图
    update(){
        console.log('视图更新');
    }
}
```

在观察者模式运作中，可以发现一共需要5个步骤：创建订阅者Dep、创建观察者Watcher、资源对象设置（可以没有）、添加订阅者的观察者、订阅者通知观察者。下面从这些角度来看如何实现Vue的响应式原理。

上边讲到，在Data对象的属性中，当 `getter` 触发时，将当前的Watcher对象存入Dep的 `subs` 中。而当 `setter` 触发时，将会调用Dep的 `notify()` 方法来通知观察者Watcher更新视图。目前关键在于何时创建订阅者Dep与观察者Watcher。

```javascript
class Observer{
    contructor(data){
        this.observer(data);
    }
    observer(data){
        if(!data || typeof data !== 'object'){  // 如果数据不存在或者不是对象
            return;
        }

        Object.keys(data).forEach(key => {
            // 给全部属性绑定setter和getter
            this.defineReactive(data,key,data[key]);
        })
    }
    defineReactive(obj, key, val){
        // 为每个属性创建Dep
        const dep = new Dep();
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:false,
            get(){
                if(Dep.target){
                    dep.add(Dep.target);   // 绑定观察者watcher
                }
                return val;
            }
            set(newValue){
                dep.notify();
                newValue = val;
            }
        });
        // 深入绑定
        this.observer(val);
    }
}
```

上述代码中有两个可能存在疑问的地方，分别对应着创建Dep和创建Watcher。

```javascript
// 为每个属性创建Dep
const dep = new Dep();
```

创建订阅者Dep是在Vue初始化阶段，在进行数据的get、和set绑定时，并创建了一个Dep对象。

```javascript
if(Dep.target){
    dep.add(Dep.target);   // 绑定观察者watcher
}
```

上面说到，当 `getter` 方法触发时会将当前的Watcher对象绑定到订阅者Dep上。这里一般使用 `Dep.target` 来保存当前的Watcher对象。`target` 是订阅者Dep的一个静态属性。

```javascript
class Dep {
    static target = null;

    constructor () {
        // 用来存放Watcher对象的数组
        this.subs = [];
    }

    addSub (sub) {
        this.subs.push(sub);
    }

    // 通知所有Watcher对象更新视图
    notify () {
        this.subs.forEach((sub) => {
            sub.update();
        })
    }
}
```

知道了由 `Dep.target` 来保存当前Watcher对象后，我们依然不知道Watcher对象是什么时候创建的。从生命周期的角度来说，Watcher对象是在 `beforeMount` 之后，`mounted` 之前。其中Watcher对象实例化时，调用了 `_render` 方法，实现了 `dom` 的渲染，详细的过程，将在Vue系列文章中介绍。

Watcher对象创建时便将其保存至 `Dep.target`。

```javascript
class Watcher {
    constructor(){
        Dep.target = this;
    }
    // 更新视图
    update(){
        console.log('视图更新');
    }
}
```

目前了解到，每一个组件默认都会创建一个Watcher，自定义的watch和computed方法也会创建Watcher。

至此，vue响应式原理的整个过程也就清晰了：

1. 在Vue对象初始化时，通过 `defineProperty` 来监听 `data` 中的数据变化，同时创建订阅者对象Dep。
2. 编译模版，创建Watcher，并将 `Dep.target` 指向当前Watcher
3. Watcher对象实例化时，会进行DOM的渲染，如果使用了 `data` 中的数据，会触发 `getter` 方法，将观察者对象Watcher绑定到订阅者对象上。
4. 数据更新时，会触发 `data` 的 `setter` 方法，通知使用到该属性的所有Watcher去更新DOM。

**参考资料**：

- [图解 Vue 响应式原理](https://juejin.im/post/6857669921166491662#heading-2)

## 四、`Proxy`

使用 `defineProperty()` 只能监控属性的 `getter` 和 `setter`。ES6的 `Proxy` 提供了多种行为的监控，例如in、delete、函数调用等。

ES6原生提供 `Proxy` 构造函数，用来生成 `Proxy` 实例

```javascript
var proxy = new Proxy(target, handler);
```

`target` 表示要拦截的目标对象，`handle` 用来定制拦截行为，监控返回的 `Proxy` 实例中的属性变化。

**示例：**

```javascript
var proxy = new Proxy({}, {
    get: function(obj, prop){
        console.log('设置get操作');
        return obj[prop];
    },
    set: function(obj, prop, value){
        console.log('设置set操作');
        obj[prop] = value;
    }
});

proxy.a = 1;    // 设置set操作
console.log(proxy.a);   // 设置get操作  // 1
```

更多的拦截行为可以查看 [ECMAScript 6 入门](https://es6.ruanyifeng.com/#docs/proxy)。

`defineProperty` 和 `proxy` 有以下几点区别：

- `defineProperty` 只能对属性的 `getter` 和 `setter` 行为进行监听，而 `Proxy` 可以对多种行为进行监听。
- `defineProperty` 一次只能以对象的一个属性进行监听，而 `Proxy` 可以对对象的全部属性进行监听。可以使用 [defineProperties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties) 对对象的多条属性进行监听，不过需要指明要监听的属性名。另外 `defineProperty` 无法监听数组。
- `defineProperty` 修改原对象即可触发拦截，而 `Proxy` 必须触发代理对象才能触发拦截。

正如我们所了解到的，vue3.0的响应式原理将由 `Proxy` 来实现，这一部分的内容，将在后面进行讲述。
