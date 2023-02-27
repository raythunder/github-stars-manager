# 项目中已经配置了常用工具库的自动导入功能

详见 /config/vite.config.js 中的AutoImport配置，已配置的库包含'vue', 'vue-router', 'pinia'。像useRoute, ref 等基础库不需要手动写导入代码，会自动导入。

# Vue3 + Unocss + Acro Design / Admin template

- 组件库 [arco.design](https://arco.design/vue/docs/start)
- 图标样式系统 [unocss](https://github.com/unocss/unocss) + [icones](https://icones.js.org/collection/ic?s=doc)

# 图标使用

安装对应图标库的依赖包。从url（比如url地址是 https://icones.js.org/collection/ph?s=doc，前缀是ph）或单个图标点击后名称的前缀（图标名是ph:file-doc，前缀是ph）

安装对应的图标包则是 `@iconify-json/ph`

# 开发

推荐全局安装pnpm \ ni

```
npm i -g @antfu/ni pnpm
```

ni 指令会根据项目的 `.lock` 文件自动使用正确的包管理器进行依赖安装

安装项目依赖

```bash
ni
# npm install
# yarn install
# pnpm install
```

安装某个模块

```bash
ni axios
# npm i axios
# yarn add axios
# pnpm add axios
```

安装某个开发模块

```bash
ni @types/node -D
# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
```

项目运行、打包

```bash
nr dev # 开发环境

nr build # 打包
```

# 首次使用模板需要修改的文件

登录涉及的文件

- 用户登录接口 `src\api\user.js`
- ajax 拦截器 `src\api\interceptor.js`
- 路由权限拦截 `src\router\guard\permission.js`

其余冗余文件，自行删除

# 项目配置信息

`/public/config.js` 用于修改api接口baseUrl、上传地址等

# 图标库

https://icones.js.org/collection/ic?s=doc

# vue响应式语法糖

https://staging-cn.vuejs.org/guide/extras/reactivity-transform.html

# unocss 包含或排除的文件注释

```html
<!-- @unocss-include -->
<!-- @unocss-ignore -->
```
