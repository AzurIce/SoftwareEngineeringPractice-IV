package server

import (
	"bike/server/middlewares"
	"bike/server/service"

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
	api.Use(middlewares.JWTAuth())
	{
		v1 := api.Group("v1")
		{
			v1.GET("areas", service.HandlerNoBind(&service.GetAreas{}))
			v1.POST("area", service.HandlerBind(&service.CreateArea{}))
			v1.GET("area/:id", service.HandlerBindUri(&service.GetArea{}))
		}
	}

	return r
}