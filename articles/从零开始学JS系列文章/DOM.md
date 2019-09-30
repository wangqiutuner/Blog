# JS中的DOM

**文档对象模型 (DOM)** 是 `HTML` 和 `XML` 文档的编程接口。它提供了对文档的结构化的表述，并定义了一种方式可以使从程序中对该结构进行访问，从而改变文档的结构，样式和内容。

DOM 按照 W3C 的标准分为了三个级别：DOM1级、DOM2级、DOM3级（IE9+）。除了上面三个等级外，还有未成标准前的 DOM0级。本文将不按照分级对DOM进行讨论，只描述一些常用的使用方式。

## 一、结点类型

DOM1 级定义了一个 `Node` 接口，该接口将由 DOM 中的所有节点类型实现。

每个节点都有一个 `nodeType` 属性，用于表明节点的类型。这里介绍一些常见的类型。

- `Node.ELEMENT_NODE` (1)；
- `Node.ATTRIBUTE_NODE` (2)；   // 特性结点一般不直接引用
- `Node.TEXT_NODE` (3)；
- `Node.DOCUMENT_NODE` (9)；

通过比较这些常量，可以确定节点的类型，例如：

```javascript
if (someNode.nodeType == Node.ELEMENT_NODE){   // 在IE中无效
    console.log("Node is an element.");
}
```

### `Node` 属性

- `nodeType`：显示节点的类型。
- `nodeName`：显示节点的名称。
- `nodeValue`：返回或设置当前节点的值，对于文档结点来说，返回 `null`。
- `firstChild`：返回该节点的第一个子节点 `Node`，如果该节点没有子节点则返回 `null`。
- `lastChild`：返回该节点的最后一个子节点 `Node`，如果该节点没有子节点则返回 `null`。
- `childNodes`：返回一个包含了该节点所有子节点的实时的 `NodeList`。`NodeList` 是“实时的”意思是，如果该节点的子节点发生了变化，`NodeList` 对象就会自动更新。
- `parentNode`：返回一个当前结点 `Node` 的父节点 。如果没有这样的结点,，比如说像这个节点是树结构的顶端或者没有插入一棵树中， 这个属性返回 `null`。
- `parentElement`：返回一个当前节点的父节点 `Element`。 如果当前节点没有父节点或者说父节点不是一个元素(`Element`), 这个属性返回 `null`。
- `nextSibling`：返回与该节点同级的下一个节点 `Node`，如果没有返回 `null`。
- `previousSibling`：返回一个当前节点同辈的前一个结点( `Node`) ，或者返回 `null`（如果不存在这样的一个节点的话）。
- `textContent`：返回或设置一个元素内所有子结点及其后代的文本内容。

### `Node` 方法

- `Node.appendChild()`：将指定的 childNode 参数作为最后一个子节点添加到当前节点。`appendChild` 方法会把要插入的这个节点引用作为返回值返回。
- `Node.insertBefore()`：在当前节点下增加一个子节点 `Node`，并使该子节点位于参考节点的前面。

> ```var insertedNode = parentNode.insertBefore(newNode, referenceNode);```
>
> **参数(`newNode`)**：用于插入的节点。
>
> **参数(`referenceNode`)**：`newNode`将要插在这个节点之前。
>
> **返回值**：已经经过插入 `newNode` 的新的节点。

- `Node.replaceChild`：用指定的节点替换当前节点的一个子节点，并返回被替换掉的节点。

> ```replacedNode = parentNode.replaceChild(newChild, oldChild);```
>
> **参数(`newNode`)**：用来替换 `oldChild` 的新节点。如果该节点已经存在于DOM树中，则它会被从原始位置删除。
>
> **参数(`oldChild`)**：被替换掉的原始节点。
>
> **返回值**：`replacedNode` 和 `oldChild` 相等。

- `Node.removeChild()`： 方法从DOM中删除一个子节点。返回删除的节点。

> ```var oldChild = node.removeChild(child);```
>
> **参数(`child`)**：是要移除的那个子节点。
>
> **返回值**：`oldChild` 保存对删除的子节点的引用。 ```oldChild === child```。

前面介绍的四个方法操作的都是某个节点的子节点，也就是说，要使用这几个方法必须先取得父节点（使用 `parentNode` 属性）。另外，并不是所有类型的节点都有子节点，如果在不支持子节点的节点上调用了这些方法，将会导致错误发生。

- `Node.contains()`：返回的是一个布尔值，来表示传入的节点是否为该节点的后代节点。
- `Node.compareDocumentPosition()`：比较当前节点与文档中的另一节点的位置。

## 二、`Document` 类型

JavaScript 通过 `Document` 类型表示文档。在浏览器中，`document` 对象是 `HTMLDocument`（继承自 `Document` 类型）的一个实例，表示整个 HTML 页面。而且，`document` 对象是 `window` 对象的一个属性，因此可以将其作为全局对象来访问。`Document` 节点具有下列特征：

- `nodeType` 的值为9；
- `nodeName` 的值为 "`#document`"；
- `nodeValue` 的值为 `null`；
- `parentNode` 的值为 `null`；
- `ownerDocument` 的值为 `null`；
其子节点可能是一个 `DocumentType`（最多一个）、`Element`（最多一个）、`ProcessingInstruction` 或 `Comment`。

**`Document` 属性**

- `Document.documentElement()`：返回文档对象（`document`）的根元素的只读属性（在 HTML 文档中就是 `<html>` 元素）。
- `Document.body`：返回当前文档的 `<body>` 或 `<frameset>` 节点。
- `Document.doctype`：返回当前文档的文档类型定义（Document Type Definition, DTD）。
- `Document.images`：返回当前文档中所包含的图片的列表。

**扩展属性**（H5）

- `Document.title`：获取或设置当前文档的标题。
- `Document.URL`：以字符串形式返回文档的地址栏链接。
- `Document.domain`：获取或设置当前文档的域名。
- `Document.referrer`：返回来源页面的 URI。
- `Document.cookie`：返回一个使用分号分隔的 `cookie` 列表，或设置（写入）一个 `cookie`。

## 三、创建/查找结点

### 创建结点

- `Document.createElement()`：用标签名创建一个新的 `element`。
- `Document.createAttribute()`：创建一个新的 `Attr` 对象并返回（一般不使用）。
- `document.createTextNode()`：创建一个新的文本节点。
- `document.createDocumentFragment()`：创建一个新的空白的文档片段。不会引起回流。

**q_qiu**：`innerHTML` 和 `createTextNode` 的区别

1. `innerHTML` 属于HTML DOM 而 `createTextNode` 属于XML DOM;
2. `innerHTML` 会将文本中包含的HTML代码实现效果，而 `createTextNode` 只是纯粹创造了文本节点，所以返回的效果也就是纯文本内容。

### 查找结点

- `Document.getElementById()`：返回一个匹配特定 ID 的元素，没有找到返回 `null`。
    - 不同于其他 `Element` 查找方法（如 `Document.querySelector()` 以及   `Document.querySelectorAll()`），`getElementById()` 只有在作为 `document` 的方法时才能起作用，而在DOM中的其他元素下无法生效。
- `Document.getElementsByTagName()`：返回一个 **动态** 的包含所有指定标签名的元素的HTML集合 `HTMLCollection` 。
  
---
**q_qiu**：`HTMLCollection` 和 `NodeList` 都是类数组对象。 `Document.getElementsByTagName()` 返回的是 `HTMLCollection`， `Node.childNodes` 和 `Document.querySelectorAll()` 返回的是 `NodeList`。它们都可以通过以下两种方式访问：
- `list.item(1)`
- `list[1]`

`HTMLCollection` 还提供了直接通过 id 访问的方式

```javascript
var elem1 = document.forms["myForm"];
var elem2 = document.forms.namedItem("myForm");

alert(elem1 === elem2); // 显示 "true"
```

---

- `Document.querySelector()`：返回文档中与指定选择器或选择器组匹配的第一个 html 元素 `Element`。 如果找不到匹配项，则返回 `null`。
- `Document.querySelectorAll()`：返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 `NodeList` 。

## 四、`Element` 类型

除了 `Document` 类型之外，`Element` 类型就要算是 Web 编程中最常用的类型了。`Element` 类型用于表现 XML 或 HTML 元素，提供了对元素标签名、子节点及特性的访问。`Element` 节点具有以下特征：

- `nodeType` 的值为1；
- `nodeName` 的值为元素的标签名；
- `nodeValue` 的值为 null；
- `parentNode` 可能是 Document 或 Element；
- 其子节点可能是 `Element`、`Text`、`Comment`、`ProcessingInstruction`、`CDATASection` 或 `EntityReference`。

### `HTMLElement` 属性

`HTMLElement` 接口表示所有的 HTML 元素。一些HTML元素直接实现了 `HTMLElement` 接口，其它的间接实现 `HTMLElement` 接口。`HTMLElement` 类型直接继承自 `Element` 并添加了一些属性。添加的这些属性分别对应于每个 HTML 元素中都存在的下列标准特性。

- `id`，元素在文档中的唯一标识符。
- `tagName`，当前元素的标签名。
- `title`，有关元素的附加说明信息，一般通过工具提示条显示出来。
- `lang`，元素内容的语言代码，很少使用。
- `dir`，语言的方向，值为 "`ltr`"（left-to-right，从左至右）或 "`rtl`"（right-to-left，从右至左），也很少使用。
- `className`，与元素的 `class` 特性对应，即为元素指定的 CSS 类。没有将这个属性命名为 `class`，是因为 `class` 是 JavaScript 的保留字。
- `style`，获取/设置元素的style属性。

```javascript
// 注意不能通过直接给style属性设置字符串来设置style，因为style应被当成是只读的
// 在单个语句中设置多个样式
elt.style.cssText = "color: blue; border: 1px solid black";
// 或者
elt.setAttribute("style", "color:red; border: 1px solid blue;");

// 设置特定样式，同时保持其他内联样式值不变
elt.style.color = "blue";

// 操作方法
var value = elt.getPropertyValue('margin'); // "1px 2px"
elt.setProperty('margin', '1px 2px');
var oldValue = elt.removeProperty('margin');// "1px 2px"
```

