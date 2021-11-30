import { User } from "../schemas/UserSchema";

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const storeUser = (req, res) => {
    const user = new User(req.body);
    user.save((error, result) => {
        if (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                // Duplicate username
                return res.status(500).send({ success: false, message: 'User already exist!' });
            }
            res.error(error);
        } else {
            res.success(result);
        }
    })
}


/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */
export const getUser = async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.success(user);
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

export const getAllUser = async (req, res) => {
    const users = await User.find({});
    res.success(users);
}

/**
 * 
 * @param {Object} req 
 * @param {Object} res 
 */

export const updateUser = async (req, res) => {
    const user = await User.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, { new: true });
    if (user) {
        res.success(user)
    }
    else {
        res.error()
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findOneAndDelete({ username: req.params.username });
    if (user) {
        res.success(user)
    }
    else {
        res.error()
    }
}