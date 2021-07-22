const travels = require("../models/travels.json");
const utils = require("../utils/travelsUtils");
const passanger = require("../models/passengers.json")

const fs = require('fs')

const getAllPassenger = (req,res) => {
    res.status(200).send(passanger)
}

const replacePassenger = (req,res) => {
    const requestId = req.params.id
    const {
        name,
        email,
        documentNumber
    } = req.body

    let filterPassenger = utils.findById(passanger, requestId)

    const index = passanger.indexOf(filterPassenger)

    let updatePassenger = {
        id: requestId,
        name,
        email,
        documentNumber
    }

    if (index >= 0) {
        passanger.splice(index,1,updatePassenger)
        fs.writeFile("./src/models/passengers.json", JSON.stringify(passanger), 'utf8', function(err){
            if (err) {
                res.status(500).send({message: err})
            } 
            else {
                res.status(200).json([{
                    "message": "Passageiro substituido com sucesso",
                    updatePassenger
                }])
            }
        })
    } 
    else {
        res.status(404).send({message: "Passageiro não encontrado"})
    }
}

module.exports = {getAllPassenger, replacePassenger}