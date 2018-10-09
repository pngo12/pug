const express = require('express');
const router = express.Router();

const Chatkit = require('@pusher/chatkit-server');

const { INSTANCE_LOCATOR, SECRET_KEY } = process.env;

// --- initialize chatkit ---
const chatkit = new Chatkit.default({
  instanceLocator: INSTANCE_LOCATOR,
  key: SECRET_KEY,
});

// --- list of valid games used for creating rooms ---
const validGames = {
  "PUBG": "PUBG",
  "FORTNITE": "Fortnite",
  "DOTA": "DOTA 2",
  "LEAGUEOFLEGENDS": "League of Legends"
};

// --- helper functions ---

// extracts the room name from a room created
const extractGameName = fullName => fullName.split('-')[0];

const filterRooms = game => ({ name }) => {
  let gameName = extractGameName(name);
  return validGames[gameName] !== undefined && gameName === game;
}

/**
 * Returns a dict of valid games 
 * -> Keys are need to send back for filter
 * -> values are display names
 */
router.get('/gamelist', (req, res) => {
  res.json(validGames);
})


/**
 * On Creating Game Rooms:
 * 
 * They must have a valid game prefix based on the 'validGames' variable above:
 * ex: 'PUBG-doyer's perros'
 * 
 * Use the '/gamelist' to generate a valid list of games to create groups with
 */
router.get('/gamerooms', async (req, res) => {
  try {
    let { game, userId } = req.query;
    let joinableRooms = await chatkit.getUserJoinableRooms({ userId })

    joinableRooms = joinableRooms.filter(filterRooms(game));

    res.send(joinableRooms);
  } catch (err) {
    res.status(err.status).send(err);
  }
})

/**
 * Grabs all users in server
 */
router.get('/allusers', async (req, res) => {
  try {
    res.send(await chatkit.getUsers());
  } catch ({ status, headers, ...err_messages }) {
    res.status(status).send(err_messages);
  }
})

/**
 * Create a new user
 * 
 * Requirement:
 * > id
 * > name
 * 
 * Future: 
 * > Avatar 
 * > Profile info
 * > Game info (usernames & discord connection)
 */
router.post('/createuser', async (req, res) => {
  try {
    let { id, name } = req.body;
    let user = await chatkit.createUser({ id, name });
    res.send(user);
  } catch ({ status, headers, ...err_messages }) {
    res.status(status).send(err_messages);
  }
});

module.exports = router;
