const router = require('express').Router();
let Recipe = require('../models/recipe.model');
let Binary = require('mongodb').Binary;

router.route('/').get((req, res) => {
    Recipe.find()
        .then(recipes => res.json(recipes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const picture = req.body.picture;
    const rating = Number(req.body.rating);
    const servings = Number(req.body.servings);
    const ingredients = req.body.ingredients;
    const time = Number(req.body.time);
    const instructions = req.body.instructions;
    const notes = req.body.notes;


    const newRecipe = new Recipe({
        title,
        picture,
        rating,
        servings,
        ingredients,
        time,
        instructions,
        notes
    });

    newRecipe.save()
        .then(() => res.json('Recipe added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => res.json(recipe))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Recipe.findByIdAndDelete(req.params.id)
        .then(() => res.json('Recipe deleted'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Recipe.findById(req.params.id)
        .then(recipe => {
            recipe.id = Number(req.body.id);
            recipe.title = req.body.title;
            recipe.picture = Buffer(req.body.picture)
            recipe.rating = Number(req.body.rating);
            recipe.servings = Number(req.body.servings);
            recipe.ingredients = req.body.ingredients;
            recipe.time = Number(req.body.time);
            recipe.instructions = req.body.instructions;
            recipe.notes = req.body.notes;

            recipe.save()
                .then(() => res.json('Recipe updated'))
                .catch(err => res.status(400).json('Error: ' + err)); 
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;