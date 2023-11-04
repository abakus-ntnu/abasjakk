package db

import (
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
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

func Find[T interface{}](collection string, filter interface{}) []T {
	cursor, err := GetCollection(collection).Find(context.Background(), filter)
	if err != nil {
		panic(err)
	}

	var results []T
	if err = cursor.All(context.Background(), &results); err != nil {
		panic(err)
	}

	return results
}

func FindById[T interface{}](collection string, id primitive.ObjectID) (T, error) {
	filter := bson.M{"_id": id}

	var result T
	err := GetCollection(collection).FindOne(context.Background(), filter).Decode(&result)

	return result, err
}

func FindOne[T interface{}](collection string, filter interface{}) (T, error) {
	var result T
	err := GetCollection(collection).FindOne(context.Background(), filter).Decode(&result)

	return result, err
}

func FindAll[T interface{}](collection string) []T {
	return Find[T](collection, bson.D{})
}

func InsertOne[T interface{}](collection string, document T) primitive.ObjectID {
	result, err := GetCollection(collection).InsertOne(context.Background(), document)
	if err != nil {
		panic(err)
	}

	return result.InsertedID.(primitive.ObjectID)
}

func UpdateById[T interface{}](collection string, id primitive.ObjectID, document T) error {
	_, err := GetCollection(collection).UpdateByID(context.Background(), id, bson.D{{"$set", document}})
	return err
}

func DeleteById(collection string, id primitive.ObjectID) error {
	filter := bson.M{"_id": id}

	_, err := GetCollection(collection).DeleteOne(context.Background(), filter)
	return err
}
