# 使用 Node.js 作为基础镜像
FROM node:16-alpine

# 设置工作目录
WORKDIR /app

# 复制项目文件到镜像中
COPY . .

# 安装依赖
RUN npm install

# 构建生产环境
RUN npm run build

# 暴露容器的端口号
EXPOSE 80

# 启动命令
CMD [ "npm", "run", "serve" ]