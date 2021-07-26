const mongoose = require('mongoose');
const Joi = require('joi');

const Customers = mongoose.model('Costumers', new mongoose.Schema( {
    isGold: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    }
}));

function validateConsumers(costumer) {
    const schema = {
        isGold: Joi.boolean().required(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().required()
    };

    return Joi.validate(costumer, schema);
  }

  exports.Customer = Customers;
  exports.validate = validateConsumers;