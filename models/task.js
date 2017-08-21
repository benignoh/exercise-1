const tasks = require('../db/seeds').tasks;
const frozenAttrs = ['createdAt', 'updatedAt']
const buildFromProps = function(object, properties, allowNulls){
  allowNulls = allowNulls || false;
  let updatetableAttributes = this.attributes.map((i)=> i);

  if(allowNulls){
    frozenAttrs.forEach((attr)=>{
      updatetableAttributes.splice(updatetableAttributes.indexOf(attr),1);
    });
  }

  updatetableAttributes.forEach((attr)=>{
    if(properties[attr] !== undefined || allowNulls){
      object[attr] = properties[attr];
    }
  })
};

exports.Task = {
  attributes: ['done', 'date', 'text', 'createdAt', 'updatedAt'],
  new(properties){
    let newTask = {}, lastTask = tasks.slice(-1)[0];

    newTask.id = lastTask ? Number(lastTask.id || 0) + 1 : 1;

    if(properties){
      buildFromProps.call(this, newTask, properties);
    }

    newTask.save = function(){
      tasks.push(this);
      return this;
    }.bind(newTask);

    newTask.destroy = function(){
      try{
        let i;
        if((i = tasks.indexOf(this)) != -1){
          tasks.splice(i,1);
        } else {
          return false;
        }
      }catch(e){
        return false;
      }
      return true;
    }.bind(newTask);

    newTask.update = function(base, task){
      return function(properties, allowNulls){
        buildFromProps.call(base, this, properties, allowNulls);
        return this;
      }.bind(task);
    }(this, newTask);

    return newTask;
  },

  find(id){
    let results = tasks.filter((object)=>{
      return object.id == id;
    });
    return results[0];
  },

  create(properties){
    return this.new(properties).save();
  }
}
