#18-04-17
#1.升级webpack4 到 4.10
#2 修复extract-text-plugin 在wp4编译报错问题
#2.1 使用npm install extract-text-plugin@next 安装beta版
#2.2打包后的style.css 嵌入chunkhash 而不是 contenthash 与wp的hash字段一致。