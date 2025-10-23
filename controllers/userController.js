const User = require("../models/User");
const passport = require("passport");
const bcrypt = require("bcryptjs");

exports.getLoginUser = (req, res) => {
  res.render("login", {
    headTitle: "ورود",
    message: req.flash("success_msg"),
    errors: []
  });
};

exports.handleLoginUser = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/user/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

exports.getRegisterUser = (req, res) => {
  res.render("register", { headTitle: "ثبت نام", errors: [] });
};

//* create new user
exports.handleRegisterUser = async (req, res) => {
  try {
    await User.validateUser(req.body);

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.render("register", {
        headTitle: "ثبت نام",
        errors: ["این ایمیل قبلاً ثبت نام شده است"],
      });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({
      username: req.body.username,
    });
    if (existingUsername) {
      return res.render("register", {
        headTitle: "ثبت نام",
        errors: ["این نام کاربری قبلاً ثبت نام شده است"],
      });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({ ...req.body, password: hashedPassword });
    req.flash("success_msg", "ثبت نام با موفقیت انجام شد.");
    // If validation passes, create the user
    res.redirect("/login");
  } catch (err) {
    //  console.log(err.errors);
    res.render("register", {
      headTitle: "ثبت نام",
      errors: err.errors,
      // userData: req.body
    });
  }
};
