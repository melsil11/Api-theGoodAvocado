///////////////////////////////////////
// Import Dependencies
///////////////////////////////////////
const mongoose = require('mongoose')
const Restaurant = require('./restaurant')

///////////////////////////////////////
// Seed Script code
/////////////////////////////////////
const db = require('../../config/db')

const startRestaurants = [
    { name: 'The Capital Grille', address: '1450 Larimer St, Denver, CO 80202', telephone: '303-539-2500', type: 'American', otherTypes: 'Steakhouse', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Tacos Tequila Whiskey', address: '1514 York St, Denver, CO 80206-1425', telephone: '720-475-1337', type: 'Mexican', otherTypes: 'Bar', delivery: false, reservations: true, takeout: true, catering: false, acceptsCreditCard: true, parking: true, wifi: true, masksRequired: false, alcohol: true, vegan: true  },
    { name: 'True Food Kitchen', address: '2800 E 2nd Ave Unit 101, Denver, CO 80206-4914', telephone: '720-509-7661', type: 'American', otherTypes: 'Healthy', delivery: false, reservations: true, takeout: true, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Ocean Prime',  address: '1465 Larimer St, Denver, CO 80202', telephone: '303-825-3663', type: 'Seafood', otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: true, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'North Street Grille', address: '229 North St, Boston, MA 02113-2105', telephone: '617-720-2010', type: 'American', otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Eataly', address: '800 Boylston Street Prudential Center, Boston, MA 02199', telephone: '617-807-7300', type: 'Italian', otherTypes: 'Shopping', delivery: false, reservations: true, takeout: true, catering: true, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Sweetgreen',  address: '659 Boylston St, Boston, MA 02116', telephone: '617-936-3464', type: 'American', otherTypes: 'bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Cafe Bonjour',  address: '55 Temple Pl, Boston, MA 02111-1300', telephone: '617-779-0062', type: 'American', otherTypes: 'Cafe, Healthy', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: false, vegan: true },
    { name: 'Boston Sail Loft Restaurant', address: '80 Atlantic Ave, Boston, MA 02110-3614', telephone: '617-227-7280', type: 'American', otherTypes: 'Bar, Seafood ', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: true, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Olio e Più',  address: '3 Greenwich Ave, New York City, NY 10014', telephone: '212-243-6546', type: 'Italian', otherTypes: 'Pizza, Neopolitan', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'The Consulate',  address: '519 Columbus Ave, New York City, NY 10024-3402', telephone: '646-781-9288', type: 'French', otherTypes: 'Bar', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Boucherie Union Square', address: '225 Park Avenue South, New York City, NY 10003-1604', telephone: '212-353-0200', type: 'French', otherTypes: 'Steakhouse', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Em Vietnamese Bistro', address: '57 Front St, Brooklyn, NY 11201-1237', telephone: '718-875-7888', type: 'Seafood', otherTypes: 'Vietnamese, Asian', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Shin',  address: '1655 N La Brea Ave Corner of Hollywood Blvd and La Brea Ave, Los Angeles, CA 90028', telephone: '323-874-4692', type: 'Japanese', otherTypes: 'Sushi,', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Raffaello Ristorante',  address: '400 S Pacific Ave, Los Angeles, CA 90731-2626', telephone: '310-514-0900', type: 'Italian', otherTypes: 'Vegetarian Friendly options, Gluten Free Options', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: true, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Langers', address: '704 S Alvarado St, Los Angeles, CA 90057-4020', telephone: '213-483-8050', type: 'American', otherTypes: 'Deli, Dinner', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: true, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Causeway Restaurant', address: '78 Essex Ave, Gloucester, MA 01930-4930', telephone: '978-281-5256', type: 'American',otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Seaport Grill', address: '6 Rowe Sq, Gloucester, MA 01930-3057', telephone: '978-282-9799', type: 'Seafood', otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Azorean Restaurant and Bar', address: ' 133 Washington St, Gloucester, MA 01930-2652', telephone: '978-283-5500', type: 'Portuguese', otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true },
    { name: 'Captain Hooks', address: '406 Washington St, Gloucester, MA', telephone: '978-282-4665', type: 'Italian', otherTypes: 'Bar', delivery: true, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true},
    { name: 'Tacos Lupita',  address: '63 Washington St, Gloucester, MA 01930-3532', telephone: '978-282-9600', type: 'Mexican', otherTypes: 'Bar', delivery: false, reservations: true, takeout: false, catering: false, acceptsCreditCard: true, parking: false, wifi: true, masksRequired: false, alcohol: true, vegan: true}

]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        Restaurant.deleteMany({ owner: null })
            .then(deletedRestaurants => {
                console.log('the deleted', deletedRestaurants)

                Restaurant.create(startRestaurants)
                    .then(newRestaurants => {
                        console.log('the new', newRestaurants)
                        mongoose.connection.close()
                    })
                    .catch(error => {
                        console.log(error)
                        mongoose.connection.close()
                    })
            })
            .catch(error => {
                console.log(error)
                mongoose.connection.close()
            })
    })
    .catch(error => {
        console.log(error)
        mongoose.connection.close()
    })