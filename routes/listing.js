const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync.js');
const { isLoggedIn, isOwner, validateListing } = require('../middleware.js');
const multer = require('multer');
const {storage} = require('../cloudConfig.js');
const upload = multer({storage});

const listingController = require('../controllers/listings.js');

//Index Route and  Create Route
router
    .route('/')
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(upload.single('listing[image][url]'), (req,res)=>{
        res.send(req.file);
    });

//NEW Route
router.get('/new',isLoggedIn, listingController.rederNewform);

//Show, Update and Destroy Routes
router
    .route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

//Edit Route
router.get('/:id/edit',isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;