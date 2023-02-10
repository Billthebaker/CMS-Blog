const router = require('express').Router()
const { Blog, Comment, User } = require('../models');
const withAuth = require("../utils/auth");


router.get('/',async (req, res) => {
    const postData = await Post.findAll({include:[User]},{include: [Comment]})
    const posts = postData.map((post) => post.get({ plain: true }));

    
    res.render('homepage', { 
      posts, 
      logged_in: req.session.logged_in 
    });
})

router.get('/post/:id',async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {include:[User]})
  const posts = postData.get({ plain: true });

  res.render('post', { 
    posts, 
    logged_in: req.session.logged_in 
  });
})

router.get('/Blog/:id',async (req, res) => {
  const postData = await Post.findByPk(req.params.id, {include:[User]})
  const posts = post.get({ plain: true });

  res.render('viewpost', { 
    posts, 
    logged_in: req.session.logged_in 
  });
})

router.get('/profile', withAuth, async (req, res) => {
  const postData = await Post.findAll({where:{userId: req.session.userId}})
  const posts = postData.map((post) => post.get({ plain: true }));

  res.render('profile', { 
    posts, 
    logged_in: req.session.logged_in 
  });
})

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile')
    return;
  }
  res.render('login');
})

module.exports=router;