### `Element` 属性

- `Element.innerHTML`：设置或获取HTML语法表示的元素的后代。
    - 建议不要使用 `innerHTML` 。取而代之的是使用 [`Node.textContent`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/textContent)

```javascript
// HTML 5 中指定不执行由 innerHTML 插入的 <script> 标签。
name = "<script>alert('I am John in an annoying alert!')</script>";
el.innerHTML = name; // harmless in this case

// 不依赖 <script> 标签去执行 JavaScript 的方式无法阻止
const name = "<img src='x' onerror='alert(1)'>";
el.innerHTML = name; // shows the alert
```

- `Element.outerHTML`：设置或获取描述元素（包括其后代）的序列化HTML片段。
- `Element.classList`：是一个只读属性，返回一个元素的类属性的实时 `DOMTokenList` 集合。(H5新增)
- ```add( String [, String] )```：添加指定的类值。如果这些类已经存在于元素的属性中，那么它们将被忽略。
- ```remove( String [,String] )```：删除指定的类值。
- ```item ( Number )```：按集合中的索引返回类值。
- ```contains( String )```：检查元素的类属性中是否存在指定的类值。
- ```replace( oldClass, newClass )```：用一个新类替换已有类。
  
### `Element` 方法

- `Element.getAttribute()`：返回元素上一个指定的属性值。如果指定的属性不存在，则返回  `null` 或 "" （空字符串）。
- `Element.setAttribute()`：设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。
- `Element.removeAttribute()`：从指定的元素中删除一个属性。

## 五、`Text` 类型

文本节点由 `Text` 类型表示，包含的是可以照字面解释的纯文本内容。纯文本中可以包含转义后的 HTML 字符，但不能包含 HTML 代码。`Text` 节点具有以下特征：

- `nodeType` 的值为3；
- `nodeName` 的值为 "#text"；
- `nodeValue` 的值为节点所包含的文本；
- `parentNode` 是一个 `Element`；
- 不支持（没有）子节点。

可以通过 `nodeValue` 属性访问 `Text` 节点中包含的文本。

```javascript
// 输出结果是"Some &lt;strong&gt;other&lt;/strong&gt; message"
div.firstChild.nodeValue = "Some <strong>other</strong> message";
```

可以使用 `document.createTextNode()` 创建新文本节点，这个方法接受一个参数——要插入节点中的文本。与设置已有文本节点的值一样，作为参数的文本也将按照 HTML 或 XML 的格式进行编码。

```javascript
var textNode = document.createTextNode("<strong>Hello</strong> world!");
```

## 六、 `ParentNode`

> `ParentNode` 混合了所有(拥有子元素的) `Node` 对象包含的共有方法和属性。
>
> `ParentNode` 是一个原始接口，不能够创建这种类型的对象；它在 `Element`、`Document` 和 `DocumentFragment` 对象上被实现。

使用 `ParentNode` 主要是使用其中的一些方便的方法与属性：

- `ParentNode.children`：返回一个包含父节点所有 `Element` 类型的后代的动态html集合 `HTMLCollection`。
- `ParentNode.append()`（IE✖）：在父节点的最后一个后代后面插入一组 `Node` 对象或 `DOMString` 对象。`DOMString` 对象会以同等的 `Text` 节点插入

---
**q_qiu**：与 `Node.appendChild()` 的差异：

- `ParentNode.append()` 允许追加 `DOMString` 对象，而 `Node.appendChild()` 只接受 `Node` 对象。
- `ParentNode.append()` 没有返回值，而 `Node.appendChild()` 返回追加的 `Node` 对象。
- `ParentNode.append()` 可以追加几个节点和字符串，而 `Node.appendChild()` 只能追加一个节点。
---

`ParentNode.prepend()`（IE✖）：在父节点第一个后代前插入一组 `Node` 对象或者 `DOMString` 对象。`DOMString` 对象会以同等的 `Text` 节点插入

## 七、 CSSOM视图模式

这里包括了一些API，包括布局框定位、视区宽度和元素滚动等等。详细的可以参考张鑫旭老师的这些文章：

- [滚动例子](https://www.zhangxinxu.com/wordpress/2019/01/dom-quiz-27-window-scroll/)

- [CSSOM视图模式(CSSOM View Module)相关整理](https://www.zhangxinxu.com/wordpress/2011/09/cssom%e8%a7%86%e5%9b%be%e6%a8%a1%e5%bc%8fcssom-view-module%e7%9b%b8%e5%85%b3%e6%95%b4%e7%90%86%e4%b8%8e%e4%bb%8b%e7%bb%8d/)

- [使用document.scrollingElement控制窗体滚动高度](https://www.zhangxinxu.com/wordpress/2019/02/document-scrollingelement/)
