# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

# 项目结构

```shell
├─index.html           index.html 单页面入口，提供id为app的挂载点
└─src
│   ├─assets           静态文件
│   │  └─images
│   ├─components       组件
│   ├─gis              地图相关工具箱
│   ├─views           页面
│   │  ├─themeMap            案例2
│   │  └─login           登录页面
│   ├─routers          项目路由
│   ├─App.vue          根组件SFC单文件组件
│   ├─main.ts          入口文件，createApp函数创建应用实例
├─ .env              环境变量定义文件
├─ tsconfig.json     ts 配置文件
├─ .eslintrc.yml     eslint 配置文件
├─ .prettierrc.json  prettier 配置文件
├─ .gitignore        git 忽略配置
├─ .package.json     项目包文件
├─ .vite.config.ts    项目的配置文件，基于vite的配置
```

