package utils

import (
	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateMatch(whiteUser primitive.ObjectID, blackUser primitive.ObjectID, table int) models.Match {
	return models.Match{
		Id:        primitive.NewObjectID(),
		WhiteUser: whiteUser,
		BlackUser: blackUser,
		Result:    models.InProgress,
		Table:     table,
	}
}

func PopulateMatch(match models.Match) models.PopulatedMatch {
	var blackUser models.User
	var whiteUser models.User
	var err error

	whiteUser, err = db.FindById[models.User]("user", match.WhiteUser)
	if err != nil {
		panic(err)
	}

	blackUser, err = db.FindById[models.User]("user", match.BlackUser)
	if err != nil {
		panic(err)
	}

	return models.PopulatedMatch{
		Id:        match.Id,
		WhiteUser: whiteUser,
		BlackUser: blackUser,
		Result:    match.Result,
		Table:     match.Table,
	}
}