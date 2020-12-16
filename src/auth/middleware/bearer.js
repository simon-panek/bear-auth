'use strict';

const users = require('../models/users.js')

module.exports = async (req, res, next) => {

  try {

   console.log('bearer middleware headers', req.headers);

    if (!req.headers.authorization) { next('Invalid Login') }

    const token = req.headers.authorization.split(' ').pop();

    console.log('bearer middleware token ', token);

    const validUser = await users.authenticateWithToken(token);

    req.user = validUser;

    console.log ('bearer middleware req.user ', req.user);
    
    req.token = validUser.token;

    console.log ('bearer middleware req.token ', req.user);
    
    next();

  } catch (e) {
    res.status(403).send('Invalid Login');;
  }
}