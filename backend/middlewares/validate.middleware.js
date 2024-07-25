const { validationResult } = require('express-validator');
const { BadRequest } = require('http-errors');

function validate(validators) {
  return [
    ...validators,
    (req, res, next) => {
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
      throw new BadRequest({ errors: errors.array() });
    },
  ];
}

module.exports = validate;
