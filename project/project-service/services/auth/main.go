package main

import (
	"auth/internal/bootstrap"
	"auth/internal/models"
	"auth/server"
	"log"
)

func Init() {
	bootstrap.InitFlag()
	bootstrap.InitConfig()
	models.InitDB()
}

func main() {
	Init()

	api := server.InitRouter()

	err := api.Run(":3333")
	if err != nil {
		log.Panicln(err)
	}
}
