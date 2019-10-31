//this file writes json to schema Band
const Band = require('./backend/models/band');
const fs = require('fs');

fs.readFile('backend/models/allBandInfo.json', 'utf8', function (err, data) {
    if (err) throw err;
    let bandData = JSON.parse(data);

    async function processArray(array) {
        for (const item of bandData) {
            await saveSchemaData(item);
        }
    }
    processArray(bandData);

    function saveSchemaData(el) {
        console.log('saved');
        new Band({
            name: el.name,
            info: el.info,
            imagePath: '',
            genre: el.genre,
            existence: el.existence,
            country: el.country,
            users: el.users,
            albums: el.albums
        })
            .save()
            .catch(err => {
                console.log(err.message);
            });
    }

});
