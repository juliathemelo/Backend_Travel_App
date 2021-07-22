const express = require(`express`)
const router = express.Router()
const ControllerTravel = require(`../controllers/travelsControllers`)
const ControllerPassenger = require('../controllers/passagersController')

//TRAVEL
router.get(`/travels`, ControllerTravel.getAllTravelsOrdered)
router.get(`/travels/:id`, ControllerTravel.getTravelById)

router.post(`/travels/:id/passager/create`, ControllerTravel.createPeople)
router.post('/travels/:id/driver/create', ControllerTravel.createNewDriver)

router.delete(`/passager/:id/delete`, ControllerTravel.deletePerson)
router.delete(`/travels/:id/delete`, ControllerTravel.deleteTravel)

router.put(`/travels/:id`, ControllerTravel.editDriver)

//PASSENGER
router.get('/passenger', ControllerPassenger.getAllPassenger)

router.put('/passenger/:id', ControllerPassenger.replacePassenger)

module.exports = router