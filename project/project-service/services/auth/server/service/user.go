package service

import (
	// "encoding/base64"
	"auth/internal/jwt"
	"auth/internal/models"
	"errors"

	// "auth/internal/utils"
	// "mime/multipart"
	// "path/filepath"
	// "strings"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Login to an account
type Login struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func (service *Login) Handle(c *gin.Context) (any, error) {
	var user *models.User
	var err error

	// Validate the form
	if service.Username == "" {
		return nil, errors.New("username cannot be empty")
	}
	if service.Password == "" {
		return nil, errors.New("password cannot be empty")
	}

	if user, err = models.GetUserByUsername(service.Username); err == gorm.ErrRecordNotFound {
		return nil, err
	}

	if !user.CheckPassword(service.Password) {
		return nil, errors.New("password or username is incorrect")
	}

	var jwtToken string
	if jwtToken, err = jwt.CreateToken(user.ID, jwt.User); err != nil {
		return nil, err
	}

	// c.SetCookie("token", jwtToken, 3600, "/", "localhost", false, true)
	res := make(map[string]any)
	res["token"] = jwtToken
	res["user"] = user
	res["msg"] = "login success"
	return res, nil
}

type UpdatePassword struct {
	OldPassword string `form:"oldPassword"`
	NewPassword string `form:"newPassword"`
}

func (service *UpdatePassword) Handle(c *gin.Context) (any, error) {
	if service.NewPassword == "" {
		return nil, errors.New("password cannot be empty")
	}

	var user *models.User
	var err error

	id := c.GetUint("ID")
	if user, err = models.GetUserById(id); err != nil {
		return nil, errors.New("user not exist")
	}
	if !user.CheckPassword(service.OldPassword) {
		return nil, errors.New("password is incorrect")
	}

	if err := user.ChangePassword(service.NewPassword); err != nil {
		return nil, err
	}
	res := make(map[string]any)
	res["msg"] = "success"
	return res, nil
}

// type GetUserService struct {
// 	ID uint `uri:"id" binding:"required"`
// }

// func (service *GetUserService) Handle(c *gin.Context) (any, error) {
// 	return models.GetUserByID(service.ID)
// }

// type GetUserNameService struct {
// }

// func (service *GetUserNameService) Handle(c *gin.Context) (any, error) {
// 	id := c.GetUint("ID")
// 	user, err := models.GetUserByID(id)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return user.Username, nil
// }

// type GetAvatar struct {
// 	ID uint `uri:"id" binding:"required"`
// }

// func (service *GetAvatar) Handle(c *gin.Context) (any, error) {
// 	user, err := models.GetUserByID(service.ID)
// 	if err != nil {
// 		return nil, err
// 	}
// 	return user.Avatar, err
// }

// type ChangeAvatar struct {
// 	Avatar *multipart.FileHeader `form:"avatar"`
// }

// func (s *ChangeAvatar) Handle(c *gin.Context) (any, error) {
// 	if c.ContentType() != "multipart/form-data" {
// 		return nil, errors.New("not supported content-type")
// 	}

// 	// 从 Form 获取其他数据
// 	err := c.ShouldBind(s) //获得图片
// 	if err != nil {
// 		return nil, err
// 	}
// 	if s.Avatar.Size > 1100000 {
// 		return nil, errors.New("上传图片不可超过1mb")
// 	}
// 	// 判断是不是图片
// 	extension := filepath.Ext(s.Avatar.Filename)
// 	if !strings.Contains(".jpg.jpeg.png.gif.bmp", extension) {
// 		return nil, errors.New("unsupported file type")
// 	}
// 	id := c.GetUint("ID")
// 	user, err := models.GetUserByID(id)
// 	if err != nil {
// 		return nil, errors.New("用户不存在")
// 	}
// 	avatarByte, err := utils.FileHeaderToBytes(s.Avatar)
// 	if err != nil {
// 		return "", err
// 	}
// 	base64str := base64.StdEncoding.EncodeToString(avatarByte)
// 	if err != nil {
// 		return nil, err
// 	}
// 	err = user.ChangeAvatar(base64str)
// 	return nil, err
// }

type Register struct {
	Username string `form:"username"`
	Password string `form:"password"`
}

func (service *Register) Handle(c *gin.Context) (any, error) {
	if len(service.Username) == 0 {
		return nil, errors.New("用户名不能为空")
	}
	if len(service.Password) == 0 {
		return nil, errors.New("密码不能为空")
	}
	_, err := models.CreateUser(service.Username, service.Password)
	return nil, err
}

type UpdateSignature struct {
	Signature string `form:"signature"`
}

func (Service *UpdateSignature) Handle(c *gin.Context) (any, error) {
	id, exist := c.Get("ID")
	if !exist {
		return nil, errors.New("不存在id")
	}
	user, err := models.GetUserById(id.(uint))
	if err != nil {
		return nil, err
	}
	if err := user.ChangeSignature(Service.Signature); err != nil {
		return nil, err
	}
	return nil, nil
}
