package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"github.com/abakus-ntnu/abasjakk/api/utils"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func HandleGetMatches(c *gin.Context) {
	matches := db.FindAll[models.Match]("match")

	populatedMatches := make([]models.PopulatedMatch, len(matches))
	for i := 0; i < len(matches); i++ {
		populatedMatches[i] = utils.PopulateMatch(matches[i])
	}

	c.JSON(http.StatusOK, populatedMatches)
}

func HandleGetMatch(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	match, err := db.FindById[models.Match]("match", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "match not found"})
		return
	}

	populatedMatch := utils.PopulateMatch(match)

	c.JSON(http.StatusCreated, populatedMatch)
}

type MatchUpdateRequest struct {
	Result models.MatchResult `json:"result" bson:"result"`
}

func HandleUpdateMatch(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var updatedMatch MatchUpdateRequest
	if err := c.ShouldBindJSON(&updatedMatch); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	match, err := db.FindById[models.Match]("match", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "match not found"})
		return
	}

	utils.UpdateScores(match, updatedMatch.Result)

	match.Result = updatedMatch.Result

	err = db.UpdateById[models.Match]("match", objectId, match)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "match updated"})
}
