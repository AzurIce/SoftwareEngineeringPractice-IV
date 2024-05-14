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
	Signature string `json:"signature"`                             // 用户个性签名
	Avatar    string `json:"avatar"`
}

// CreateUser creates a user with the given username and raw password
func CreateUser(username string, password string) (*User, error) {
	password = utils.EncodePassword(password, utils.RandStringRunes(16))
	user := User{Username: username, Password: password}

	if err := DB.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetUserById gets the user corresponding to the given id
func GetUserById(id uint) (user *User, err error) {
	if err = DB.First(user, id).Error; err != nil {
		return nil, err
	}
	return user, nil
}

// DeleteUserById deletes the user corresponding to the given id
func DeleteUserById(id uint) (err error) {
	if err = DB.Delete(&User{}, id).Error; err != nil {
		return err
	}
	return nil
}

// GetUsers gets all users
func GetUsers() (users []User, err error) {
	if err = DB.Find(&users).Error; err != nil {
		return []User{}, err
	}
	return users, nil
}

func (user *User) ChangeAvatar(url string) error {
	if url == "" {
		return errors.New("empty url")
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
		return errors.New("empty password")
	}
	if err := DB.Model(&user).Updates(User{Password: utils.EncodePassword(password, utils.RandStringRunes(16))}).Error; err != nil {
		return err
	}
	return nil
}

func (user *User) ChangeSignature(signature string) error {
	result := DB.Model(&user).Updates(User{Signature: signature})
	return result.Error
}

func GetUserByUsername(username string) (user *User, err error) {
	if err := DB.Where("username = ?", username).First(user).Error; err != nil {
		return nil, err
	}
	return user, nil
}
