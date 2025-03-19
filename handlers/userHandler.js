const { User } = require('../db/user.js');

async function addUser(userModel) {
    let user = new User(userModel);

   
    await user.save();

  
    return user.toObject();
}

module.exports = { addUser };
