package models

import (
	"bike/internal/bootstrap"
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
}

func generateData() {

}

func deleteData() {

}

func Migrate() {
	DB.AutoMigrate(&Area{}, &Point{})
}