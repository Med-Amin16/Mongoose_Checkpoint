const mongoose = require('mongoose')
const Person = require('./Model/person')
//connect with data base
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },(err)=>{
    err ? console.log(err) : console.log("database is connected")
});

var newPerson = new Person(
    {
        name: 'Katell',
        age:20,
        favoriteFoods:['sushi','shrips']
    }
);
newPerson.save(function(){
    console.log("person saved");
});

//Create records model.create()

let persons = [
    {
      name: "Nikol",
      age: 36,
      favoriteFoods: ["Burger"],
    },
    {
      name: "Mourad",
      age: 29,
      favoriteFoods: ["chawarma", "burritos"],
    },
    {
      name: "Marwen",
      age: 26,
      favoriteFoods: ["Chikenwings"],
    },
  ];
  Person.create(persons, function (err, data) {
    console.log(data);
  });
  
  //model.find() to Search Your Database
  
  Person.find({ name: "Nikol" }, function (err, data) {
    console.log(data);
  });
  
  //model.findOne() to Return a Single Matching Document from Your Database
  
  function searchByFood(search) {
    Person.findOne({ favoriteFoods: { $regex: search } }, function (err, docs) {
      console.log(docs);
    });
  }
  searchByFood("burritos");
  
  //model.findById() to Search Your Database By _id
  
  function findByPersonId(personId) {
    Person.findById(personId, function (err, docs) {
      console.log(docs);
    });
  }
  findByPersonId("62e5e2d85a8a179caf2a5a20");
  
  //Perform Classic Updates by Running Find, Edit, then Save
  
  function findPersonAndUpdate(personId) {
    Person.findById(personId, function (err, docs) {
      docs.favoriteFoods.push("hamburger");
      docs.save().then((doc) => {
        console.log(doc);
      });
    });
  }
  
  findPersonAndUpdate("662e5e2d85a8a179caf2a5a21");
  
  //Perform New Updates on a Document Using model.findOneAndUpdate()
  
  function findPersonAndUpdate(name) {
    Person.findOneAndUpdate(
      { name },
      { age: 49 },
      {
        new: true,
      }
    ).then((doc) => {
      console.log(doc);
    });
  }
  findPersonAndUpdate("Mourad");
  
  //Delete One Document Using model.findByIdAndRemove
  
  function findPersonAndRemove(personId) {
    Person.findByIdAndRemove(personId).then((doc) => {
      console.log(doc);
    });
  }
  findPersonAndRemove("62c3468526e16a554e5fabc2");
  
  //MongoDB and Mongoose - Delete Many Documents with model.remove()
  
  Person.remove({ name: "Marwen" }).then((data) => {
    console.log(data.deletedCount);
  });
  
  //Chain Search Query Helpers to Narrow Search Results
  
  function done(err, data) {
    console.log(data);
  }
  Person.find({ favoriteFoods: { $regex: "burritos" } })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(done);