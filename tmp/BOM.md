# JS中的BOM

BOM（Browser Object Module）即浏览器对象模型。在Javascript中依托于全局变量 `window`。对于BOM的介绍是一篇API向的文章。

`window` 一方面作为全局变量是全局上下文中的**变量对象**。关于执行上下文与变量对象的文章可以参考 [从零开始学JS之作用域与闭包](https://github.com/wangqiutuner/Blog/issues/11)。另一方面便承载着访问浏览器的功能。

## 一、属性

一般常见的属性包括：`history`、`location`、`navigator`、`screen`等等。下边慢慢介绍

### `window.console`

`window.console` 返回了一个 `Console` 对象的引用，用于向浏览器控制台输出日志信息，方便对代码进行调试。例如：`console.log`、`console.info` 和 `console.dir` 等等。

### `window.closed`

`window.closed` 表示引用的窗口是否关闭。

**更改一个弹出窗口的URL**：

```javascript
// 在更改url之前，使用widow.opener属性检查窗口是否被打开且没有关闭
if(window.opener && !window.opener.closed){
    window.opener.location.href = 'http://www.qiuqiu.com';
}
```

### `window.document`

`window.document` 返回当前窗口内的文档结点。可以使用 `document.documentElement` 获取 `<html>` 元素的引用。

关于 `document` 的详细内容可以查看 [从零开始学JS之DOM](https://github.com/wangqiutuner/Blog/issues/8)。

### `window.history`

`window.history` 返回了 `History` 对象的引用，`History` 对象提供了操作浏览器会话历史的方法。

**属性**：

- **`History.length`**：返回会话历史中元素的数目，包含当前加载的页面。例如，在一个新打开的页面中，返回1。
- **`History.scrollRestoration`⚠**：滚动恢复属性。该属性IE与Andriod不支持，请谨慎使用。

```javascript
// auto：将恢复用户已滚动到的页面上的位置；manual：未还原页上滚动的位置。
history.scrollRestoration && history.scrollRestoration = 'auto';
```

**方法**：
