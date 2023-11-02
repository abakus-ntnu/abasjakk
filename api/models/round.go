package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type RoundResult int

const (
	InProgress RoundResult = iota
	WhiteWinner
	BlackWinner
	Remis
)

type Round struct {
	Id        primitive.ObjectID `json:"id" bson:"_id"`
	WhiteUser primitive.ObjectID `json:"white" bson:"white"`
	BlackUser primitive.ObjectID `json:"black" bson:"black"`
	Result    RoundResult        `json:"result" bson:"result"`
}
