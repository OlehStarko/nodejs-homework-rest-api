const { User } = require("../../models/usersModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
    });
  }
  if (!user.verify) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Please verify your email",
    });
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  const id = user.id;
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

module.exports = login;
