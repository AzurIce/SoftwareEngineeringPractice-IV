package models

import (
	"auth/internal/bootstrap"
	// "auth/internal/utils"
	"log"

	"gorm.io/driver/postgres"
	// "gorm.io/gorm/logger"

	// "gocloud.dev/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB() {
	var db *gorm.DB
	var err error
	log.Println("connecting to database: %s", bootstrap.Config.SQLDSN)
	db, err = gorm.Open(postgres.Open(bootstrap.Config.SQLDSN), &gorm.Config{})
	if err != nil {
		log.Panicf("无法连接数据库，%s", err)
	}
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
	// addDefaultUser()
}

func deleteData() {
	// log.Println("正在删库🥳...")
	DB.Where("1 = 1").Delete(&User{})
	// DB.Where("1 = 1").Delete(&File{})
	// DB.Where("1 = 1").Delete(&Course{})
	// DB.Where("1 = 1").Delete(&Homework{})
	// DB.Where("1 = 1").Delete(&HomeworkSubmission{})
	// DB.Where("1 = 1").Delete(&Comment{})
	// DB.Where("1 = 1").Delete(&Complaint{})
}

func Migrate() {
	DB.AutoMigrate(&User{})
	// DB.AutoMigrate(&File{})
	// DB.AutoMigrate(&Course{})
	// DB.AutoMigrate(&Homework{})
	// DB.AutoMigrate(&HomeworkSubmission{})
	// DB.AutoMigrate(&Comment{})
	// DB.AutoMigrate(&Complaint{})
}

func generateData() {
	CreateUser("xb", "xb")
}

// func addDefaultUser() {
// 	_, err := GetUserByID(1)
// 	password := utils.RandStringRunes(8)

// 	if err == gorm.ErrRecordNotFound {
// 		defaultUser := &User{}

// 		defaultUser.ID = 1
// 		defaultUser.Username = "Admin"
// 		defaultUser.Password = utils.EncodePassword(password, utils.RandStringRunes(16))
// 		defaultUser.IsAdmin = true

// 		if err := DB.Create(&defaultUser).Error; err != nil {
// 			log.Panicf("创建初始管理员账户失败: %s\n", err)
// 		}

// 		// log.Println("初始管理员账户创建完成")
// 		// log.Printf("用户名: %s\n", "Admin")
// 		// log.Printf("密码: %s\n", password)
// 	}
// }
