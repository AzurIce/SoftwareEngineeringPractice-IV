package admin

import (
	"auth/internal/models"
	"errors"

	"github.com/gin-gonic/gin"
)

type GetUsers struct{}

func (service *GetUsers) Handle(c *gin.Context) (any, error) {
	return models.GetUsers()
}

// DeleteUser deletes a `User` with `ID`
type DeleteUser struct {
	ID uint `uri:"id" binding:"required"`
}

func (service *DeleteUser) Handle(c *gin.Context) (any, error) {
	if err := models.DeleteUserById(service.ID); err != nil {
		return nil, err
	}
	res := make(map[string]any)
	res["msg"] = "user delete success"
	return res, nil
}

type ChangeUserPassword struct {
	Id       uint   `uri:"id" binding:"required"`
	Password string `form:"password"`
}

func (service *ChangeUserPassword) Handle(c *gin.Context) (any, error) {
	user, err := models.GetUserById(service.Id)
	if err != nil {
		return nil, errors.New("user not exist")
	}
	if err := user.ChangePassword(service.Password); err != nil {
		return nil, err
	}

	res := make(map[string]any)
	res["msg"] = "user info update success"
	return res, nil
}

// Admins

type GetAdmins struct{}

func (service *GetAdmins) Handle(c *gin.Context) (any, error) {
	return models.GetAdmins()
}

type UpdateAdmin struct {
	Id       uint   `uri:"id" binding:"required"`
	Username string `form:"username"`
	Password string `form:"password"`
}

func (service *UpdateAdmin) Handle(c *gin.Context) (any, error) {
	manager, err := models.GetManagerById(service.Id)
	if err != nil {
		return nil, errors.New("admin not exist")
	}
	if err := manager.Update(service.Username, service.Password); err != nil {
		return nil, err
	}

	res := make(map[string]any)
	res["msg"] = "manager update success"
	return res, nil
}

type DeleteAdmin struct {
	ID uint `uri:"id" binding:"required"`
}

func (service *DeleteAdmin) Handle(c *gin.Context) (any, error) {
	if err := models.DeleteManagerById(service.ID); err != nil {
		return nil, err
	}
	res := make(map[string]any)
	res["msg"] = "admin delete success"
	return res, nil
}
