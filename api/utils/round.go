package utils

import (
	"fmt"
	"math/rand"
	"sort"

	"github.com/abakus-ntnu/abasjakk/api/db"
	"github.com/abakus-ntnu/abasjakk/api/models"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func PopulateRound(round models.Round) models.PopulatedRound {
	populatedMatches := make([]models.PopulatedMatch, len(round.Matches))

	for i := 0; i < len(round.Matches); i++ {
		match, err := db.FindById[models.Match]("match", round.Matches[i])
		if err != nil {
			panic(err)
		}

		populatedMatches[i] = PopulateMatch(match)
	}

	return models.PopulatedRound{
		Id:      round.Id,
		Order:   round.Order,
		Matches: populatedMatches,
	}
}

func GetLastRound(previousRounds []models.Round) models.Round {
	var lastRound models.Round
	maxOrderNumber := 0

	for i := 0; i < len(previousRounds); i++ {
		if previousRounds[i].Order > maxOrderNumber {
			maxOrderNumber = previousRounds[i].Order
			lastRound = previousRounds[i]
		}
	}

	return lastRound
}

func GeneratePlayedAgainstLastRoundMap(players []models.User, lastRound models.Round) map[primitive.ObjectID]primitive.ObjectID {
	playedAgainstLastRound := make(map[primitive.ObjectID]primitive.ObjectID, len(players))
	populatedLastRound := PopulateRound(lastRound)

	for _, match := range populatedLastRound.Matches {
		playedAgainstLastRound[match.WhiteUser.Id] = match.BlackUser.Id
		playedAgainstLastRound[match.BlackUser.Id] = match.WhiteUser.Id
	}

	return playedAgainstLastRound
}

func GetNextPlayer(players []models.User, alreadyPaired map[primitive.ObjectID]struct{}, index int) int {
	for i := index; i < len(players); i++ {
		if _, ok := alreadyPaired[players[i].Id]; !ok {
			return i
		}
	}
	return -1
}

func PairPlayers(players []models.User, lastRound models.Round) []primitive.ObjectID {
	matches := make([]primitive.ObjectID, len(players)/2+len(players)%2)

	playedWhiteCount := CountTimesPlayedWhite(players)
	playedAgainstLastRound := GeneratePlayedAgainstLastRoundMap(players, lastRound)

	rand.Shuffle(len(players), func(i, j int) { players[i], players[j] = players[j], players[i] })
	sort.SliceStable(players, func(i, j int) bool {
		return players[i].Score > players[j].Score
	})

	matchIndex := 0
	alreadyPaired := make(map[primitive.ObjectID]struct{})
	for i := 0; i < len(players); i++ {
		white := players[i].Id
		black := players[i].Id

		if _, ok := alreadyPaired[players[i].Id]; ok {
			continue
		}

		j := GetNextPlayer(players, alreadyPaired, i+1)
		q := GetNextPlayer(players, alreadyPaired, j+1)
		fmt.Println(j, q)
		if j != -1 {
			black = players[j].Id
			if q != -1 && playedAgainstLastRound[white] == black {
				black = players[q].Id
			}
		}

		whiteCount, whiteHasPlayedWhite := playedWhiteCount[white]
		blackCount, blackHasPlayedWhite := playedWhiteCount[black]
		if whiteHasPlayedWhite && (!blackHasPlayedWhite || blackCount < whiteCount) {
			tmp := white
			white = black
			black = tmp
		}

		match := CreateMatch(white, black, matchIndex+1)
		alreadyPaired[white] = struct{}{}
		alreadyPaired[black] = struct{}{}

		db.InsertOne("match", match)
		fmt.Println(i, white, black)
		matches[matchIndex] = match.Id
		matchIndex += 1
	}

	return matches
}

func CountTimesPlayedWhite(players []models.User) map[primitive.ObjectID]int {
	playedWhiteCount := make(map[primitive.ObjectID]int)

	previousMatches := db.FindAll[models.Match]("match")
	for i := 0; i < len(previousMatches); i++ {
		white := previousMatches[i].WhiteUser

		if _, ok := playedWhiteCount[white]; ok {
			playedWhiteCount[white] += 1
		} else {
			playedWhiteCount[white] = 1
		}
	}

	return playedWhiteCount
}

func GetNextUserIndex(users []models.User, fromIndex int) {

}
