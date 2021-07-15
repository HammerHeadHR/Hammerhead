const {createHash, compareHash} = require('../hashUtil')
const {getUserId, setSession, getSession} = require('../../database/models/session')

const createSession = async ( req, res, next) => {
  const {username} = req.body
  const session = req.cookies.session
  const hash = createHash(session)
  setSession(username, hash)
  req.session = hash
  console.log(res.locals.user);
  const data = res.locals.user
  res.send(data);
  res.end()
  console.log('create session log after res.end')
  // next()
}

const verifySession = async ( req, res, next) => {
  const session = req.cookies.session
  console.log(session)
  const attempted = createHash(session)
  const storedSessionData = await getSession(attempted)
  console.log(storedSessionData)
  // const hash = compareHash(session, storedHash)
  // const userId = await getUserId(hash)
  next()
}

module.exports = {createSession, verifySession}