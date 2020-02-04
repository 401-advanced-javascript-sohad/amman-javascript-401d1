'use strict';

const mongoose = require('mongoose');//pg connective tissue between our app and db objest relation methoud


const URI = 'mongodb://localhost:27017/class-09'; //db name  // enviroment varble
mongoose.connect(URI); 

// Create 2 Schemas
const todoSchema = mongoose.Schema({
  //database blue prient
  task :{type:string }
  task: { type: String },
  assignee: { type: String }, //how owen this task
  complete: { type: Boolean }
}, { toObject: { virtuals: true }, toJSON: { virtuals: true } }); //what mongoose till you to do  when you want to make virsuail  (object or virsual oriented)
/1////////////////////////////////////////////////////////////////////////////////////////



//when we say assignee details on our to do schema we'ar referencing the people model  .... and what we;re doing is we're pulling the name field so that we have assignee name attached 


todoSchema.virtual('assigneeDetails', { // create connection btween when i have person have task ,name ,assignee..> that called from specific person (person schema)
  ref: 'people', //what spesific model whan to referance
  localField: 'assignee', // 
  foreignField: 'name',// pk ,fk
  justOne: true, //give me one response
});

////3///////////////////////////////////////////////////////////////////////
todoSchema.pre('find', join);
todoSchema.pre('findOne', join);







function join() {
  try {
    this.populate('assigneeDetails'); //this is where we assign a todo item to a specific person
  }
  catch (e) { console.log('Find Error', e); } //if we cant log an error
}

///4//////////////////////////////////////////////





const personSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String }, //regular expression 
});
//2/////////////////////////////////////////////////////////////////



// In Mongoose, we need to create classes out of the schemas
const Todo = mongoose.model('todos', todoSchema);//add s //blue prient is the schema
const Person = mongoose.model('people', personSchema); //people collection name

// --------------------------------------------

createRecords();

// Now, create an instance of a user and save it.

async function createRecords() {

  try {
    await new Person({ name: "john", email: "john@here.com" }).save();
    await new Person({ name: "cathy", email: "cathy@here.com" }).save();
    await new Todo({ task: "Clean Floor", assignee: "john", complete: false }).save();
    await new Todo({ task: "Shop", assignee: "john", complete: false }).save();
    await new Todo({ task: "Gas up the car", assignee: "cathy", complete: false }).save();
    let last = await new Todo({ task: "Study", assignee: "cathy", complete: false }).save();

    let records = await Todo.find({});
    console.log(records);

  } catch (e) { console.error(e); }

  disconnect();

}

function disconnect() {
  mongoose.disconnect();
}
