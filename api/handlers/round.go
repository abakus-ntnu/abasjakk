package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"github.com/abakus-ntnu/abasjakk/api/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func HandleGetRounds(c *gin.Context) {
	rounds := db.FindAll[models.Round]("round")

	populatedRounds := make([]models.PopulatedRound, len(rounds))
	for i := 0; i < len(rounds); i++ {
		populatedRounds[i] = utils.PopulateRound(rounds[i])
	}

	c.JSON(http.StatusOK, populatedRounds)
}

func HandleGetRound(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	round, err := db.FindById[models.Round]("round", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "round not found"})
		return
	}

	populatedRound := utils.PopulateRound(round)

	c.JSON(http.StatusCreated, populatedRound)
}

func HandleCreateRound(c *gin.Context) {
	players := db.Find[models.User]("user", bson.D{{"isDeleted", false}})

	previousRounds := db.FindAll[models.Round]("round")
	lastRound := utils.GetLastRound(previousRounds)

	matches := utils.PairPlayers(players, lastRound)

	round := models.Round{
		Id:      primitive.NewObjectID(),
		Order:   lastRound.Order + 1,
		Matches: matches,
	}
	db.InsertOne[models.Round]("round", round)

	c.JSON(http.StatusOK, gin.H{"message": "round created"})
}

func HandleDeleteRound(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var round models.Round
	round, err = db.FindById[models.Round]("round", objectId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "round not found"})
		return
	}

	for _, matchId := range round.Matches {
		db.DeleteById("match", matchId)
	}

	err = db.DeleteById("round", objectId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "round deleted"})
}
