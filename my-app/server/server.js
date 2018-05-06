const express = require('express');
const router = express.Router();
const app = express();
const welcome = require('../controllers/welcome');
app.listen(8000)
router.get('/', welcome.index);