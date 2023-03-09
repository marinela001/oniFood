const bcrypt = require('bcrypt');
import { User, UserModel } from '../models/User';

const handleNewUser = async (req: any, res: any) => {
  const user :User = req.body;
  console.log(user);
  if (!user.username || !user.password) return res.status(400).json({ message: 'Username and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await UserModel.findOne({ username: user.username }).exec();
  if (duplicate) return res.status(409).json({ message: 'Username already exists' }); //Conflict

  try {
    //encrypt the password
    user.password = await bcrypt.hash(user.password, 10);

    //create and store the new user
    const result = await UserModel.create(user);

    console.log({ result });

    res.status(201).json({ success: `New user ${user.username} created!` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
