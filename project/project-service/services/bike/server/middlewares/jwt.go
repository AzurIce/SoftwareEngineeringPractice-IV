package middlewares

import (
	// "net/http"

	"bike/internal/bootstrap"
	"bytes"
	"encoding/json"
	"io"
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

type response struct {
	Data int `json:"data"`
}

func JWTAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		var tokenStr string
		var err error

		if tokenStr, err = c.Cookie("token"); err != nil {
			tokenStr = strings.ReplaceAll(c.Request.Header.Get("Authorization"), "Bearer ", "")
		}

		payload := map[string]string{"jwt": tokenStr}
		jsonData, err := json.Marshal(payload)
		if err != nil {
			c.Status(http.StatusForbidden)
			c.Abort()
			return
		}

		resp, err := http.Post(bootstrap.Config.AuthUrl, "application/json", bytes.NewBuffer(jsonData))
		if err != nil || resp.StatusCode != http.StatusOK {
			c.Status(http.StatusForbidden)
			c.Abort()
			return
		}
		defer resp.Body.Close()

		body, err := io.ReadAll(resp.Body)
		if err != nil {
			log.Println(err)
			return
		}

		var response response
		if err = json.Unmarshal(body, &response); err != nil {
			log.Println(err)
			return
		}

		c.Next()
	}
}
