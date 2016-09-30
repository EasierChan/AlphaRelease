### 开发环境搭建 ###
npm install 初始化开发环境  
npm start 启动程序
### 目录结构 ###
```
ss-protfolio/          		// 根目录
├── node_modules/      		// 这个是依赖库
├── resource/          		// 资源目录
│   ├── css/           		// 界面样式
│   ├── fonts/         		// 自定义字体
│   ├── images/        		// 图片文件
│   └── scripts        		// js组件,以及交互性脚本
└── src/               		// 主程序源码文件
    ├── common/        		// 公用组件，接口
    ├── dal/           		// 数据访问层接口
    ├── model/         		// 公用数据模型
    └── ui/            		// 界面
        ├── controller/		// 控制器
        └── view/      		// 界面定义
```