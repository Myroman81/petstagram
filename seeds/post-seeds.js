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
        user_id: 2,
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSujkITO7lWHVPdOpYcB5_toTF_cfF74vh2kbpqNyIZBKbxi3JE33fqqnET6Iam_0XGilE&usqp=CAU'
    },
    {
        title: 'Fish',
        body: 'Goldie',
        user_id: 3,
        imageUrl: 'https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/O6GXPIWN4A2XRD5WTQNTPOWYYY.jpg'
    },
    {
        title: 'Gecko',
        body: 'Lizard',
        user_id: 4,
        imageUrl: 'https://i.natgeofe.com/k/c02b35d2-bfd7-4ed9-aad4-8e25627cd481/komodo-dragon-head-on_3x2.jpg'
    },
    {
        title: 'Duck',
        body: 'Quack',
        user_id: 5,
        imageUrl: 'https://i.natgeofe.com/k/64fdb5a6-26b0-4883-aee5-0681503fa937/mallard-female-standing_4x3.jpg'
    }
];;

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts