package models

type Bike struct {
	Uid    uint    `json:"uid" gorm:"primaryKey; not null"`
	Lat    float64 `json:"lat"`
	Lng    float64 `json:"lng"`

	AreaId uint    `json:"area_id"`
	// Status int     `json:"status"` // 0: offline, 1: normal, 2: out of area
}
