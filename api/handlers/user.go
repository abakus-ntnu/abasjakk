package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"github.com/gin-gonic/gin"
)

func HandleGetUsers(c *gin.Context) {
	users := db.GetAllInCollection[models.User]("users")
	c.IndentedJSON(http.StatusOK, users)
}
