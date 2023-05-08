const express = require('express');

const router = express.Router();
const { getMe, updateUser } = require('../controllers/users');

router.get('/me', getMe);
router.patch('/me', express.json(), updateUser);

module.exports = router;
