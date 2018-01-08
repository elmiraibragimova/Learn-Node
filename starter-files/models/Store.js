// интерфейс для работы с базой данных mongoDB
const mongoose = require('mongoose');

// то, как будет обрабатываться ответ от БД; есть рвзные способы (например,
// библиотека blueBird), но здесь будет испольоваться стандартый asinc/await ES6
mongoose.Promise = global.Promise;

// for url friendly names
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'
  },

  slug: String,

  description: {
    type: String,
    trim: true
  },

  tags: [String]
});


// this == current store we're trying to save
storeSchema.pre('save', function(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

// TODO make more resiliant so slugs are unique

module.exports = mongoose.model('Store', storeSchema);
