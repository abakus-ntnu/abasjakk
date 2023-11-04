package utils

import (
	"os"

	"github.com/gin-gonic/gin"
)

func IsCorrectPassword(c *gin.Context) bool {
	return c.GetHeader("password") == os.Getenv("PASSWORD")
}
