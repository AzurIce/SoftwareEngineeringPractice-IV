# 服务端

> Docker Compose + Traefik + Golang

由多个用 Golang 编写的微服务组成。

使用 Docker Compose 部署，通过 Traefik 进行服务发现、路由与反向代理。

目录结构：

- `docker`：docker 部署相关文件
- `services`：各个微服务项目
    - `auth`: 提供用户账号相关服务及鉴权相关服务
    - `frontend`：提供网页前端相关服务
    - `bike`: 提供单车信息相关服务