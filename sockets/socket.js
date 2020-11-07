const { io } = require('../index');
const Band = require('../models/band');
const BandModel = require('../models/bandDB');
var listaBD;

// Mensajes de Sockets
io.on('connection', async client => {
    console.log('Cliente conectado');
    listaBD = await BandModel.find().then(
        client.emit('active-bands', listaBD)
    );

    client.on('vote-band', async (payload) => {
        listaBD = await listaBD.map(async band => {
            if(band['id'] === payload.id){
                band['votes']++;
                await BandModel.findByIdAndUpdate(band['_id'], {votes: band['votes']}).then(
                    listaBD = await BandModel.find().then(
                        io.emit('active-bands', listaBD)
                    ),
                );
            }
        });
    });

    client.on('delete-band', async (payload) => {
        listaBD = await listaBD.map(async band => {
            if(band['id'] === payload.id){
                await BandModel.findByIdAndDelete(band['_id']).then(
                    listaBD = await BandModel.find().then(
                        io.emit('active-bands', listaBD)
                    ),
                );
            }
        });
    });

    client.on('add-band', async (payload) => {
        const newBand = new Band(payload.name);
        const nuevaBandaBD = new BandModel({
            id: newBand.id,
            name: newBand.name,
            votes: newBand.votes
        });
        nuevaBandaBD.save().then(
            listaBD = BandModel.find().then(
                io.emit('active-bands', listaBD),
            )
        );
    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});
