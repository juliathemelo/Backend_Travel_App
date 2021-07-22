const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils");
const passager = require("../models/passengers.json")

const fs = require('fs')

//pegando todas as viagens ordenadas pela capacidade
const getAllTravelsOrdered = (req, res) => {
    const filterTravel = travels.filter(quant => quant.busInfos.capacity > 0)
    const sortTravelCapacity = filterTravel.sort(function (a, b) {
	
        return (a.busInfos.capacity > b.busInfos.capacity) ? 1 : ((b.busInfos.capacity > a.busInfos.capacity) ? -1 : 0);
     
    });
    res.status(200).send(sortTravelCapacity)
};

const getTravelById = (req,res) => {
    let idRequest = req.params.id
  
    let filteredTravel = utils.findById(travels, idRequest)

    res.status(200).send(filteredTravel)
}

//adicionando passageiro na viagem
const createPeople = (req,res) => {
    let TravelIdRequest = req.params.id

    //let name = req.body.name
    //let email = req.body.email
    //let documentNumber = req.body.travelId

    let {name, email, documentNumber} = req.body

    let newPerson = {
        id: Math.random().toString(32).substr(2), 
        name, 
        email, 
        documentNumber
    }

    let travelRequire = utils.findById(travels,TravelIdRequest)

    travels.forEach((travel) => {
        let sameTravel = travel == travelRequire
        if(sameTravel){
            travel.passengersInfos.push(newPerson)
        }

    })

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
        if(err){
            res.status(500).send({
                "message": err
            })
        }else{
            res.status(201).send({
                "message": "Passageiro adicionado com sucesso", travelRequire
            })
        }
    })
}

// Deletar passageiro do sistema (o registro continua na viagem)
const deletePerson = (req,res) => {
    const requestId = req.params.id

    const filterId = utils.findById(passager, requestId)
    
    const index = passager.indexOf(filterId)

    if(index >= 0){
        passager.splice(index,1)

        fs.writeFile("./src/models/passangers.json", JSON.stringify(passager), 'utf8', (err) => {
            if(err){
                res.status(500).send({
                    "message": err
                })
            }else{
                res.status(201).send({
                    "message": "Passageiro excluido com sucesso", passager
                })
            }
        })
    }
}

//Criando um novo motorista
const createNewDriver = (req,res) => {
    let requestIdTravel = req.params.id
    let {name, license} = req.body

    const newDriver = {
        id: Math.random().toString(32).substr(2),
        name,
        license
    }

    let TravelFilter = utils.findById(travels,requestIdTravel)

    travels.forEach((travel) => {
        let sameTravel = travel == TravelFilter
        console.log(travel)
        if(sameTravel){
            travel.driverInfos = []
            travel.driverInfos.push(newDriver)
        }

    })

    fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
        if(err){
            res.status(500).send({
                "message": err
            })
        } else{
            res.status(201).send({
                "message": "Motorista adicionado com sucesso", TravelFilter
            })
        }
    })
}

const editDriver = (req,res) => {
    let requestIdTravel = req.params.id
    let {id, name, license} = req.body

    let TravelFilter = utils.findById(travels,requestIdTravel)

    const index = travels.indexOf(TravelFilter)

    const updateDriver = {
        id,
        name,
        license
    }

    if (index >= 0) {
        travels.splice(index,1,updateDriver)
        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', function(err){
            if (err) {
                res.status(500).send({message: err})
            } 
            else {
                res.status(200).json([{
                    "message": "Motorista substituido com sucesso",
                    updatePassenger
                }])
            }
        })
    } 
    else {
        res.status(404).send({message: "Motorista não encontrado"})
    }
}

const deleteTravel = (req,res) => {
    const requestId = req.params.id

    const filterId = utils.findById(travels, requestId)
    
    const index = travels.indexOf(filterId)

    if(index >= 0){
        travels.splice(index,1)

        fs.writeFile("./src/models/travels.json", JSON.stringify(travels), 'utf8', (err) => {
            if(err){
                res.status(500).send({
                    "message": err
                })
            }else{
                res.status(201).send({
                    "message": "Viagem excluido com sucesso", travels
                })
            }
        })
    }
}

module.exports = {
    getAllTravelsOrdered,
    getTravelById,
    createPeople,
    deletePerson,
    createNewDriver,
    deleteTravel,
    editDriver
}