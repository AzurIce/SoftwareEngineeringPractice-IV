package models

import (
	"auth/internal/utils"
	"errors"
	"strings"
)

type User struct {
	// gorm.Model
	ID        uint   `json:"id" gorm:"primaryKey"`
	Username  string `json:"username" gorm:"uniqueIndex; not null"` // 用户名
	Password  string `json:"-" gorm:"not null"`                     // 密码
	IsAdmin   bool   `json:"isAdmin"`                               // 是否是管理员
	Signature string `json:"signature"`                             // 用户个性签名
	Avatar    string `json:"avatar"`
}

// CreateUser creates a user with the given username and raw password
func CreateUser(username string, password string) (*User, error) {
	password = utils.EncodePassword(password, utils.RandStringRunes(16))
	user := User{Username: username, Password: password, IsAdmin: false}

	if err := DB.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserById gets the user corresponding to the given id
func GetUserByID(id uint) (user User, err error) {
	if err = DB.First(&user, id).Error; err != nil {
		// log.Printf("%s: 查找失败(%s)", logPrefix, err)
	} else {
		// log.Printf("%s: 查找成功(username = %s)", logPrefix, user.Username)
	}
	return
}

// DeleteUserById deletes the user corresponding to the given id
func DeleteUserById(id uint) (err error) {
	if err = DB.Delete(&User{}, id).Error; err != nil {
		// log.Printf("%s: 删除失败(%s)", // logPrefix, err)
	} else {
		// log.Printf("%s: 删除成功", // logPrefix)
	}
	return
}

// GetUsers gets all users
func GetUsers() (users []User, err error) {
	if err = DB.Find(&users).Error; err != nil {
		// log.Printf("%s: 获取失败", // logPrefix)
	} else {
		// log.Printf("%s: 获取完成(len = %d)", // logPrefix, len(users))
	}

	return users, nil
}

func (user *User) ChangeAvatar(url string) error {
	if url == "" {
		return errors.New("图床传入错误")
	}
	if err := DB.Model(&user).Updates(User{Avatar: url}).Error; err != nil {
		return err
	}
	return nil
}

// CheckPassword checks whether the password is correct or not
func (user *User) CheckPassword(password string) bool {
	salt := strings.Split(user.Password, ":")[0]
	return user.Password == utils.EncodePassword(password, salt)
}

// ChangePassword changes password
func (user *User) ChangePassword(password string) error {
	if len(password) == 0 {
		return errors.New("密码不能为空")
	}
	if err := DB.Model(&user).Updates(User{Password: utils.EncodePassword(password, utils.RandStringRunes(16))}).Error; err != nil {
		return err
	}
	return nil
}

func UpgradeToAdmin(userId uint) error {
	user, err := GetUserByID(userId)
	if err != nil {
		return err
	}
	user.IsAdmin = true
	err = DB.Save(&user).Error
	return err
}

func (user *User) ChangeSignature(signature string) error {
	// log.Printf("正在修改签名<User>(Username = %s, Signature = %s)...", user.Username, signature)
	result := DB.Model(&user).Updates(User{Signature: signature})
	return result.Error
}

func GetUserByUsername(username string) (User, error) {
	// log.Printf("正在查找<User>(Username = %s)...", username)
	var user User
	res := DB.Where("username = ?", username).First(&user)
	if res.Error != nil {
		// log.Printf("查找失败: %s", res.Error)
		return user, res.Error
	}
	// log.Printf("查找完成: <User>(Username = %s)", user.Username)
	return user, nil
}
