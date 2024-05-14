# 大作业 —— 共享单车管理



目录结构：

- `docs`: 相关文档
    - `需求文档.md`：需求文档
    
- `project-android`：大作业移动端
    Kotlin + Jetpack Compose
    
- `project-frontend`：
  
- `project-service`：大作业服务端
  
    Docker compose + Traefik
    
    - `docker`：docker 部署相关文件
    - `services`：各个微服务项目
        - `auth`: 提供用户账号相关服务及鉴权相关服务
        - `frontend`：提供网页前端相关服务
        - `bike`: 提供单车信息相关服务