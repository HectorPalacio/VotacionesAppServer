const Band = require("./band");
const BandModel = require('../models/bandDB');

class Bands {
    constructor() {
        this.listBands = [];
    }

    addBand(band = new Band()) {
        const nuevaBanda = new BandModel({
            id: band.id,
            name: band.name,
            votes: band.votes
        });
        nuevaBanda.save();
    }

    // async getBandsBD() {
    //     var listaAux = [];
    //     var listaBandasBD = await BandModel.find();
    //     listaBandasBD.forEach(element => {
    //         var nuevaBanda = new Band();
    //         nuevaBanda.id = element['id'];
    //         nuevaBanda.name = element['name'];
    //         nuevaBanda.votes = element['votes'];
    //         listaAux.push(nuevaBanda);
    //     });
    //     return listaAux;
    // }

    getBands() {
        return this.listBands;
    }

    async deleteBand(id = ''){
        // await BandModel.findByIdAndDelete(id);
        this.listBands = this.getBands();
        this.listBands = this.listBands.filter(band => band.id !== id);
        return this.listBands;
    }

    voteBand(id = ''){
        this.listBands = this.listBands.map(band => {
            if(band.id === id){
                band.votes++;
                return band;
            }else{
                return band;
            }
        });
    }

}

module.exports = Bands;