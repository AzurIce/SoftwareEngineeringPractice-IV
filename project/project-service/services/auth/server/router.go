package server

import (
	// "auth/internal/bootstrap"
	"auth/server/middlewares"
	"auth/server/service"
	user_service "auth/server/service/user"

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

	// FrontendFS
	// if bootstrap.Dev {
	// 	// log.Println("Dev flag, using frontend reverse proxy to localhost:5173")
	// 	r.Use(middlewares.FrontendReverseProxy())
	// } else {
	// 	r.Use(middlewares.Frontend())
	// }

	/*
		路由
	*/
	api := r.Group("api")
	// api.Use(gin.Logger())
	api.Use(gin.Recovery())
	{
		// v2 := api.Group("v2")
		// {
		// 	v2.GET("file/:id", service.HandlerBindUri(&service.DownloadFileById{}))

		// 	auth := v2.Group("")
		// 	auth.Use(middlewares.JWTAuth())
		// 	{
		// 		auth.GET("notifications", service.HandlerBindUri(&user_service.GetNotifications{}))
		// 	}
		// }

		v1 := api.Group("v1")
		{
			// No login required
			user := v1.Group("user")
			{
				// TODO: Restful?
				// POST api/v1/user/login | 登录获取 jwt
				user.POST("login", service.HandlerBind(&user_service.Login{}))
				// POST api/v1/user       | 注册用户
				user.POST("", service.HandlerBind(&user_service.Register{}))
				// PUT api/v1/users       | 更新用户信息
				user.PUT("", service.HandlerBind(&user_service.UserselfupdateService{}))
			}

			// Admin required
			// api/v1/admin
			admin := v1.Group("admin")
			admin.Use(middlewares.AdminCheck())
			{
				// api/v1/admin/users
				users := admin.Group("users")
				{
					// GET    api/v1/admin/users     | 获取所有用户列表
					users.GET("", service.HandlerBind(&service.GetUsersService{}))
					// PUT   api/v1/admin/users     | 修改密码
					users.PUT("", service.HandlerBind(&service.UserUpdateService{}))
					// DELETE api/v1/admin/users/:id | 删除用户
					users.DELETE(":id", service.HandlerWithBindType(&service.DeleteUserService{}, service.BindUri))
				}
			}

			// login required
			auth := v1.Group("")
			auth.Use(middlewares.JWTAuth())
			{
				// api/v1/users
				users := auth.Group("users")
				{
					// GET api/v1/users/:id         		| 获取指定 id 用户的信息
					users.GET(":id", service.HandlerBindUri(&user_service.GetUserService{}))
					// PUT api/v1/users/password			| 登录后修改密码
					users.PUT("/password", service.HandlerBind(&user_service.UserUpdatePasswordService{}))
					// PUT api/v1/users/signature 			| 更新用户的签名
					users.PUT("signature", service.HandlerBind(&user_service.UpdateSignature{}))
					// GET api/v1/users/:id/avatar 			| 获得指定id用户的头像
					users.GET(":id/avatar", service.HandlerBindUri(&user_service.GetAvatar{}))
					// PUT api/v1/users/avatar				| 更改头像
					users.PUT("avatar", service.HandlerNoBind(&user_service.ChangeAvatar{}))
					// GET api/v1/users/:id/notifications	| 获得指定 id 用户的提示信息
				}

			}
		}
	}

	return r
}
