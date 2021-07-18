const express = require(`express`)
const router = express.Router()
const Controller = require(`../controllers/travelsControllers`)

router.get(`/travels`, Controller.getAllTravelsOrdered)
router.get(`/travels/:id`, Controller.getTravelById)

router.post(`/travels/:id/passager/create`, Controller.createPeople)
router.post('/travels/:id/driver/create', Controller.createNewDriver)

router.delete(`/passager/:id/delete`, Controller.deletePerson)
router.delete(`/travels/:id/delete`, Controller.deleteTravel)

module.exports = router