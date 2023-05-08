// const validator = require('validator');
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
    },
    // validate: {
    //   validator: (value) => validator.isURL(
    //     value,
    //     { protocols: ['http', 'https'], require_protocol: true },
    //   ),
    //   message: 'Должен быть валидным URL',
    // },
  },
  trailerLink: {
    url: {
      type: String,
      required: true,
    },
  },
  thumbnail: {
    url: {
      type: String,
      required: true,
    },
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  movieId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
