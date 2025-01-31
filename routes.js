module.exports = function(app) {

  //this is our Cat model
  var Cat = require('./cat')

  var randomCat = require("random-cat")
  var randomName = require("random-name")

  //home page: list al the cats
  app.get('/', function(req, res) {

    //find all the cats then render
    //catList passing it our found cats
    Cat.find({}, function(err, cats) {
      console.log(cats);
      res.render('catList.ejs',{cats:cats})
    });

  });

  //display (GET) the addCat page
  app.get('/addCat', function(req,res) {
    res.render("addCat.ejs")
  })

  app.get("/hack", async (req,res) => {
    for (let i = 0; i < 1000; i++) {
      await new Cat({
        name: randomName.first() + " " + randomName.middle() + " " + randomName.last(),
        age: Math.random() * 1000,
        breed: "cat",
        image: randomCat.get()
      }).save()
    }

    res.send()
  })

  //handle the submit (POST) on adding a cat
  app.post('/addCat', function(req,res) {

    //create and save our cat, just like creating an object
    var newCat = new Cat(req.body);
    newCat.save(function (err) {

      console.log("saved: " + newCat.name)

      //finding cats again and rendering page
      Cat.find({}, function(err, cats) {
        console.log(cats);
        res.render('catList.ejs',{cats:cats})
      });

    })

  })

}
