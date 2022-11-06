/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////

// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { restaurant: { title: '', text: 'foo' } } -> { restaurant: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
const { populate } = require('../models/restaurant')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////

// instantiate a router (mini app that only handles routes)
const router = express.Router()

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

//* Index all
//* GET
router.get('/restaurants', (req, res, next) => {
    Restaurant.find()
        .populate('owner')
        .then(restaurants => {
            return restaurants.map(restaurant => restaurant)
        })
        .then(restaurants => {
            res.status(200).json({ restaurants: restaurants })
        })
        .catch(next)
})

//* Show
//* GET
router.get('/restaurants/:id', (req, res, next) => {
    Restaurant.findById(req.params.id)
        .populate('owner')
        
        .then(handle404)
        .then(restaurant => {
            res.status(200).json({ restaurant: restaurant })
        })
        .catch(next)
})

//* Create
//* POST
router.post('/restaurants', requireToken, (req, res, next) => {
    req.body.restaurant.owner = req.user.id

    req.body.isUserRestaurantOwner = req.body.isUserRestaurantOwner === 'on' ? true : false
    req.body.delivery = req.body.delivery === 'on' ? true : false
    req.body.reservations = req.body.reservations === 'on' ? true : false
    req.body.takeout = req.body.takeout === 'on' ? true : false
    req.body.catering = req.body.catering === 'on' ? true : false
    req.body.acceptsCreditCard = req.body.acceptsCreditCard === 'on' ? true : false
    req.body.parking = req.body.parking === 'on' ? true : false
    req.body.wifi = req.body.wifi === 'on' ? true : false
    req.body.masksRequired = req.body.masksRequired === 'on' ? true : false
    req.body.alcohol = req.body.alcohol === 'on' ? true : false
    req.body.vegan = req.body.vegan === 'on' ? true : false

    // on the front end, I HAVE to send a restaurant as the top level key
    Restaurant.create(req.body.restaurant)
    .then(restaurant => {
        res.status(201).json({ restaurant: restaurant })
    })
    .catch(next)
})

// Update
// PATCH 
router.patch('/restaurants/:id', requireToken, removeBlanks, (req, res, next) => {
    
    req.body.isUserRestaurantOwner = req.body.isUserRestaurantOwner === 'on' ? true : false
    req.body.delivery = req.body.delivery === 'on' ? true : false
    req.body.reservations = req.body.reservations === 'on' ? true : false
    req.body.takeout = req.body.takeout === 'on' ? true : false
    req.body.catering = req.body.catering === 'on' ? true : false
    req.body.acceptsCreditCard = req.body.acceptsCreditCard === 'on' ? true : false
    req.body.parking = req.body.parking === 'on' ? true : false
    req.body.wifi = req.body.wifi === 'on' ? true : false
    req.body.masksRequired = req.body.masksRequired === 'on' ? true : false
    req.body.alcohol = req.body.alcohol === 'on' ? true : false
    req.body.vegan = req.body.vegan === 'on' ? true : false
    
	// if the client attempts to change the `owner` property by including a new owner, prevent that by deleting that key/value pair
	delete req.body.restaurant.owner

	Restaurant.findById(req.params.id)
		.then(handle404)
		.then((restaurant) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, restaurant)

			// pass the result of Mongoose's `.update` to the next `.then`
			return restaurant.updateOne(req.body.restaurant)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// Delete
//* DESTROY
router.delete('/restaurants/:id', requireToken, (req, res, next) => {
	Restaurant.findById(req.params.id)
		.then(handle404)
		.then((restaurant) => {
			// throw an error if current user doesn't own `restaurant`
			requireOwnership(req, restaurant)
			// delete the restaurant ONLY IF the above didn't throw
			restaurant.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router