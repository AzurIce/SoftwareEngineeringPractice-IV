package admin

import (
	"auth/internal/jwt"
	"auth/internal/models"
	"errors"
	// "log"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Login to an admin account
type Login struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func (service *Login) Handle(c *gin.Context) (any, error) {
	var user *models.Manager
	var err error

	// Validate the form
	if service.Username == "" {
		return nil, errors.New("username cannot be empty")
	}
	if service.Password == "" {
		return nil, errors.New("password cannot be empty")
	}

	if user, err = models.GetAdminByUsername(service.Username); err == gorm.ErrRecordNotFound {
		return nil, err
	}

	if !user.CheckPassword(service.Password) {
		return nil, errors.New("password or username is incorrect")
	}

	var jwtToken string
	if jwtToken, err = jwt.CreateToken(user.ID, jwt.Admin); err != nil {
		return nil, err
	}

	// c.SetCookie("token", jwtToken, 3600, "/", "localhost", false, true)
	res := make(map[string]any)
	res["token"] = jwtToken
	res["user"] = *user
	res["msg"] = "login success"
	return res, nil
}

// Login to an admin account
type Create struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func (service *Create) Handle(c *gin.Context) (any, error) {
	var manager *models.Manager
	var err error

	// Validate the form
	if service.Username == "" {
		return nil, errors.New("username cannot be empty")
	}
	if service.Password == "" {
		return nil, errors.New("password cannot be empty")
	}

	if _, err = models.GetAdminByUsername(service.Username); err != gorm.ErrRecordNotFound {
		return nil, errors.New("username already exist")
	}

	if manager, err = models.CreateAdmin(service.Username, service.Password); err != nil {
		return nil, err
	}

	// c.SetCookie("token", jwtToken, 3600, "/", "localhost", false, true)
	res := make(map[string]any)
	res["user"] = *manager
	res["msg"] = "create success"
	return res, nil
}
