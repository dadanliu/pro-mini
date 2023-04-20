# 贡献指南

## 快速启动

```shell
# clone
git clone git@code.ops.focus.cn:fe-base/pro-mini.git
# 新建分支 feat/fix
git checkout -b feat/xxx
# 安装依赖
yarn setup
# link 并启动 demo/doc 需要保证 8810 和 8820 端口是空闲的
yarn start
# 访问 http://localhost:8820/
```

## 贡献组件

- 使用最新版脚手架`npm i -g @focus/cli`，执行`focus add pm-button`然后选择`pro-mini.package`再选择`common.empty`会执行下方 **1/2/5**步骤，您还需手动执行下方**3/4/6**方可进入组件的贡献
- 0.下面以组件`button`为例
- 1.前往`pro-mini-components/src/components/`下新建`pm-button/index.vue`文件
   - 仔细阅读如何[为你的组件编写文档](https://vuese.github.io/website/zh/cli/#%E4%B8%BA%E4%BD%A0%E7%9A%84%E7%BB%84%E4%BB%B6%E7%BC%96%E5%86%99%E6%96%87%E6%A1%A3)
- 2.前往`pro-mini-demos/src/pages/`下新建 `button/index.vue` 文件
- 3.前往`pro-mini-demos/src/pages.json`中新增配置
```json
{
  "pages" : [
    {
      "path": "pages/button/index",
      "style": {
        "navigationBarTitleText": "button"
      }
    }
  ]
}
```
- 4.前往`pro-mini-demos/src/router.js`中新增配置
```js
routes: [
  { path: '/pages/button/index', aliasPath: '/button' },
]
```
- 5.前往`pro-mini-doc/docs/components/`下新建 `button.md` 文件

   前往`pro-mini-components/`下新建执行命令自动生成组件的 props、methods、slots... 定义
```shell
yarn docs:gen
```
然后将各自组件的 README 文件内容拷贝在下方
```md
## button 按钮 <to-api/>

<demo-model url="/pages/button"></demo-model>
```
- 6.前往`pro-mini-doc/docs/.vuepress/config.js`中配置
```js
sidebar: [
  {
    children: [
      ["/components/button", "button 按钮"],
    ]
  }
]
```

### 提 Merge Request

- 前往 http://code.ops.focus.cn/fe-base/pro-mini/merge_requests
- `Target branch`选择`feat/contribution`分支（注意，其他分支不予通过！！！）

### 发布

```bash
# 发布到 http://npm.internal.focus.cn/
# 可查看示意 http://wiki.ops.focus.cn/pages/viewpage.action?pageId=13547011
# 切记：勿随意执行，需至少两个同学 code review
$ yarn release
```