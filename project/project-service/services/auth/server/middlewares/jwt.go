package middlewares

import (
	"auth/internal/jwt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		var tokenStr string
		var err error

		if tokenStr, err = c.Cookie("token"); err != nil {
			tokenStr = jwt.GetTokenStr(c)
		}

		token, err := jwt.DecodeTokenStr(tokenStr)

		if err != nil || !token.Valid {
			// log.Printf("[middlewares/JWTAuth]: Token not valid: %v\n", err)
			c.Status(http.StatusForbidden)
			c.Abort()
			return
		}

		id := token.Claims.(*jwt.MyCustomClaims).ID
		role := token.Claims.(*jwt.MyCustomClaims).Role
		c.Set("ID", id)
		c.Set("Role", role)
		c.Next()
	}
}
