

import Joi from 'joi';

const storeUserSchema = Joi.object({
    username: Joi.string(),
    profile_picture: Joi.string(),
});

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next
 */
 export const storeUserValidator = (req, res, next) => {
    const { error, value } = storeUserSchema.validate(req.body);
    if (error == undefined) {
        // validation success
        next();
    } else {
        res.error(error, 'Validation failed', 400);
    }
}