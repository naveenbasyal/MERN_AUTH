const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect(
  `mongodb+srv://naveenbasyal001:12345@cluster0.k73nfoc.mongodb.net/newauth?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("DB connected");
  }
);

const mySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

//----------------creating model--------

const User = new mongoose.model("User", mySchema);

//------------Routes------------
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User not found",
      });
    }
    const isPasswordMatch = user.password === password;
    if (!isPasswordMatch) {
      return res.status(400).json({ msg: "PasswordNotMatch" });
    }
    return res.status(200).json({ msg: "Login Successful" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ username: user.name, msg: "Server error" });
  }
});
app.post("/signup", async (req, res) => {
  const { name, email, password, phone, profession } = req.body;
  try {
    const exist = await User.findOne({ email: email });
    if (exist) {
      return res.status(400).json({ msg: "AlreadyExist" });
    }
    await User.create({
      email,
      password,
      name,
      phone,
      profession,
    });
    res.status(200).json({ msg: "User Created succesfuly" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Server error",
    });
  }
});

app.listen(9002, () => {
  console.log("Started at port 9002");
});
