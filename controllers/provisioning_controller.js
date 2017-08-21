const jwt = require('jsonwebtoken');
const secret = require('../lib/secrets').app;

function validParams(body){
  let keys;
  try{
    keys = Object.keys(body);
  }catch(e){
    keys = []
  }
  return keys.includes('username') && keys.includes('password');
}

function validCredentials(username,password){
  return (username == 'developer@webappslab.io' && password == 'W3b#App5D3v');
}

exports.token = function(req, res) {
  if (!validParams(req.body)) return res.sendStatus(400);

  if (!validCredentials(req.body.username, req.body.password))
    return res.status(401).send('Bad username or password');

  let token = jwt.sign({ user: req.body.username }, secret);
  res.json({token: token});
}
