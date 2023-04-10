

const bcrypt = require('bcrypt');
import { User, UserModel } from '../models/User';
const jwt = require('jsonwebtoken');

const handleLogin = async (req: any, res: any) => {
  console.log( 'token: '+     process.env.ACCESS_TOKEN_SECRET )
  const user:User  = req.body;
  if (!user.email || !user.password) return res.status(400).json({ message: 'Username and password are required.' });
  const foundUser = await UserModel.findOne({ email: user.email }).exec();
  if (!foundUser) return res.status(401).json({ message: 'User not found' }); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(user.password, foundUser.password);
  if (match) {
    const accessToken = jwt.sign(
      {
        UserInfo: {
          username: foundUser.username,
          // roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log(result);
    // console.log(roles);

    // Creates Secure Cookie with refresh token
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });

    // Send authorization roles and access token to user
    res.json({ 
      email: foundUser.email,
      username: foundUser.username,
      address: foundUser.address,
      isAdmin: foundUser.isAdmin,
      accessToken });

  } else {
    res.status(401).json({ message: 'Incorrect password' });
    // res.sendStatus(401);
  }
};


module.exports = { handleLogin };
