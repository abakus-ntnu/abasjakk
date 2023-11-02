package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func HandleGetRounds(c *gin.Context) {
	rounds := db.FindAll[models.Round]("round")
	c.IndentedJSON(http.StatusOK, rounds)
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

	c.IndentedJSON(http.StatusCreated, round)
}

type RoundUpdateRequest struct {
	Result models.RoundResult `json:"result" bson:"result"`
}

func HandleUpdateRound(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var updatedRound RoundUpdateRequest
	if err := c.ShouldBindJSON(&updatedRound); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	round, err := db.FindById[models.Round]("round", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "round not found"})
		return
	}

	round.Result = updatedRound.Result

	err = db.UpdateById[models.Round]("round", objectId, round)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "round updated"})
}
