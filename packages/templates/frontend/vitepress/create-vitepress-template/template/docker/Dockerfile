# ---------- Stage 1: Build ----------
FROM node:20-alpine AS build

WORKDIR /app

# 启用 corepack 以使用 pnpm,避免额外单独安装
RUN corepack enable && corepack prepare pnpm@latest --activate

# 先只拷贝依赖清单,最大化利用 Docker 层缓存
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# 拷贝全部源码并构建
COPY . .
RUN pnpm docs:build

# ---------- Stage 2: Serve ----------
FROM nginx:1.27-alpine AS runner

# 使用针对 VitePress 优化的 nginx 配置
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# 只拷贝构建产物,最终镜像不包含任何源码和 node_modules
COPY --from=build /app/docs/.vitepress/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
