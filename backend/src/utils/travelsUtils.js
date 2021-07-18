const findById = (model, id) => {
    let filteredData = model.find(travel => travel.id == id)

    return filteredData
}

module.exports = {findById}