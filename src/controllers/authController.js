const bcrypt = require('bcrypt');
const db = require('../db/index');

exports.register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  

  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format' });
  }

  // Strong password validation regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long and include at least one letter and one number' });
  }

  // Check if the username or email is already registered
  db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length > 0) {
      const isUsernameTaken = results.some(result => result.username === username);
      const isEmailTaken = results.some(result => result.email === email);
      if (isUsernameTaken && isEmailTaken) {
        return res.status(409).json({ message: 'Both username and email are already registered' });
      } else if (isUsernameTaken) {
        return res.status(409).json({ message: 'Username is already taken' });
      } else if (isEmailTaken) {
        return res.status(409).json({ message: 'Email is already registered' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (error, results) => {
      if (error) {
        return res.status(500).json({ message: 'Database insert error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    });
  });
};


exports.login = async (req, res) => {
  const { login, password } = req.body; 

  if (!login || !password) {
    return res.status(400).json({ message: 'Email/Username and password are required' });
  }

  db.query('SELECT * FROM users WHERE email = ? OR username = ?', [login, login], async (error, results) => {
    if (error) {
      return res.status(500).json({ message: 'Database query error' });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Assuming the first result is the correct user
    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid login or password' });
    }

    res.status(200).json({ message: 'User logged in successfully' });
  });
};
