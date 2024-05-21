package models

import (
	"auth/internal/bootstrap"
	"auth/internal/utils"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var db *gorm.DB
	var err error
	log.Printf("connecting to database %s...\n", bootstrap.Config.SQLDSN)
	db, err = gorm.Open(postgres.Open(bootstrap.Config.SQLDSN), &gorm.Config{})
	if err != nil {
		log.Panicf("无法连接数据库，%s", err)
	}
	log.Println("database connected")
	sqlDB, err := db.DB()
	if err == nil {
		// SetMaxIdleConns sets the maximum number of connections in the idle connection pool.
		sqlDB.SetMaxIdleConns(100)

		// SetMaxOpenConns sets the maximum number of open connections to the database.
		sqlDB.SetMaxOpenConns(200)
	}

	if err != nil {
		log.Panicf("无法连接数据库，%s", err)
	}

	DB = db
	Migrate()

	if bootstrap.GenDataOverwrite {
		deleteData()
	}
	if bootstrap.GenData || bootstrap.GenDataOverwrite {
		generateData()
	}

	// 创建初始管理员账户
	addDefaultUser()
}

func deleteData() {
	// log.Println("正在删库🥳...")
	DB.Where("1 = 1").Delete(&User{})
}

func Migrate() {
	DB.AutoMigrate(&User{})
	DB.AutoMigrate(&Manager{})
}

func generateData() {
	CreateUser("xb", "xb")
}

func addDefaultUser() {
	_, err := GetManagerById(1)

	if err == gorm.ErrRecordNotFound {
		password := utils.RandStringRunes(8)

		defaultAdmin := &Manager{
			ID:       1,
			Username: "admin",
			Password: utils.EncodePassword(password, utils.RandStringRunes(16)),
		}

		if err := DB.Create(&defaultAdmin).Error; err != nil {
			log.Panicf("创建初始管理员账户失败: %s\n", err)
		}

		log.Println("初始管理员账户创建完成")
		log.Printf("用户名: %s\n", "Admin")
		log.Printf("密码: %s\n", password)
	}
}
