package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func HandleGetUsers(c *gin.Context) {
	users := db.FindAll[models.User]("user")
	c.IndentedJSON(http.StatusOK, users)
}

func HandleGetUser(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	user, err := db.FindById[models.User]("user", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	c.IndentedJSON(http.StatusCreated, user)
}

func HandleCreateUser(c *gin.Context) {
	user := models.User{
		IsDeleted: false,
	}

	err := c.BindJSON(&user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	if user.Id.IsZero() {
		user.Id = primitive.NewObjectID()
	}

	objectId := db.InsertOne("user", user)
	c.JSON(http.StatusOK, objectId)
}

type UserUpdateRequest struct {
	Name      *string     `bson:"name"`
	Score     *float64    `bson:"score"`
	IsDeleted *bool       `bson:"isDeleted"`
}

func HandleUpdateUser(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var updatedUser UserUpdateRequest
	if err := c.ShouldBindJSON(&updatedUser); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request body"})
		return
	}

	user, err := db.FindById[models.User]("user", objectId)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	if updatedUser.Name != nil {
		user.Name = *updatedUser.Name
	}
	if updatedUser.Score != nil {
		user.Score = *updatedUser.Score
	}
	if updatedUser.IsDeleted != nil {
		user.IsDeleted = *updatedUser.IsDeleted
	}

	err = db.UpdateById[models.User]("user", objectId, user)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user updated"})
}

func HandleDeleteUser(c *gin.Context) {
	paramId := c.Param("id")

	objectId, err := primitive.ObjectIDFromHex(paramId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	err = db.DeleteById("user", objectId)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "user deleted"})
}
