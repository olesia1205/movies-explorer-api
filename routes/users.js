const express = require('express');

const router = express.Router();
const { getMe, updateUser } = require('../controllers/users');
const { validateUpdateUser } = require('../utils/requestValidation');

router.get('/me', getMe);
router.patch('/me', express.json(), validateUpdateUser, updateUser);

module.exports = router;
