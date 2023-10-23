package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

func StartMongoDB() {
	uri := "mongodb://localhost:27017"

	var err error
	mongoClient, err = mongo.Connect(context.Background(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
}

func CloseMongoDB() {
	err := mongoClient.Disconnect(context.Background())
	if err != nil {
		panic(err)
	}
}

func GetCollection(collection string) *mongo.Collection {
	return mongoClient.Database("abasjakk").Collection(collection)
}

func GetAllInCollection[T interface{}](collection string) []T {
	cursor, err := GetCollection(collection).Find(context.Background(), bson.D{})
	if err != nil {
		panic(err)
	}

	var results []T
	if err = cursor.All(context.Background(), &results); err != nil {
		panic(err)
	}

	return results
}
