const router = require('express').Router();
const passport = require('passport');

// auth logout

router.get('/logout', (req, res) => {
  // handle passport here
  res.send('logging out');
});

// auth google

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile'],
  })
);

// callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.send('you reached the callback URI');
});

// auth facebook

router.get('/facebook', (req, res) => {
  // handle passport here
  res.send('logging in with facebook');
});

// auth github

router.get('/github', (req, res) => {
  // handle passport here
  res.send('logging in with github');
});

module.exports = router;
