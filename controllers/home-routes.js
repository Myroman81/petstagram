const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

// router.get('/profile', (req, res) => {
//   const userId = req.session.user_id;
//   User.findByPk(UserId, {
//     inslude: [{model: Post }],
//   })
//   .then((userData) => {
//     const user = userData.get({ plain: true });
//     res.render('profile', {user});
//   })
//   .catch((err) => {
//     console.log(err);
//     res.status(500).jsom(err);
//   });
// })


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/new-post', (req, res) => {
  res.render('new-post');
});


router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const post = singlePost.get({ plain: true });

    res.render('singlepost', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
