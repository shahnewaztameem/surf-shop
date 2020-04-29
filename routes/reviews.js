const express = require('express');
const router = express.Router({mergeParams: true});

/* GET reviews index /posts/:id/reviews . */
router.get('/', (req, res, next) => {
  res.send('INDEX /reviews');
});

/* GET reviews new /posts/:id/reviews/new . */
// router.get('/new', (req, res, next) => {
//   res.send('NEW  /reviews/new');
// });

/* review reviews create /posts/:id/reviews. */
router.post('/', (req, res, next) => {
  res.send('CREATE /posts/:id/reviews');
});

/* GET reviews show /posts/:id/reviews/:review_id. */
router.get('/:review_id', (req, res, next) => {
  res.send('SHOW /reviews/:review_id');
});

/* GET reviews edit /posts/:id/reviews/:review_id/edit. */
router.get('/:review_id/edit', (req, res, next) => {
  res.send('EDIT /reviews/:review_id');
});

/* PUT reviews update /posts/:id/reviews/:review_id. */
router.put('/:review_id', (req, res, next) => {
  res.send('UPDATE /reviews/:review_id');
});

/* DELETE reviews destroy /posts/:id/reviews/:review_id. */
router.delete('/:review_id', (req, res, next) => {
  res.send('DELETE /reviews/:review_id');
});

module.exports = router;

