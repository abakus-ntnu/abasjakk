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
	router.GET("/user", handlers.HandleGetUsers)
	router.POST("/user", handlers.HandleCreateUser)
	router.GET("/user/:id", handlers.HandleGetUser)
	router.PUT("/user/:id", handlers.HandleUpdateUser)
	router.DELETE("/user/:id", handlers.HandleDeleteUser)
	router.GET("/match", handlers.HandleGetMatches)
	router.GET("/match/:id", handlers.HandleGetMatch)
	router.PUT("/match/:id", handlers.HandleUpdateMatch)
	router.Run()
}
