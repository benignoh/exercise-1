const moment = require('moment'), now = moment().clone.bind(moment());
const tasksDB = [];
exports.tasks = tasksDB;

const Task = require('../models/task').Task;

Task.create({
  id: 1,
  done: true,
  date: now().add(7, 'days'),
  text: 'Buy milk',
  createdAt: now(),
  updatedAt: now(),
})

Task.create({
  id: 2,
  done: false,
  date: now(),
  text: 'Go to laundry',
  createdAt: now().subtract(7, 'days'),
  updatedAt: now().subtract(7, 'days'),
})

Task.create({
  id: 3,
  done: true,
  date: now().subtract(1, 'days'),
  text: 'Check tires levels',
  createdAt: now().subtract(2, 'days'),
  updatedAt: now().subtract(2, 'days'),
})

Task.create({
  id: 4,
  done: false,
  date: now().add(3, 'days'),
  text: 'Check flights information',
  createdAt: now().subtract(8, 'days'),
  updatedAt: now().subtract(7, 'days'),
})

Task.create({
  id: 5,
  done: true,
  date: now().add(1, 'weeks'),
  text: 'Call Mrs. X to arrenge meeting',
  createdAt: now().subtract(3, 'days'),
  updatedAt: now().subtract(2, 'days'),
})

Task.create({
  id: 6,
  done: false,
  date: now().add(3, 'days'),
  text: 'Prepare presentation',
  createdAt: now().subtract(4, 'days'),
  updatedAt: now().subtract(2, 'days'),
})
