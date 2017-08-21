const moment = require('moment');
const fs = require('fs');
const path = require('path');

exports.create = function(req, res) {
  let id = require('secure-random-string')(), newPath = `${__dirname}/uploads/${id}`;
  fs.writeFile(newPath, req.file.buffer, function (err) {
    res.json({
      id: id,
      name: req.body.name
    })
  });
}

exports.show = function(req, res) {
  let pathName = path.resolve(__dirname, `./uploads/${req.params.id}`);
  return res.sendFile(`uploads/${req.params.id}`, {root: __dirname});
}
