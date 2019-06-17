#### webpack4-es6-react-typescript

#### 前言
typescript 逐渐出现在大家的项目中，作为前端的一员，typescript还是必须掌握的知识
jest 一个好的项目应该是存在大量测试代码，晋级必须要掌握的知识

#### 安装依赖
```cnpm install  || npm install```

#### 启动测试
- ```npm run jest```   单次运行
- ```npm run watch```  检测运行
- ```npm run reset```  快照覆盖
#### 启动项目
- ```npm run start```  启动项目
- ```npm run build ``` 打包


### 目录结构

```
.
├── dist  --------------------- 打包文件
├── webpack.config  --------------------- webpack相关配置
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
├── tsconfig.json  ------------------------ typescript配置
├── jest.config.js  ------------------------ jest配置
├── .babelrc  ------------------------ babel 配置
├── __mocks__  ------------------------ 测试辅助文件
├── __tests__  ------------------------ 测试文件
└── src  ------------------------------ 源码目录
    ├── axios  ------------------- 接口
    ├── components  ------------------- 业务模块集合目录
    ├── config  ------------------- 配置参数
    ├── lib  ----------------------- 
        └── img  --------------------- img
        └── less  --------------------- less文件
    └── pages  ------------------------ 页面集合目录
        └── home  --------------------- Home
            ├── Home.js  ------------- 页面入口文件
            └── Home.less  -------- 页面样式
            └── index.js  -------- 页面样式
     ├── router  ------------------- 路由
     ├── store  ------------------- redux
        └── actions  --------------------- actions
        └── reducers  --------------------- reducers
        └── sagas  --------------------- sagas
        └── stores  --------------------- stores
     ├── util  ------------------- 辅助方法
     ├── App  ------------------- 入口组件
     ├── index  ------------------- 入口文件

```

#### jest 参数解析
- --watchAll 开启检测
- --cache   缓存
- -b  在第一个失败的测试套件后立即退出测试套件。
- --debug  打印有关您的Jest配置的调试信息。
- --errorOnDeprecated  调用已弃用的API会抛出有用的错误消息。有助于简化升级过程。
- --expand  使用此标志显示完整的差异和错误而不是补丁

#### TODO
- <del>typescript热更新 </del>
- <del>antd 按需加载</del>
- <del>jest 测试环境</del>

#### 友情项目

webpack4-es6-react
- 介绍：一个基于webpack4、es6、react、react-router4、axios技术的项目架构
- 地址：https://github.com/NewPrototype/webpack4-es6-react

webpack4-es6-react-typescript
- 介绍：一个基于jest、typescript、webpack4、es6、react、react-router4、axios技术的项目架构
- 地址：https://github.com/NewPrototype/webpack4-es6-react-typescript

template-cli
- 介绍：操作终端下载react和typescript模版
- 地址：https://github.com/NewPrototype/template-cli

template
- 介绍：react、typescript模版文件
- 地址：https://github.com/NewPrototype/template

electron-web
- 介绍：electron前端项目
- 地址：https://github.com/NewPrototype/electron-web

electron-node
- 介绍：electron node服务器
- 地址：https://github.com/NewPrototype/electron-server



```
{
    "compilerOptions": {
        /* Basic Options */
        "target": "ES5",
        /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
        "module": "commonjs",
        /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
        // "lib": [],                             /* Specify library files to be included in the compilation. */
        "allowJs": true, /* Allow javascript files to be compiled. */
        // "checkJs": true,                       /* Report errors in .js files. */
        "jsx": "react",
        /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
        "declaration": false,
        /* Generates corresponding '.d.ts' file. */
        // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
        "sourceMap": false,
        /* Generates corresponding '.map' file. */
        // "outFile": "./",                       /* Concatenate and emit output to single file. */
        // "outDir": "./",                        /* Redirect output structure to the directory. */
        // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
        // "composite": true,                     /* Enable project compilation */
        // "removeComments": true,                /* Do not emit comments to output. */
        // "noEmit": true,                        /* Do not emit outputs. */
        // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
        // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
        // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
        /* Strict Type-Checking Options */
        // "strict": true, /* Enable all strict type-checking options. */
        "noImplicitAny": false,
        /* Raise error on expressions and declarations with an implied 'any' type. */
        // "strictNullChecks": true,              /* Enable strict null checks. */
        // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
        // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
        // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
        // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
        // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
        /* Additional Checks */
        // "noUnusedLocals": true,                /* Report errors on unused locals. */
        // "noUnusedParameters": true,            /* Report errors on unused parameters. */
        // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
        // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
        /* Module Resolution Options */
        // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
        // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
        // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
        // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
        // "typeRoots": [],                       /* List of folders to include type definitions from. */
        // "types": [],                           /* Type declaration files to be included in compilation. */
        // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
        "esModuleInterop": true,
        /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
        // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
        /* Source Map Options */
        // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
        // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
        // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
        // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
        /* Experimental Options */
        "experimentalDecorators": true
        /* Enables experimental support for ES7 decorators. */
        // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
       
    },
    "include": [
        "src/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "src/static",
        "output"
    ]
}
```
