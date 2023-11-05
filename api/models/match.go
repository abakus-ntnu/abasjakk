package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type MatchResult string

const (
	InProgress  MatchResult = "IN_PROGRESS"
	WhiteWinner             = "WHITE_VICTORY"
	BlackWinner             = "BLACK_VICTORY"
	Draw                    = "DRAW"
)

type Match struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	WhiteUser primitive.ObjectID `json:"white" bson:"white"`
	BlackUser primitive.ObjectID `json:"black" bson:"black"`
	Result    MatchResult        `json:"result" bson:"result"`
	Table     int                `json:"table" bson:"table"`
}

type PopulatedMatch struct {
	Id        primitive.ObjectID `json:"_id" bson:"_id"`
	WhiteUser User               `json:"white" bson:"white"`
	BlackUser User               `json:"black" bson:"black"`
	Result    MatchResult        `json:"result" bson:"result"`
	Table     int                `json:"table" bson:"table"`
}
