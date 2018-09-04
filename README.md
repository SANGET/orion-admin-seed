# 猎户座管理系统的前端脚手架工程

## 依赖

- NodeJs
- basic-helper
- ukelli-ui
- orion-request
- orion-admin-web-scaffold
- orion-web-server

-----------

## [查看更多介绍内容](./docs/intro.md)

-----------

## 问题

### 管理后台的前端开发部分总会遇到一些问题

- 虽然每个管理后台处理的业务不同，但是有很多共同的功能，项目开始的时候可能导致重复开发
- 技术方案不一样，中后期维护(例如修改模版，调整总体样式)，人员变动等因素会导致维护成本变高
- 与服务端的数据交互以及该过程的数据状态管理无法很好统一
- 视觉质量、UI 体验参差不齐，什么元素摆什么位置没有一个谱
- 开发人员不想手动写注释，导致随着业务越来越复杂的时候，后期维护找到对应的页面组件也困难，这个问题会随着时间越发难以解决

### 前端与远端服务对接时遇到的一些问题

- 前端与远端服务接口的数据结构有所差别，前端可能会因为远端接口不一，而频繁改动本可与接口数据具体字段无关的模版的引用

#### 此项目便是为了解决这些问题，「提高管理后台系统的开发效率」。

-----------

## 解决问题需要实现的功能和模块

- 前端数据结构与远端数据结构分离
- 业务模块与模版模块完全分离
- 统一数据驱动试的开发方式
- 统一的 UI 和视觉体验
- 减少编写 html/css 或者的必要
- 支持多标签页面机制
- 支持前端 hash 路由机制
- 自动化生成页面工具，时自动添加相关注释

### 前端数据结构与远端数据结构分离

orion-request 模块提供了通讯加密，消息体压缩，以及处理 req 和 res 数据结构的 hook 函数

-----------

### 业务模块与模版模块完全分离

业务逻辑与渲染模版完全分离，互相独立，可以快速开发基于前后端完全分离的后台管理系统，快速实现业务，抢尽先机。

#### Actions: 业务逻辑数据交互集合

- 定义与服务器交换数据的接口以及逻辑
- 定义表单的交互数据
- 定义表格需要的查询条件数据类型，以及需要渲染的列表数据，以及数据的过滤器

#### Pages: 页面渲染模版，根据上述 Actions 的类型选择不同的模版进行渲染

- 渲染表格的 report-page
- 渲染表单的 form-page
- 也可以是完全独立的模版

### [更多请看这里](./docs/structure.md)

-----------

## 准备 web server

安装到任意目录

```shell
git clone https://github.com/SANGET/orion-web-server.git yourProjName
cd yourProjName
npm run init
npm start
```

浏览器打开 <a href="http://127.0.0.1:3000/dyr/test" target="_blank">http://127.0.0.1:3000/dyr/test</a>

-----------

## 开始使用 orion-admin-web-seed 脚手架工程（开发环境）

### 1. 推荐使用 orion-admin-generator 自动化构建工具，自动构建 action，page ，添加菜单数据

安装 orion cli

```shell
npm i orion-admin-generator -g # 安装成功可以使用 orion cli

orion -v
```

生成项目，根据提示操作即可，方便轻松

```shell
orion init
# 此处是分步操作，根据提示，分别输入项目的英文名称，开发者名称
# 以下例子使用 test-proj
# 初始化成功后会在当前目录生成 ./test-proj 项目
```

项目初始化

```shell
cd ./test-proj

npm run init
# 运行初始化脚本，程序会自动执行 npm install; git init; npm run setVersion，并且生成系统需要的一些依赖文件，等两分钟就好了
```

准备就绪，启动项目，程序自动在浏览器中打开，并且提供 webpack react 的热更新机制

```shell
npm start
```

添加功能页面，以 “系统公告 xtgg” 为例

同步操作 orion addp *pageName* *pageAlias* *pageTypeFlag*

```shell
orion addp xtgg 系统公告 -r

# 此处是同步操作, 创建一个 report 类型的系统公告 action 和 page
# 页面类型 -r == report | -f == form | -i == iframe(未实现) | -m == markdown(未实现)
```

分步操作

```shell
orion add xtgg

# 此处同样是分步操作，根据提示选择页面的类型，输入页面的中文名称即可
# 页面类型 report | form | iframe(未实现) | markdown(未实现)
# 后面会详细讲述不同的类型
```

系统会在项目对应的目录下创建 xtgg.js，并且添加到菜单中，菜单可以自行调整位置

### 2. 手动添加页面的 action 和 page

```shell
git clone https://github.com/SANGET/orion-admin-seed.git
```

-----------

## 应用程序版本机制

[更新版本脚本及说明](./version/README.md)

-----------

## 多语言支持

支持中文的 map 反射，编码方式更友好，语言包在 /public/i18n/ 中

```js
// 向所有 page 传入 gm (getMap) 语言反射
let i18nConfig = {
  '值': 'key'
}
gm('值');
```

TODO 完善自动化调用翻译接口自动翻译基于中文的语言包

-----------

## TODO

- 实现与之配套的 web server 支持
- 实现可视化的生成操作
