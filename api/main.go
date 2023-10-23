package main

import (
	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/handlers"
	"github.com/gin-gonic/gin"
)

func main() {
	db.StartMongoDB()
	defer db.CloseMongoDB()

	router := gin.Default()
	router.GET("/users", handlers.HandleGetUsers)
	router.Run()
}
