# 大作业 —— 共享单车管理



目录结构：

- `docs`: 相关文档
    - `需求文档.md`：需求文档
- `project-android`：移动端
  
   > Kotlin + Jetpack Compose
   
- `project-frontend`：网页前端
  
- `project-service`：服务端
  
    > Docker Compose + Traefik + Golang
    
    由多个用 Golang 编写的微服务组成。
    
    使用 Docker Compose 部署，通过 Traefik 进行服务发现、路由与反向代理。