import classicTiles from "./classicTiles";
import treeTiles from "./treeTiles";
import oceanTiles from "./oceanTiles";
import transportTiles from "./transportTiles";
import dogTiles from "./dogTiles";
import catTiles from "./catTiles";
import planetTiles from "./planetTiles";
import fantasyTiles from "./fantasyTiles";
import sfTiles from "./sfTiles";
import steampunkTiles from "./steampunkTiles";

export {
  classicTiles,
  treeTiles,
  oceanTiles,
  transportTiles,
  dogTiles,
  catTiles,
  planetTiles,
  fantasyTiles,
  sfTiles,
  steampunkTiles,
};

export default [
  {
    id: 1,
    tiles: classicTiles,
  },

  // Easy
  {
    id: 2,
    tiles: treeTiles,
  },
  {
    id: 3,
    tiles: oceanTiles,
  },
  {
    id: 4,
    tiles: transportTiles,
  },

  // Medium
  {
    id: 5,
    tiles: dogTiles,
  },
  {
    id: 6,
    tiles: catTiles,
  },
  {
    id: 7,
    tiles: planetTiles,
  },

  // Hard
  {
    id: 8,
    tiles: fantasyTiles,
  },
  {
    id: 9,
    tiles: sfTiles,
  },
  {
    id: 10,
    tiles: steampunkTiles,
  },
];
