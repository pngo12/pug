const express = require('express');
const router = express.Router();

const Chatkit = require('@pusher/chatkit-server');

const { INSTANCE_LOCATOR, SECRET_KEY } = process.env;

// --- initialize chatkit ---
const chatkit = new Chatkit.default({
  instanceLocator: INSTANCE_LOCATOR,
  key: SECRET_KEY,
});


/* GET home page. */
router.post('/', async (req, res) => {
  let { id, name } = req.body;

  let user = await chatkit.createUser({ id, name });

  res.send(user);
});

module.exports = router;
