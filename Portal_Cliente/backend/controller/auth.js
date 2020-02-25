const User = require('../models/User')
const passport = require('passport')
const {confirmAccount}=require("../config/nodemailer")

exports.indexGet = (req, res, next) => res.render('index')



exports.logout = (req, res, next) => {
  req.logout()
  res.redirect('/')
}

const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let token = '';
for (let i = 0; i < 25; i++) {
  token += characters[Math.floor(Math.random() * characters.length )];
}

exports.signupGet = (req, res) => res.render('signup')

exports.signupPost = async (req,res,next) => {
  const { name:username,newemail:email, newpassword:password } = req.body

      let user = await User.register({ username, email, confirmationCode:token}, password)
      let endpoint=`https://floating-gorge-68224.herokuapp.com/confirmation/${token}`
      await confirmAccount(email,
      endpoint
    )
  res.redirect("/")
}
exports.menu = (req, res, next) => res.render('menu')

exports.confirmGet = async ( req, res, next)=> {
  const {confirmationCode} = req.params
  await User.findOneAndUpdate({confirmationCode}, { status: "Active"}, {new: true})
  res.render('confirmation')
}

exports.loginPost=(req,res)=>{
  res.redirect("/admin")
}

exports.adminGet=(req,res)=>{
  res.render("admin")
}