const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

//import secret from env
const mySecret = process.env.JWT_SECRET;

//Register new User
router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedpass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedpass,
  });

  const newuser = await user.save();
  const { password, ...data } = await newuser.toJSON();

  res.send(data);
});

//Login User
router.post("/login", async (req, res) => {
  user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: "wrong credincials" });
  }

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(400).json({ message: "wrong credincials" });
  }

  const tokeni = jwt.sign(
    { _id: user.id, name: user.name, email: user.email },
    mySecret
  );

  res.cookie("jwt", tokeni, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

  const { password, ...data } = await user.toJSON();

  res.send(tokeni);
});

//Authenticate User
router.get("/user", async (req, res, next) => {
  try {
    const cookie = req.cookies["jwt"];

    const claims = jwt.verify(cookie, mySecret);

    if (!claims) {
      return res.status(401).send({ message: "Unauthenticated" });
    }

    const user = await User.findOne({ _id: claims._id }).select("-password");
    return res.json(user);
  } catch (err) {
    return res.status(401).send({ message: "Unauthenticated" });
  }
});

//Deauthenticate user
router.post("/logout", (req, res, next) => {
  res.cookie("jwt", " ", { maxAge: 0 });
  res.send({ message: "success" });
});

module.exports = router;
