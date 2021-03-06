const {createHash, compareHash, createRandom32String} = require('../hashUtil')
const {setSession, getSession, deleteSession} = require('../../database/models/session')
const {getUser} = require('../../database/models/users')

const createSession = async (req, res) => {
  const {username} = req.body;
  const cookie = createRandom32String();
  const sessionHash = createHash(cookie);
  const sessionId = await setSession(username, sessionHash);
  res.cookie('_hh4DcT', cookie, {expire: 360000 + Date.now()});
  const data = res.locals.user;
  console.log('session created');
  return res.send(data);
}

const verifySession = async ( req, res, next) => {
  try {
    if (!req.cookies['_hh4DcT']) {
      return res.redirect(401, '/');
    }
    const sessionCookie = req.cookies['_hh4DcT'];
    const hashedSession = createHash(sessionCookie);
    const storedSessionData = await getSession(hashedSession)
    if (storedSessionData) {
      req.body.user_id = storedSessionData.user_id;
      next();
    } else {
      console.error('verifySession middleware: session does not exist in DB');
      res.redirect(403, '/');
    }
  } catch (error) {
    console.error('error in verifySession catch: ', error);
  }
};

const verifyAdmin = async (req, res, next) => {
  const userId = req.body.user_id;
  const user = await getUser(userId)
  if (user.admin) {
    return next();
  } else {
    console.error('verifyAdmin middleware: user is not Admin');
    return res.send(403, 'access denied');
  }
};

const removeSession = async (req, res, next) => {
  const userId = req.body.user_id;
  const deleteResult = await deleteSession(userId);
  next();
};

module.exports = {createSession, verifySession, verifyAdmin, removeSession}