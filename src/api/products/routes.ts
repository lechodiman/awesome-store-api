import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'All',
  });
});

router.post('/', (req, res) => {
  res.json({
    message: 'Create',
  });
});

router.delete('/:productId', (req, res) => {
  res.json({
    message: 'Delete',
  });
});

router.put('/:productId', (req, res) => {
  res.json({
    message: 'Update',
  });
});

router.get('/:productId', (req, res) => {
  res.json({
    message: 'Read',
  });
});

export default router;
