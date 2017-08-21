const moment = require('moment');
const tasks = require('../db/seeds').tasks;
const Task = require('../models/task').Task;

const jwt = require('jsonwebtoken');
const secret = require('../lib/secrets').app;

function validToken(token) {
  try {
    return `${token}`.length > 0 && jwt.verify(token, secret, {
      algorithms: ['HS256']
    });
  } catch (err) {
    return false;
  }
}

function validHeaderToken(req) {
  let auth = req.get('Authorization') || '',
    token = auth.replace(/\s+/g, '').split('bearer').slice(-1)[0];
  return `${token}`.length > 0 && validToken(token);
}

exports.index = function(req, res) {
  let filteredTasks = tasks,
    queryKeys = Object.keys(req.query),
    today = moment().clone.bind(moment());

  if (queryKeys.length > 0) {
    filteredTasks = filteredTasks.filter((task) => {
      return queryKeys.map((key) => {
        console.log('key', key);
        let method;
        try {
          switch (key) {
            case 'past':
              method = (`${req.query.past}` == 'true') ? 'isBefore' : 'isAfter';
            case 'future':
              if(!method){
                method = (`${req.query.future}` == 'true') ? 'isAfter' : 'isBefore';
              }
              return moment(task.date)[method](today());
            case 'today':
              return moment(task.date).isBetween(today().startOf('day'), today().endOf('day'));
            case 'done':
              return `${task.done}` == `${req.query.done}`;
            default:
              return true;
          }
        } catch(e){
          return false;
        }
      }).every((i) => i);
    })
  }
  return res.json(filteredTasks);
}

exports.show = function(req, res) {
  if (!validHeaderToken(req)) return res.sendStatus(401);

  let task = Task.find(req.params.id);
  res.format({
    text: function() {
      res.send('This is not JSON, this is text');
    },

    html: function() {
      res.send('<p>No JSON here! <b>This is HTML</b></p>');
    },

    json: function() {
      res.send(task);
    }
  });
}

exports.create = function(req, res) {
  if (!validHeaderToken(req)) return res.sendStatus(401);
  return res.json(Task.new(req.body).save());
}

exports.update = function(req, res) {
  if (!validHeaderToken(req)) return res.sendStatus(401);

  if (!req.body || Object.keys(req.body).length == 0) return res.sendStatus(400);

  let task = Task.find(req.params.id);
  if (task) {
    console.log("req.method == 'PUT'", req.method == 'PUT');
    return res.json(task.update(req.body, req.method == 'PUT'));
  } else {
    return res.sendStatus(404);
  }
}

exports.destroy = function(req, res) {
  if (!validHeaderToken(req)) return res.sendStatus(401);

  let task = Task.find(req.params.id);
  if (task) {
    if (task.destroy()) {
      return res.sendStatus(200);
    } else {
      return res.sendStatus(422);
    }
  } else {
    return res.sendStatus(404);
  }
}
