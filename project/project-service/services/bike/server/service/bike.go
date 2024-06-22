package service

import (
	"bike/internal/models"

	"github.com/gin-gonic/gin"
)

type GetBikes struct{}

func (service *GetBikes) Handle(c *gin.Context) (any, error) {
	var bikes []models.Bike
	var err error

	if bikes, err = models.GetBikes(); err != nil {
		return nil, err
	}

	return bikes, nil
}