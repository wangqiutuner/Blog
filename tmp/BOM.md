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

- **`History.back()`**：返回上一页，等价于 `history.go(-1)`。
- **`History.forward()`**：前往下一页，等价于 `history.go(1)`。
- **`History.go()`**：通过当前页面的相对位置从会话历史中加载页面。
- **`History.pushState()`**：按照指定的名称和URL将数据保存至会话历史，会话历史长度+1。

> ```history.pushState(state, title[, url])```
>
> **参数(`state`)**：新会话下的状态对象。
>
> **参数(`title`)**：新会话的名称，目前大多数浏览器忽略此参数，建议将其置为空字符串。
>
> **参数(`url`) | 可选**：新会话的地址，必须是同源的。如果未指定，则为当前地址。

**q_qiu**：`History.pushState()` 方法调用后只会更新url不会刷新页面。并且由该方法跳转的路由，在前进和后退时也不会改变文档内容。但是使用 `popstate` 事件可以监听该方式下的路由跳转。

- **`History.replaceState()`**：覆盖会话历史中的当前会话，会话历史长度保持不变。

**相关事件**：

- **`window.onpopstate`**：在文档不变的情况下，监听路由的变化。主要包括前进、后退以及路由锚点的变化。事件对象的 `state` 属性表示当前会话的状态对象。

### `window.location`

`window.location` 只读属性，返回一个 `Location` 对象的引用，其中包含有关文档当前的URL信息。

**属性**：

- **`Location.href`**：完整的URL。
- **`Location.protocol`**：URL对应的协议，字符串最后有一个冒号 ":"。
- **`Location.host`**：域名+端口号。
- **`Location.hostname`**：URL对应的域名。
- **`Location.host`**：URL对应的端口号，由URL字符串导出，如果采用默认端口号，则返回空字符串 ""。
- **`Location.pathname`**：URL的路径部分，开头有一个 "/"。
- **`Location.search`**：URL的查询参数部分，开头有一个 "?"。
- **`Location.hash`**：URL的hash部分，开头有一个 "#"。
- **`Location.origin`**：页面的来源（协议+主机名+端口号）。

```javascript
var url = document.createElement('a');
url.href = 'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href);      // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol);  // https:
console.log(url.host);      // developer.mozilla.org
console.log(url.hostname);  // developer.mozilla.org
console.log(url.port);      // (blank - https assumes port 443)
console.log(url.pathname);  // /en-US/search
console.log(url.search);    // ?q=URL
console.log(url.hash);      // #search-results-close-container
console.log(url.origin);    // https://developer.mozilla.org
```

**方法**：

- **`Location.assign()`**：等同于 `location.href = url`。
- **`Location.replace()`**：用给定的URL替换掉当前的资源，无法返回至原页面。
- **`Location.reload()`**：刷新当前页面。该方法只有一个参数，当值为 `true` 时，将强制浏览器从服务器加载页面资源，当值为 `false` 或者未传参时，浏览器则可能从缓存中读取页面。
