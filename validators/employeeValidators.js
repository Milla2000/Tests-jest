const joi = require("joi");

const loginValidation = joi.object({
  email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),

  password: joi.string().required(),

});

 const registerValidation = joi.object({
   // id: joi.string().required(),
   e_name: joi.string().min(5).required(),
   email: joi
     .string()
     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
     .required()
     .error(() => {
       return {
         message: "Email address is already in use",
       };
     }),
   password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
 });

// return schema.validate(data);
 
module.exports = {
  loginValidation,
    registerValidation,
};
