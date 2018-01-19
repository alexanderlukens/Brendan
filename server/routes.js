const express = require('express');
const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ storage: multer.memoryStorage()});


const test = require('../controllers/test.js')

router.post('/test', upload.single('file'), test.start)

module.exports = router;
