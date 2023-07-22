const Joi = require("joi");

const schema = Joi.object({
   username: Joi.string().required(),
   message: Joi.string().required(),
   time: Joi.string().required(),
});

combineErrorMessages = (errors) => {
   return errors.map((error) => error.message).join(", ");
};

const validateMessage = (data) => {
   const { error } = schema.validate(data);
   if (error) {
      const errorMessage = combineErrorMessages(error.details);
      return errorMessage;
   }

   return null;
};

module.exports = validateMessage;
