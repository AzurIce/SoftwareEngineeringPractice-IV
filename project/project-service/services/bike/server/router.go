package server

import (
	"bike/server/middlewares"
	"bike/server/service"
	"log"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func NotFoundLogger() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Next()

        if c.Writer.Status() == http.StatusNotFound {
            log.Printf("404 Not Found: %s %s", c.Request.Method, c.Request.URL.Path)
        }
    }
}

func InitRouter() *gin.Engine {
	r := gin.New()

	// TODO: Figure these things out
	config := cors.DefaultConfig()
	config.ExposeHeaders = []string{"Authorization"}
	config.AllowCredentials = true
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	r.Use(cors.New(config))
	r.Use(NotFoundLogger())

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
			v1.DELETE("area/:id", service.HandlerBindUri(&service.DeleteArea{}))

			v1.GET("area/:id/bikes", service.HandlerBindUri(&service.AreaGetBikes{}))
			v1.GET("bikes", service.HandlerBindUri(&service.GetBikes{}))
			v1.POST("area/:id/bike", service.HandlerWithBindType(&service.AreaAddBike{}, service.BindUri|service.Bind))
			v1.DELETE("bike/:id", service.HandlerWithBindType(&service.DeleteBike{}, service.BindUri))
		}
	}

	return r
}
