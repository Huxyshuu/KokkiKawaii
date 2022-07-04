const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const recipeSchema = new Schema({
    recipeId: { type: Number, required: true, unique: true},
    title: { type: String, require: true, trim: true, minlength: 3 },
    picture: { type: Buffer, contentType: String, require: true, unique: true},
    rating: { type: Number, require: true },
    servings: { type: Number, require: true },
    ingredients: { type: [String], require: true},
    time: { type: Number, require: true}, 
    instructions: { type: String, require: true},
    notes: { type: String, require: false},
}, {
    timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;