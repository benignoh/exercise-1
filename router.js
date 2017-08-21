const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

// app.use(jsonParser);
// app.use(urlencodedParser);

const tasksController = require('./controllers/tasks_controller');
app.get('/api/tasks', tasksController.index);
app.post('/api/tasks', tasksController.create);
app.get('/api/tasks/:id', tasksController.show);
app.put('/api/tasks/:id', jsonParser, tasksController.update);
app.patch('/api/tasks/:id', jsonParser, tasksController.update);
app.delete('/api/tasks/:id', tasksController.destroy);

const provisioningController = require('./controllers/provisioning_controller');
app.post('/api/auth/token', urlencodedParser, provisioningController.token);

const imagesController = require('./controllers/images_controller');
app.post('/api/images', upload.single('image'), imagesController.create);
app.get('/api/images/:id', imagesController.show);

exports.createServer = function() {
  app.listen(port, () => {
    console.log('Server started! At http://localhost:' + port);
  });
};
