const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, password);
    
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Not user found' });
    console.log(user.password, password);

    //const isMatch = await bcrypt.compare(password, user.password);
    //if (!isMatch) return res.status(401).json({ error: 'Not matching passwords' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5m'});
    console.log("Imprimiendo el token con expiracion");
    console.log(token);
    res.json({ token, username: user.username }); // Return username along with the token 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
