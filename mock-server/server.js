const express = require("express");
const app = express();
const cors = require("cors");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { connectToDB } = require("./connectBd");
require("dotenv").config();
const PORT = process.env.PORT || 3001;
let verifyCode = {};
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_ACCOUNT,
    pass: process.env.GOOGLE_PASSWORD,
  },
});

app.use(cors());
app.use(express.json());

// SIGN UP

app.post("/signUpConfirm", async (req, res) => {
  const { email } = req.body;
  const code = crypto.randomBytes(3).toString("hex");
  try {
    const existingUser = await connectToDB("findOne", req.body);
    if (existingUser) {
      return res.status(400).json({ message: "User already exist" });
    }
    verifyCode = { ...verifyCode, [email]: code };
    let info = await transporter.sendMail({
      from: `"Junior Forum" ${process.env.GOOGLE_ACCOUNT}`,
      to: email,
      subject: "Verify your email",
      text: `Your verify code: ${code}`,
    });
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).send({ success: false });
  }
});

// VERIFY CODE

app.post("/verifyCode", async (req, res) => {
  const { email, code, user } = req.body;
  if (code === verifyCode[email]) {
    res.status(200).send({ success: true, message: "Verify completed" });
    let newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await connectToDB("addUser", newUser);
  } else {
    res.status(300).send({ success: false, message: "Verify failed" });
  }
});

// SIGN IN FUNCTION

app.post("/sign-in", async (req, res) => {
  const { password } = req.body;
  try {
    const existingUser = await connectToDB("findOne", req.body);
    if (existingUser && existingUser.password === password) {
      return res.status(200).send({ success: true, name: existingUser.name });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Email or password incorrect" });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// FORGOT PASSWORD
app.post("/forgot-password", async (req, res) => {
  const { email, origin } = req.body;
  try {
    const existingUser = await connectToDB("findOne", { email: email });
    if (existingUser) {
      await transporter.sendMail({
        from: `"Junior Forum" ${process.env.GOOGLE_ACCOUNT}`,
        to: email,
        subject: "Reset password link",
        html: `<p>Hi, ${existingUser.name},</p>
        <p>Here's your password recovery link</p>
        <a href=${origin}/reset-password/${existingUser._id}>Reset password here</a>
        <p>Best regards, Libertas</p>`,
      });
      return res.status(200).send({ success: true });
    } else {
      return res
        .status(300)
        .send({ success: false, message: "User with this email don't exist" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// RESET PASSWORD
app.post("/resetPassword", async (req, res) => {
  const { id, newPassword } = req.body;
  try {
    await connectToDB("updateById", { id: id, password: newPassword });
    res.status(200).send({ success: true, message: "Password update" });
  } catch (err) {
    res.status(500).send(err);
  }
});

// CREATE article
app.post("/createArticle", async (req, res) => {
  const { userEmail, articleTitle, articleText, articleDescription } = req.body;
  try {
    const { name } = await connectToDB("findOne", { email: userEmail });
    const data = await connectToDB("addArticle", {
      title: articleTitle,
      description: articleDescription,
      text: articleText,
      creator: name,
      creatorEmail: userEmail
    });
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/getArticles", async (req, res) => {
  try {
    const data = await connectToDB("findAllArticles");
    res.status(200).send({ success: true, data: data });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/getArticle/:id", async (req, res) => {
  try {
    const data = await connectToDB("findArticleById", { id: req.params.id });
    res.status(200).send(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/deleteArticle', async (req, res) => {
  const { id } = req.body;
  try{
    const data = await connectToDB('deleteArticle', {id: id});
    res.status(200).send(data);
  }
  catch(err){
    res.status(500).send(err);
  }
})

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
