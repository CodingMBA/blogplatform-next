/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

const shortId = require('shortid')
const User = require('../models/user')

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email already exists.',
      })
    }

    const { name, email, password } = req.body
    const username = shortId.generate()
    const profile = `${process.env.CLIENT_URL}/profile/${username}`

    const newUser = new User({ name, email, password, profile, username })
    newUser.save((err, success) => {
      if (err) {
        return res.status(400).json({
          error: err,
        })
      }
      // res.json({
      //   user: success,
      // })
      res.json({
        message: 'Signup successful. Please sign in.',
      })
    })
  })
}

exports.signin = (req, res) => {
  const { email, password } = req.body
  // check if user exists
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'No user with that email. Please sign up.',
      })
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Incorrect password',
      })
    }
    // generate a JWT with userID and secret; send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    })

    res.cookie('token', token, { expiresIn: '1d' })
    const { _id, username, name, role } = user
    return res.json({
      token,
      user: { _id, username, name, email, role },
    })
  })
}

exports.signout = (req, res) => {
  res.clearCookie('token')
  res.json({
    message: 'Signed out',
  })
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
})
