const router = require('express').Router();
const authRoutes = require('./auth');
const postsRoutes = require('./posts');
const profileRoutes = require('./profile');
const usersRoutes = require('./users');
const recipesRoutes = require('./recipes');

router.use('/auth', authRoutes);
router.use('/posts', postsRoutes);
router.use('/profile', profileRoutes);
router.use('/users', usersRoutes);
router.use('/recipes', recipesRoutes);

module.exports = router;
