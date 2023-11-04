package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	Name      string             `json:"name" bson:"name"`
	Score     float64            `json:"score" bson:"score"`
	IsDeleted bool               `json:"isDeleted" bson:"isDeleted"`
}
