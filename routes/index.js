var express = require('express');
var router = express.Router();

Category = require('../models/Category');

//router address localhost:3000/
//descriptions: Index Page
//comments:
router.get('/', function(req, res, next) {
  res.render('index',{ layout: 'hero_layout' });
});

//router address localhost:3000/about
//descriptions: Test Page
//comments:for testing purpose
router.get('/about', function(req, res, next) {
  res.render('about', { layout: 'hero_layout' });
});

//router address localhost:3000/demo
//descriptions: Home Page
//comments: show all category
router.get('/demo', async (req, res, next)=> {
  try {
    const categories = await Category.find({});
    console.log(categories)
    res.render('demo/homepage', { categories : categories })
  }
  catch {
    res.redirect('/')
  }
});

//router address localhost:3000/demo
//descriptions: Register Demo Page
//comments: show register demo form
router.get('/newdemo', function(req, res, next) {
  res.render('demo/register', { category: new Category() });
});

//router address localhost:3000/demo
//descriptions: Obtain Registered Demo Information
//comments: get all required infromation
router.post('/newdemo', async (req, res, next)=> {
  const category = new Category ({
    category_name: req.body.category_name,
    type_name: req.body.type_name
  })
  try {  
        const newCategory = await category.save()
        res.redirect('/demo')
  } catch {
          res.render('/', {
          category: category,
          error: 'Error in Creating Author'
          })
  }
});


module.exports = router;
