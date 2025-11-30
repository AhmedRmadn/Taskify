const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

exports.signup = async (req, res) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      email: req.body.email,
      password: hash,
    });

    res.status(201).json({ 
      message: "User created", 
      userId: user.id 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email }
    });

    if (!user) 
      return res.status(401).json({ message: "Unauthorized" });

    const valid = await bcrypt.compare(req.body.password, user.password);

    if (!valid) 
      return res.status(401).json({ message: "Invalid Credentials" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
