package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MatchResult int

const (
	InProgress MatchResult = iota
	WhiteWinner
	BlackWinner
	Remis
)

type Match struct {
	Id        primitive.ObjectID `json:"id" bson:"_id"`
	WhiteUser primitive.ObjectID `json:"white" bson:"white"`
	BlackUser primitive.ObjectID `json:"black" bson:"black"`
	Result    MatchResult        `json:"result" bson:"result"`
}
