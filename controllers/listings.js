const Listing = require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({}) ;
    res.render('listings/index.ejs',{allListings});
};

module.exports.rederNewform = (req,res)=>{
    res.render('listings/new.ejs');
};

module.exports.createListing = async(req,res,next)=>{
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
    })
    .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    let addListing = await newListing.save();
    console.log(addListing);
    req.flash('success','New Listing Created!');
    res.redirect('/listings');
};

module.exports.showListing = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(`${id}`).populate({ path : 'reviews', populate : { path : 'author'}}).populate('owner');
    if(!listing){
        req.flash('error','Listing you requested for does not exists');
        return res.redirect('/listings');
    }
    res.render('listings/show.ejs', {listing});
};

module.exports.renderEditForm = async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(`${id}`);
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace('/upload','/upload/w_250');
    if(!listing){
        req.flash('error','Listing you requested for does not exists');
        return res.redirect('/listings');
    }
    res.render('listings/edit.ejs', {listing,originalImageUrl});
};

module.exports.updateListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file != 'undefined'){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash('success','Listing Updated!');
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash('success','Listing Deleted!');
    res.redirect('/listings');
};

module.exports.showSearchByCountry = async(req,res)=>{
    let {country} = req.query;
    if(!country || country.trim() === ''){
        return res.redirect('/listings');
    }

    let countryListings = await Listing.find(
        {country: { $regex: new RegExp(`^${country.trim()}$`, 'i') }}
    );
    if(countryListings.length!=0){
        res.render('listings/searchByCountry.ejs',{countryListings});
    }else {
        req.flash('error','There are no listings avaliable for this country');
        res.redirect('/listings');
    }
};

module.exports.showCategoryListing = async(req,res)=>{
    let {name} = req.params;

    let categoryListings = await Listing.find({category: name});
    if(categoryListings.length != 0){
        res.render('listings/showCAtegory.ejs',{categoryListings});
    }else{
        req.flash('error','No such listings avaliable for this category');
        res.redirect('/listings');
    }
}