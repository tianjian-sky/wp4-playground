# 18-04-17 升级wp到4.10，解决部分问题

## 1.升级webpack4 到 4.10
## 2 修复extract-text-plugin 在wp4编译报错问题
2.1. 使用npm install extract-text-plugin@next 安装beta版  
2.2. 打包后的style.css 嵌入chunkhash (contenthash 会报错)。
## 3 也可使用mini-css-extract-plugin 解决提取css文件 
https://juejin.im/entry/5ad89403518825671c0e15fb
```
    ...
    plugins: [
        new ExtractTextPlugin('style.[chunkhash].css'),  // extractTextPlugin 使用chunkhash
    ...
```