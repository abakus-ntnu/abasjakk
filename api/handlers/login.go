package handlers

import (
	"net/http"

	"github.com/abakus-ntnu/abasjakk/api/utils"
	"github.com/gin-gonic/gin"
)

func HandleLogin(c *gin.Context) {
	if utils.IsCorrectPassword(c) {
		c.JSON(http.StatusOK, gin.H{"message": "correct password"})
	} else {
		c.JSON(http.StatusUnauthorized, gin.H{
			"message": "incorrect password",
		})
	}
}

func LoginMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		if c.Request.Method == http.MethodGet {
			c.Next()
			return
		}

		if utils.IsCorrectPassword(c) {
			c.Next()
		} else {
			c.JSON(http.StatusUnauthorized, gin.H{
				"message": "incorrect password",
			})
			c.Abort()
		}
	}
}
