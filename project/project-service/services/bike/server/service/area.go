package service

import (
	"bike/internal/models"
	"log"

	"github.com/gin-gonic/gin"
)

type CreateArea struct {
	Name   string         `json:"name"`
	Points []models.Point `json:"points"`
}

func (service *CreateArea) Handle(c *gin.Context) (any, error) {
	var area *models.Area
	var err error

	log.Println(*service)
	if area, err = models.CreateArea(service.Name, service.Points); err != nil {
		return nil, err
	}
	log.Println(*service)
	return area.ID, nil
}

type GetAreas struct{}

func (service *GetAreas) Handle(c *gin.Context) (any, error) {
	var areas []models.Area
	var err error

	if err = models.DB.Model(&models.Area{}).Preload("Points").Find(&areas).Error; err != nil {
		return nil, err
	}

	return areas, nil
}

type GetArea struct {
	ID uint `uri:"id" binding:"required"`
}

func (service *GetArea) Handle(c *gin.Context) (any, error) {
	var area models.Area
	var err error

	if err = models.DB.Model(&models.Area{}).Preload("Points").First(&area, service.ID).Error; err != nil {
		return nil, err
	}

	return area, nil
}	