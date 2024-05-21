package middlewares

import (
	"auth/internal/jwt"
	"auth/internal/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SuperAdminCheck() gin.HandlerFunc {
	return func(c *gin.Context) {
		claims := jwt.MustGetClaims(c)
		if claims.Role != jwt.Admin {
			c.Status(http.StatusForbidden)
			c.Abort()
			return
		}

		if admin, err := models.GetManagerById(claims.ID); err == nil && admin.IsSuperAdmin() {
			c.Next()
			return
		}

		c.Status(http.StatusForbidden)
		c.Abort()
	}
}
