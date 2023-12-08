const express = require('express');
const app = express();
const cors = require('cors');


app.use(express.json()); 
app.use(cors());

app.get('/', (req, res) => {
  res.send('Api Working !');
});

const authController = require('./controllers/authController');

app.post('/register', authController.register);

app.post('/login', authController.login);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
