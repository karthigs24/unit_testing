import { Router } from 'express';
import { storeUser, getUser, getAllUser, updateUser, deleteUser } from '../../controllers/UserController';

// import { storeUserValidator } from '../../validators/UserValidator';

const v1Routes = Router();

v1Routes.get('/', (req, res) => {
    res.send('API works...')
});
v1Routes.post('/user', storeUser);
v1Routes.get('/user/:username', getUser);
v1Routes.get('/users', getAllUser);
v1Routes.put('/user/:username', updateUser);
v1Routes.delete('/user/:username', deleteUser);


module.exports = v1Routes;