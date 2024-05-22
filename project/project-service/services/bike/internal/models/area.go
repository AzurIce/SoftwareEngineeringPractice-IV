package models

import "errors"

type Point struct {
	ID        uint    `json:"id" gorm:"primaryKey; autoIncrement"`
	Lat  float64 `json:"lat"`
	Lng float64 `json:"lng"`
	AreaId    int     `json:"-"`
}

type Area struct {
	ID        uint    `json:"id" gorm:"primaryKey; autoIncrement"`
	Name      string  `json:"name" gorm:"uniqueIndex; not null"`
	Lat  float64 `json:"lat"`
	Lng float64 `json:"lng"`
	Points    []Point `json:"points"`
}

func CreateArea(name string, points []Point) (*Area, error) {
	if len(points) < 3 {
		return nil, errors.New("points must be more than 3")
	}
	area := Area{Name: name, Points: points}

	for _, point := range points {
		area.Lat += point.Lat
		area.Lng += point.Lng
	}
	area.Lat /= float64(len(points));
	area.Lng /= float64(len(points));

	if err := DB.Create(&area).Error; err != nil {
		return nil, err
	}
	return &area, nil
}
