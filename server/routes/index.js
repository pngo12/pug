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
const validGames = [
  {
    server: "PUBG",
    title: "PUBG",
    img_url: "https://pngimg.com/uploads/pubg/pubg_PNG33.png"
  },
  {
    server: "FORTNITE",
    title: "Fortnite",
    img_url: "https://res.cloudinary.com/teepublic/image/private/s--8LWtGSfC--/t_Preview/b_rgb:ffffff,c_limit,f_jpg,h_630,q_90,w_630/v1522032181/production/designs/2529444_0.jpg"
  },
  {
    server: "DOTA",
    title: "DOTA 2",
    img_url: "https://vignette.wikia.nocookie.net/defenseoftheancients/images/6/64/Dota_2_Logo_only.png/revision/latest?cb=20110914005751"
  },
  {
    server: "LOL",
    title: "League of Legends",
    img_url: "https://i.kym-cdn.com/photos/images/newsfeed/000/691/679/f7b.jpg"
  },
  {
    server: "CSGO",
    title: "CS GO",
    img_url: "https://ih1.redbubble.net/image.455817861.0192/ap,550x550,16x12,1,transparent,t.png"
  }
]

// --- helper functions ---

// extracts the Game name from a room created
const extractGameName = fullName => fullName.split('-')[0];

// get only games with the appropriate prefix
const _filterRooms = game => ({ name }) => {
  let gameName = extractGameName(name);
  return validGames.find(g => g.server === gameName) !== undefined && gameName === game;
}

const _validGames = ({ name }) => validGames.find(g => g.server === extractGameName(name)) !== undefined;

/**
 * Returns a dict of valid games 
 * -> Keys are need to send back for filter
 * -> values are display names
 */
router.get('/gamelist', (req, res) => {
  res.json(validGames);
})


/**
 * Check if I can join a room
 * 
 */
router.get('/checkroom', async (req, res) => {
  
  try {
    let { userId, roomId } = req.query;
    // get joinable rooms and then find it

    let joinableRooms = await chatkit.getUserJoinableRooms({ userId })

    joinableRooms = joinableRooms.filter(_validGames);
    joinableRooms = joinableRooms.map(room => {
      let maxOccupancy = parseInt(room.name.split('-')[2]);
      let amtUsers = room.member_user_ids.length;
      return {
        ...room,
        name: room.name.split('-')[1],
        game: extractGameName(room.name),
        maxOccupancy,
        amtUsers,
        full: amtUsers >= maxOccupancy
      }
    })

    let { full } = joinableRooms.find(room => room.id === parseInt(roomId))

    res.send({ allowed: !full })

  } catch (err) {
    res.status(404).send(err);
  }
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

    joinableRooms = joinableRooms.filter(_filterRooms(game));
    joinableRooms = joinableRooms.map(room => {
      let maxOccupancy = parseInt(room.name.split('-')[2]);
      let amtUsers = room.member_user_ids.length;
      return {
        ...room,
        name: room.name.split('-')[1],
        game: extractGameName(room.name),
        maxOccupancy,
        amtUsers,
        full: amtUsers >= maxOccupancy
      }
    })

    res.send(joinableRooms);
  } catch (err) {
    res.status(err.status).send(err);
  }
})

/**
 * all rooms a user is a part of; filtered for valid games but not specific games (LOL PUBG etc shown)
 */
router.get('/alljoinedrooms', async (req, res) => {
  try {

    let { userId } = req.query;
    let joinableRooms = await chatkit.getUserRooms({ userId })

    joinableRooms = joinableRooms.filter(_validGames);
    joinableRooms = joinableRooms.map(room => {
      let maxOccupancy = parseInt(room.name.split('-')[2]);
      let amtUsers = room.member_user_ids.length;
      return {
        ...room,
        name: room.name.split('-')[1],
        game: extractGameName(room.name),
        maxOccupancy,
        amtUsers,
        full: amtUsers >= maxOccupancy
      }
    })

    res.send(joinableRooms);

  } catch (err) {
    res.status(404).send(err);
  }
})

/**
 * All rooms that the user is a part of based on game
 */
router.get('/userrooms', async (req, res) => {
  try {
    let { game, userId } = req.query
    let rooms = await chatkit.getUserRooms({ userId });

    rooms = rooms.filter(_filterRooms(game));
    rooms = rooms.map(room => {
      let maxOccupancy = parseInt(room.name.split('-')[2]);
      let amtUsers = room.member_user_ids.length;
      return {
        ...room,
        name: room.name.split('-')[1],
        game: extractGameName(room.name),
        maxOccupancy,
        amtUsers,
        full: amtUsers >= maxOccupancy
      }
    });

    res.send(rooms);

  } catch (err) {
    res.status(404).send(err);
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
