package middlewares

import (
	"auth/internal/jwt"
	"auth/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AdminCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims := jwt.MustGetClaims(c)
		if claims.Role != jwt.Admin {
			c.Status(http.StatusForbidden)
			c.Abort()
			return
		}

		if _, err := models.GetManagerById(claims.ID); err == nil {
			c.Next()
			return
		}

		c.Status(http.StatusForbidden)
		c.Abort()
	}
}
