const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


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

router.get('/other-users/:id', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true })
    res.render('user', {
        user,
        logged_in: true
      })
    

  } catch (err) {
    res.status(400).json(err);
  }
});


router.get('/new-post', withAuth, async (req, res) => {
  try {
    res.render('new-post', {
        logged_in: true
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});


router.get('/posts/:id', withAuth, async (req, res) => {
  try {
    const singlePost = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
        },
      ],
    });
    const commentData = await Comment.findAll({
      where: {
        user_id: req.session.user_id,
        post_id: req.params.id
      }, 
      include: [{
        model: User
      }]
    })
    const post = singlePost.get({ plain: true });
    const comments = commentData.map(comment => comment.get({plain: true}))
    console.log("comments", comments)
    res.render('singlepost', {
      ...post,
      comments,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {

    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(
      req.params.id
      );
      const user = userData.get({plain :true})
      res.render('user', {
        user,
        logged_in: true
      })

      res.status(200).json(userData);
  
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
