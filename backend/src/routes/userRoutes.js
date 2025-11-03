const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  }
});

// Public routes
router.post('/login', userController.login);
router.post('/users', upload.single('avatar'), userController.createUser);

// Protected routes
router.get('/users', auth, userController.getUsers);
router.get('/profile', auth, userController.getProfile);
router.put('/users/:id', auth, upload.single('avatar'), userController.updateUser);
router.delete('/users/:id', auth, userController.deleteUser);
router.post('/users/import', auth, userController.fetchAndStoreUsers);

module.exports = router;