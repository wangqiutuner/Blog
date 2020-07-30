# vue规范

## 一、项目结构

```txt
|——entries
|  |    index.js                        // 入口js
|  |    router.js                       // vue-router配置文件
|——public
|  |    index.html
|——src
|  |    App.vue                         // 根Vue实例
|  |——api                               // API请求
|  |  |——...
|  |——assets                            // 公共资源
|  |  |——icons                          // 图标
|  |  |  |    icon-1.png
|  |  |  |    icon-2.png
|  |  |——images                         // 图片
|  |  |  |    logo.png
|  |——components                        // 公共组件
|  |  |——dialog
|  |  |  |    BaseDialog.vue
|  |  |  |    style.scss
|  |  |  |——assets                      // 公共组件的私有资源
|  |  |  |  |    image.png
|  |——pages                             // 页面
|  |  |——home
|  |  |  |    Home.vue
|  |  |  |    style.scss
|  |  |  |——components                  // 私有组件
|  |  |  |  |——header                   // 单例组件
|  |  |  |  |  |    TheHeader.vue
|  |  |  |  |  |    style.scss
|  |  |  |  |——footer                   // 单例组件
|  |  |  |  |  |    TheHeader.vue
|  |  |  |  |  |    style.scss
|  |  |——content
|  |  |  |    TheContent.vue
|  |  |  |    style.scss
|  |  |  |——components                  // 私有组件
|  |  |  |  |——todo-list                // 爷爷组件
|  |  |  |  |  |    TodoList.vue
|  |  |  |  |  |    style.scss
|  |  |  |  |——todo-list-item           // 父组件
|  |  |  |  |  |    TodoListItem.vue
|  |  |  |  |  |    style.scss
|  |  |  |  |——todo-list-item-button    // 子组件
|  |  |  |  |  |    TodoListItemButton.vue
|  |  |  |  |  |    style.scss
|  |——store                             // vuex配置
|  |  |    index.js
|  |  |    actions.js                   // 根级别的action
|  |  |    mutations.js                 // 根级别的mutation
|  |  |——mudules
|  |  |  |    home.js                   // 模块级别
|  |  |  |    content.js                // 模块级别
```
