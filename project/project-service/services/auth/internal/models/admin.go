package models

import (
	"auth/internal/utils"
	"errors"
	"strings"
)

type Manager struct {
	ID       uint   `json:"id" gorm:"primaryKey; autoIncrement"`
	Username string `json:"username" gorm:"uniqueIndex; not null"`
	Password string `json:"-" gorm:"not null"`
}

// CreateAdmin creates an admin user with the given username and raw password
func CreateAdmin(username string, password string) (*Manager, error) {
	password = utils.EncodePassword(password, utils.RandStringRunes(16))
	user := Manager{Username: username, Password: password}

	if err := DB.Create(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

// GetManagerById gets the admin user corresponding to the given id
func GetManagerById(id uint) (*Manager, error) {
	var manager Manager
	if err := DB.First(&manager, id).Error; err != nil {
		return nil, err
	}
	return &manager, nil
}

// GetManagerByUsername gets the admin user corresponding to the given username
func GetManagerByUsername(username string) (*Manager, error) {
	var manager Manager
	if err := DB.Where("username = ?", username).First(&manager).Error; err != nil {
		return nil, err
	}
	return &manager, nil
}

// DeleteAmdinById deletes the admin user corresponding to the given id
func DeleteManagerById(id uint) (err error) {
	// Forbid deleting super admin
	if id == 1 {
		return errors.New("cannot delete super admin")
	}

	if err = DB.Delete(&Manager{}, id).Error; err != nil {
		return err
	}
	return
}

// GetAdmins gets all admin users
func GetAdmins() (managers []Manager, err error) {
	if err = DB.Find(&managers).Error; err != nil {
		return []Manager{}, err
	}
	return managers, nil
}

// CheckPassword checks whether the password is correct or not
func (user *Manager) CheckPassword(password string) bool {
	salt := strings.Split(user.Password, ":")[0]
	return user.Password == utils.EncodePassword(password, salt)
}

// ChangePassword changes password
func (user *Manager) ChangePassword(password string) error {
	if len(password) == 0 {
		return errors.New("password cannot be empty")
	}
	if err := DB.Model(user).Updates(Manager{Password: utils.EncodePassword(password, utils.RandStringRunes(16))}).Error; err != nil {
		return err
	}
	return nil
}

// ChangePassword changes password
func (user *Manager) ChangeUsername(username string) error {
	if len(username) == 0 {
		return errors.New("username cannot be empty")
	}
	if err := DB.Model(user).Updates(Manager{Username: username}).Error; err != nil {
		return err
	}
	return nil
}

func (user *Manager) Update(username string, password string) error {
	if len(password) == 0 {
		return errors.New("password cannot be empty")
	}
	if len(username) == 0 {
		return errors.New("username cannot be empty")
	}
	if err := DB.Model(user).Updates(Manager{
		Username: username,
		Password: utils.EncodePassword(password, utils.RandStringRunes(16)),
	}).Error; err != nil {
		return err
	}
	return nil
}

func (user *Manager) IsSuperAdmin() bool {
	return user.ID == 1
}
