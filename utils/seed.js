const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeedData, thoughtSeedData } = require('./seedData');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log("connected to db");

    // drop existing users and thoughts
    await User.deleteMany({});
    await Thought.deleteMany({});

    // create empty array to hold all user docs
    const users = [];

    // create users
    for (let i = 0; i < userSeedData.length; i++) {
        const user = await User.create(userSeedData[i]);
        users.push(user);
    }

    // create thoughts
    for (let i = 0; i < thoughtSeedData.length; i++) {
        const { username, _id } = users[Math.floor(Math.random() * users.length)];
        thoughtSeedData[i].username = username;
        thoughtSeedData[i].userId = _id;
        await Thought.create(thoughtSeedData[i]);
    }

    console.log("done seeding");
    process.exit(0);
    
})
