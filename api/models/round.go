package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Round struct {
	Id      primitive.ObjectID   `json:"_id" bson:"_id"`
	Order   int                  `json:"order" bson:"order"`
	Matches []primitive.ObjectID `json:"matches" bson:"matches"`
}

type PopulatedRound struct {
	Id      primitive.ObjectID `json:"_id" bson:"_id"`
	Order   int                `json:"order" bson:"order"`
	Matches []PopulatedMatch   `json:"matches" bson:"matches"`
}
