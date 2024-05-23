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

	if err = models.DB.Model(&models.Area{}).Preload("Points").Preload("Bikes").Find(&areas).Error; err != nil {
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

	if err = models.DB.Model(&models.Area{}).Preload("Points").Preload("Bikes").First(&area, service.ID).Error; err != nil {
		return nil, err
	}

	return area, nil
}

type AreaGetBikes struct {
	ID uint `uri:"id" binding:"required"`
}

func (service *AreaGetBikes) Handle(c *gin.Context) (any, error) {
	var area *models.Area
	var err error

	if area, err = models.GetAreaById(service.ID); err != nil {
		return nil, err
	}

	return area.Bikes, nil
}

type AreaAddBike struct {
	ID  uint    `uri:"id" binding:"required"`
	Uid uint    `form:"uid"`
	Lng float64 `form:"lng"`
	Lat float64 `form:"lat"`
}

func (service *AreaAddBike) Handle(c *gin.Context) (any, error) {
	var err error

	var area *models.Area
	if area, err = models.GetAreaById(service.ID); err != nil {
		return nil, err
	}
	var bike *models.Bike
	if bike, err = area.AddBike(models.Bike{
		Uid: service.Uid,
		Lng: service.Lng,
		Lat: service.Lat,
	}); err != nil {
		return nil, err
	}

	return bike, nil
}

type DeleteBike struct {
	ID uint `uri:"id" binding:"required"`
}

func (service *DeleteBike) Handle(c *gin.Context) (any, error) {
	var bike models.Bike
	var err error

	if err = models.DB.Model(&models.Bike{}).Association("Area").Delete(&bike, service.ID); err != nil {
		return nil, err
	}

	return nil, nil
}
