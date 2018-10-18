const express = require('express');
const router = express.Router();

const {
  getValidGames,
  canJoinRoom,
  loginUser,
  createUser,
  getAllUsers,
  getAllJoinableRoomsOfSpecificGame,
  getAllJoinedRooms,
  getAllJoinedRoomsOfSpecificGame,
  createRoom
} = require('../controllers/chatkit-controller');


router.get('/gamelist', getValidGames);
router.get('/checkroom', canJoinRoom)
router.get('/gamerooms', getAllJoinableRoomsOfSpecificGame)
router.get('/alljoinedrooms', getAllJoinedRooms)
router.get('/userrooms', getAllJoinedRoomsOfSpecificGame)
router.get('/allusers', getAllUsers)

router.post('/createuser', createUser)
router.post('/login', loginUser)
router.post('/createroom', createRoom)

module.exports = router;
