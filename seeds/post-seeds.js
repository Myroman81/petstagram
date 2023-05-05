const { Post } = require('../models');

const postData = [
    {
        title: 'Dog',
        body: 'A Dog',
        user_id: 1,
        imageUrl: 'https://cdn.greenfieldpuppies.com/wp-content/uploads/2016/07/Pomsky-2-600x600.jpg'
    },
    {
        title: 'Cat',
        body: 'A Cat',
        user_id: 2
    },
    {
        title: 'Fish',
        body: 'Woof',
        user_id: 3
    },
    {
        title: 'Gecko',
        body: 'Meow',
        user_id: 4
    },
    {
        title: 'Duck',
        body: 'Quack',
        user_id: 5
    }
];;

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts