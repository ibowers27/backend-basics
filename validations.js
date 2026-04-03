// create a new file called 'validations.js' in the same directory
// and put the following block of code

const Joi = require("joi");
// joi returns a class, and we use pascal naming conventions for a class
// hence, its called/named as Joi

//joi schema
const courseSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  enrollment: Joi.number().positive().required(),
});

const validateCourse = (userInput) => {
  return courseSchema.validate(userInput);
  // return the object returned by the validate function
  // (the validate function is defined in Joi)
};

module.exports = { validateCourse };