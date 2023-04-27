require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const apiPort = 3000;
const db = require('./db');
const posts = require('./routes/post.routes');
const auth = require('./routes/auth.routes');
const images = require('./routes/image.routes');
const requireAuth = require('./middlewares/requireAuth');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '5mb' }));

app.use('/api', auth);
app.use('/api', requireAuth, posts);
app.use('/api', requireAuth, images);

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
