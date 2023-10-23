package models

type User struct {
	Name      string `json:"name"`
	Score     int    `json:"score"`
	IsDeleted bool   `json:"isDeleted"`
}
