# 设置基础镜像
FROM node:16.15.1 as build-stage

# 设置工作目录
WORKDIR /app

# 复制项目文件到容器中
COPY . /app

# 安装 pnpm
RUN npm install -g pnpm

# 使用 pnpm 安装项目依赖
RUN pnpm install

# 构建 Vue 3 项目
RUN pnpm run build

FROM nginx:1.21.3 as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]