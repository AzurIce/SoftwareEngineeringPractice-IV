package models

import (
	"errors"
)

type Point struct {
	ID  uint    `json:"id" gorm:"primaryKey; autoIncrement"`
	Lat float64 `json:"lat"`
	Lng float64 `json:"lng"`

	AreaId int `json:"-"`
}

type Area struct {
	ID   uint    `json:"id" gorm:"primaryKey; autoIncrement"`
	Name string  `json:"name" gorm:"uniqueIndex; not null"`
	Lat  float64 `json:"lat"`
	Lng  float64 `json:"lng"`

	Points []Point `json:"points" gorm:"constraint:OnDelete:CASCADE"`
	Bikes  []Bike  `json:"bikes" gorm:"constraint:OnDelete:CASCADE"`
}

func CreateArea(name string, points []Point) (*Area, error) {
	if len(points) < 3 {
		return nil, errors.New("points must be more than 3")
	}

	// log.Println(points)
	// to avoid reusing points, which has previous AreaID
	newPoints := make([]Point, len(points))
	copy(newPoints, points)	
	area := Area{Name: name, Points: newPoints}

	for _, point := range points {
		area.Lat += point.Lat
		area.Lng += point.Lng
	}
	area.Lat /= float64(len(points))
	area.Lng /= float64(len(points))

	if err := DB.Create(&area).Error; err != nil {
		return nil, err
	}
	return &area, nil
}

func GetAreas() ([]Area, error) {
	var areas []Area
	if err := DB.Preload("Points").Preload("Bikes").Find(&areas).Error; err != nil {
		return nil, err
	}
	return areas, nil
}

func GetAreaById(id uint) (*Area, error) {
	var area Area
	if err := DB.Preload("Points").Preload("Bikes").First(&area, id).Error; err != nil {
		return nil, err
	}
	return &area, nil
}

func (area *Area) UpdatePoints(points []Point) error {
	if len(points) < 3 {
		return errors.New("points must be more than 3")
	}
	area.Points = points
	area.Lat = 0
	area.Lng = 0
	for _, point := range points {
		area.Lat += point.Lat
		area.Lng += point.Lng
	}
	area.Lat /= float64(len(points))
	area.Lng /= float64(len(points))

	return DB.Save(area).Error
}

func (area *Area) AddBike(bike Bike) (*Bike, error) {
	bike.AreaId = area.ID
	area.Bikes = append(area.Bikes, bike)
	if err := DB.Save(area).Error; err != nil {
		return nil, err
	}
	return &bike, nil
}
