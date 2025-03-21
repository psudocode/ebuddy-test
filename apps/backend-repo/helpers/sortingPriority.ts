// sorting priority
// priority 1 : totalAverageWeightRatings
// priority 2 : numberOfRents
// priority 3 : recentlyActive

// Note:
// this is just a simple sorting function,
// when you have a lot of data to sort,
// you might want to use a more efficient sorting algorithm

// Downside:
// when more than 10 users (limit for pagination) have the same totalAverageWeightRatings,
// it is possible to left users with higher numberOfRents or recentlyActive

// Mitigation:
// we can get all users with the same totalAverageWeightRatings
// and sort them again with the next priority
// then limit the result to 10
// but this will increase the number of reads to firestore

// Pseudocode:
// 1. sort by totalAverageWeightRatings
// 2. if totalAverageWeightRatings is the same, sort by numberOfRents
// 3. if numberOfRents is the same, sort by recentlyActive
// 4. return the sorted users

import { User } from "@repo/types";

const sortingPriority = (users: User[]) => {
  return users.sort((a, b) => {
    if (a.totalAverageWeightRatings > b.totalAverageWeightRatings) {
      return -1;
    } else if (a.totalAverageWeightRatings < b.totalAverageWeightRatings) {
      return 1;
    } else {
      if (a.numberOfRents > b.numberOfRents) {
        return -1;
      } else if (a.numberOfRents < b.numberOfRents) {
        return 1;
      } else {
        if (a.recentlyActive > b.recentlyActive) {
          return -1;
        } else if (a.recentlyActive < b.recentlyActive) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  });

  // Alternative:
  // use ternary operator for shorter code but less readable
  //
  //   return users.sort((a, b) => {
  //     return a.totalAverageWeightRatings > b.totalAverageWeightRatings? -1
  //       : a.totalAverageWeightRatings < b.totalAverageWeightRatings? 1
  //       : a.numberOfRents > b.numberOfRents? -1
  //       : a.numberOfRents < b.numberOfRents? 1
  //       : a.recentlyActive > b.recentlyActive? -1
  //       : a.recentlyActive < b.recentlyActive? 1
  //       : 0;
  //   });
};

export default sortingPriority;
