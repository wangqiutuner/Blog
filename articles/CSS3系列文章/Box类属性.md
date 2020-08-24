# CSS3的Box类属性

## 一、`box-shadow`

CSS `box-shadow` 属性用于在元素的框架上添加阴影效果。也支持在同一个元素上设置多个阴影效果，并用逗号将他们分开。该属性可以设置的值包括阴影的X轴偏移量、Y轴偏移量、模糊半径、扩散半径和颜色。

> ```box-shadow: (inset)? <length> <length> <length>? <length>? <color>?```
>
> **参数(`inset`)**：如果没有指定 `inset`，默认阴影在边框外，即阴影向外扩散，使用 `inset` 关键字时阴影在边框内部，即阴影向内扩散。
>
> **`<lenght>`**：
>
> - 如果只给出了两个值，那么这两个值会被当做 `<offset-x><offset-y>`来解释。
> - 如果给出了第三个值，那么第三个值会被当做 `<blur-radius>` 解释。
> - 如果给出了第四个值，那么第四个值会被当做 `<spread-radius>` 来解释。
>
> **参数(`<offset-x><offset-y>`)**：用来设置阴影的偏移量，x轴水平向右为正方向，y轴垂直向下为正方向。
>
> **参数(`<blur-radius>`) | 可选**：值越大，模糊面积越大，阴影越大越淡。默认为0，不能为负值
>
> **参数(`<spread-radius>`) | 可选**：取正值时，阴影扩大；去负值时，阴影收缩。默认为0，此时阴影与元素同样大。
>
> **参数(`<color>`) | 可选**：阴影颜色，如果没有指定，则由浏览器决定。
>
> **默认值**：由被删除的元素组成的一个数组。

**示例：**

```css
box-shadow: 10px 5px 5px red;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: 10px 5px 5px red;">该盒子外有阴影</p>

```css
box-shadow: 10px -5px 5px red;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: 10px -5px red;">该盒子外有阴影</p>

```css
box-shadow: 0 0 2px 2px red;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: 0 0 2px 2px red;">该盒子外有阴影</p>

```css
box-shadow: inset 10px 5px 0 0 red;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: inset 10px 5px 0 0 red;">该盒子内有阴影</p>

```css
/* 当设置inset时，<spread-radius>增大相当于内部白色块缩小 */
box-shadow: inset 10px 5px 0 5px red;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: inset 10px 5px 0 5px red;">该盒子内有阴影</p>

```css
box-shadow: 10px 5px 5px 0 red,-10px -5px 5px 0 green;
```

<p style="width:8em;border:1px solid;padding:5px;box-shadow: 10px 5px 5px 0 red,-10px -5px 5px 0 green;">该盒子外有阴影</p>

## 二、`box-sizing`

盒尺寸中的4个盒子都会影响到宽度，这样元素的最终宽度就很容易发生变化而导致发生意想不到的布局，`box-sizing` 的出现就是用来解决这些问题。

例如，盒子的CSS为：

```css
.box{
    width:100px;
    border:1px solid;
}
```

此时的宽度为102像素。然后假如这里需要给元素加上四边10像素的 `padding`：

```css
.box{
    width:100px;
    padding:10px;
    border:1px solid;
}
```

此时的宽度变为了122像素，与原来的宽度差异明显，布局很容易出问题。为了不影响盒子的最终宽度，可以采用宽度分离策略：

```css
.father{
    width:102px;
}
.father > .son{
    padding:10px;
    border:1px solid;
}
```

这样的盒子宽度还是102像素，子元素的内容盒子变为了80像素。通过将 `width` 与 `margin`、`padding`、`border`分离可以减少其对盒子最终宽度的影响。

`box-sizing` 的语法如下：

> ```box-sizing: content-box | border-box | inherit```
>
> - **`content-box`**：标准盒子模型，`width` 和 `height` 只包含内容的宽和高。
> - **`border-box`**：`width` 和 `height` 包含内容，内边距和边框，但不包括外边距。

使用 `box-sizing` 就可以减少上边的标签层级：

```css
.box{
    width:102px;
    box-sizing:border-box;
    padding:10px;
    border:1px solid;
}
```

这样盒子的宽度也是102像素，一般来说替换元素时最适合使用 `border-box` 的标签，例如 `<input>` 和 `<textarea>` 往往都是默认带有边框，并且我们常常需要其充满父容器，我们需要设置其宽度为100%。如果不使用 `border-box` 就很容易使得边框溢出父容器。

```css
input,textarea{
    width:100%;
    box-sizing:border-box;
    -ms-box-sizing:border-box;  /* for IE8 */
}
```

因此我们可以在CSS的重置文件中加入：

```css
input,textarea,img,video,object{
    box-sizing:border-box;
}
```

## github上存在显示问题

在github的md文件中无法显示某些Html标签属性和内联样式，如果存在问题请在[Box类属性](https://github.com/wangqiutuner/Blog/blob/master/articles/CSS3%E7%B3%BB%E5%88%97%E6%96%87%E7%AB%A0/Box%E7%B1%BB%E5%B1%9E%E6%80%A7.md)页面下载该markdown文件进行查阅。
