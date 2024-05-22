package service

import (
	"auth/internal/jwt"
	"errors"

	"github.com/gin-gonic/gin"
)

type Auth struct {
	Jwt string `form:"jwt" binding:"required"`
}

func (service *Auth) Handle(c *gin.Context) (any, error) {
	token, err := jwt.DecodeTokenStr(service.Jwt)

	if err != nil || !token.Valid {
		return nil, errors.New("token invalid")
	}

	// id := token.Claims.(*jwt.MyCustomClaims).ID
	role := token.Claims.(*jwt.MyCustomClaims).Role
	return role, nil
}
