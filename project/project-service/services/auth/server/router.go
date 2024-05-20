package server

import (
	"auth/server/middlewares"
	"auth/server/service"
	admin_service "auth/server/service/admin"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRouter() *gin.Engine {
	r := gin.New()

	// TODO: Figure these things out
	config := cors.DefaultConfig()
	config.ExposeHeaders = []string{"Authorization"}
	config.AllowCredentials = true
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))

	/*
		路由
	*/
	api := r.Group("api")
	api.Use(gin.Logger())
	api.Use(gin.Recovery())
	{
		v1 := api.Group("v1")
		{
			// No login required
			user := v1.Group("user")
			{
				// POST api/v1/user/login   | 登录获取 jwt
				user.POST("login", service.HandlerBind(&service.Login{}))
				// POST api/v1/user         | 注册用户
				user.POST("", service.HandlerBind(&service.Register{}))

				auth := user.Group("")
				auth.Use(middlewares.JWTAuth())
				{
					// GET api/v1/users/:id         		| 获取指定 id 用户的信息
					// authed_user.GET(":id", service.HandlerBindUri(&service.GetUser{}))
					// PUT api/v1/user/password			| 修改密码
					auth.PUT("password", service.HandlerBind(&service.UpdatePassword{}))
					// PUT api/v1/user/signature 			| 更新用户的签名
					auth.PUT("signature", service.HandlerBind(&service.UpdateSignature{}))
					// GET api/v1/users/:id/avatar 			| 获得指定id用户的头像
					// authed_user.GET(":id/avatar", service.HandlerBindUri(&service.GetAvatar{}))
					// PUT api/v1/users/avatar				| 更改头像
					// authed_user.PUT("avatar", service.HandlerNoBind(&service.ChangeAvatar{}))
					// GET api/v1/users/:id/notifications	| 获得指定 id 用户的提示信息
				}
			}

			// Admin required
			// api/v1/admin
			admin := v1.Group("admin")
			{
				// POST api/v1/admin/login   | 登录
				admin.POST("login", service.HandlerBind(&admin_service.Login{}))

				auth := admin.Group("")
				auth.Use(middlewares.JWTAuth()).Use(middlewares.AdminCheck())
				{
					// GET    api/v1/admin/users                 | 获取所有用户列表
					auth.GET("users", service.HandlerBind(&admin_service.GetUsers{}))
					// PUT    api/v1/admin/user/:id/password     | 修改用户密码
					auth.PUT("user/:id/password", service.HandlerBind(&admin_service.ChangeUserPassword{}))
					// DELETE api/v1/admin/user/:id              | 删除用户
					auth.DELETE("user/:id", service.HandlerWithBindType(&admin_service.DeleteUser{}, service.BindUri))
				}

				super := admin.Group("")
				super.Use(middlewares.JWTAuth()).Use(middlewares.SuperAdminCheck())
				{
					// GET    api/v1/admin/managers                | 获取所有管理员列表
					super.GET("managers", service.HandlerBind(&admin_service.GetAdmins{}))
					// PUT    api/v1/admin/manager/:id/password    | 修改管理员密码
					super.PUT("manager/:id/password", service.HandlerBind(&admin_service.ChangeAdminPassword{}))
					// DELETE api/v1/admin/manager/:id             | 删除管理员
					super.DELETE("manager/:id", service.HandlerBind(&admin_service.ChangeAdminPassword{}))
				}
			}

		}
	}

	return r
}
