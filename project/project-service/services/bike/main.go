package main

import (
	"bike/internal/bootstrap"
	"bike/internal/models"
	"bike/server"
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

	err := api.Run(":80")
	if err != nil {
		log.Panicln(err)
	}
}
