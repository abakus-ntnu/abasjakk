package main

import (
	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	db.StartMongoDB()
	defer db.CloseMongoDB()

	router := gin.Default()

	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowHeaders = []string{"*"}
	router.Use(cors.New(config))

	router.Use(handlers.LoginMiddleware())

	router.GET("/user/", handlers.HandleGetUsers)
	router.POST("/user/", handlers.HandleCreateUser)
	router.GET("/user/:id", handlers.HandleGetUser)
	router.PUT("/user/:id", handlers.HandleUpdateUser)
	router.DELETE("/user/:id", handlers.HandleDeleteUser)
	router.GET("/match/", handlers.HandleGetMatches)
	router.GET("/match/:id", handlers.HandleGetMatch)
	router.PUT("/match/:id", handlers.HandleUpdateMatch)
	router.GET("/round/", handlers.HandleGetRounds)
	router.POST("/round/", handlers.HandleCreateRound)
	router.GET("/round/:id", handlers.HandleGetRound)
	router.DELETE("/round/:id", handlers.HandleDeleteRound)
	router.GET("/login", handlers.HandleLogin)
	router.Run()
}
