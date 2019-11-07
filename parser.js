const fs = require('fs');
const cheerio = require('cheerio');
const phantom = require('phantom');

const request = require('request');
const path = require('path');


/*(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });
    fs.readFile('src/assets/allBandInfo.json', 'utf8', function (err, data) {
        if (err) throw err;
        let bandData = JSON.parse(data);
        parseData(bandData);
    });
    async function parseData(data) {
        let resultArray = data.map(el => {
            return el.replace(/ /g, "-");
        });
        let allBands = [];
        console.log(resultArray);
        for (let i = 0; i < resultArray.length; i++) {
            let url = `https://web.archive.org/web/20121101062426/http://dark-world.ru/bands/${resultArray[i]}.php`;
            console.log(url);
            const status = await page.open(url);
            const content = await page.property('content');
            const $ = cheerio.load(content,  { decodeEntities: false });
            const bandInfo = $('.news_text').html();
            const genre = $('#bandDetails > tbody > tr:nth-child(2) > td:nth-child(2)').text();
            const country = $('#bandDetails > tbody > tr:nth-child(3) > td:nth-child(2)').text();
            const existence = $('#bandDetails > tbody > tr:nth-child(4) > td:nth-child(2)').text();
            let fullUrlImage;
            if ($('#leftColumn > .photoLink')[0] && $('#leftColumn > .photoLink')[0].attribs) {
                const url = 'http://web.archive.org';
                const image = $('#leftColumn > .photoLink')[0].attribs.href;
                fullUrlImage = url + image;
            }
            let users = [];
            $('.bandLineup').first().find('tr').each((i, el) => {
                let user = {
                    leftCol: $(el).find('td:nth-child(1)').text(),
                    rightCol: $(el).find('td:nth-child(2)').text(),
                };
                users.push(user);
            });
            let albums = [];
            $('.bandLineup:nth-of-type(2)').find('tr').each((i, el) => {
                let leftCol = $(el).find('td:nth-child(1)').text().replace(/\s+/g, " ");
                let rightCol = $(el).find('td:nth-child(2)').text().replace(/\s+/g, " ");
                let album = {
                    leftCol: leftCol.replace(/^\s|\s$/g, ""),
                    rightCol: rightCol.replace(/^\s|\s$/g, ""),
                };
                albums.push(album);
            });

            console.log(genre, 'test');
            let band = {
                serialNumber: i,
                name: data[i],
                info: bandInfo,
                country: country,
                genre: genre,
                existence: existence,
                users: users,
                albums: albums,
                logoUrlImage: fullUrlImage
            };
            allBands.push(band);
            let bandInfoJSON = JSON.stringify(allBands);
            fs.writeFile("src/assets/allBandInfo.json", bandInfoJSON, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log('saving');
        }

        await instance.exit();
    }
})();*/


/*(async function() {
    const directoryPath = path.join(__dirname, "../test");
    //passsing directoryPath and callback function
    fs.readdir(directoryPath, function(err, files) {
        console.log(directoryPath);
        //handling error
        if (err) {
            return console.log("Unable to scan directory: " + err);
        }
        //listing all files using forEach
        files.forEach(function(file) {
            // Do whatever you want to do with the file
            console.log(file);
            fileName = file.replace('.jpeg', '');
            Band.find({'name': fileName}, function (err, docs) {
                console.log(docs, 'test');
            })

        });
    });
})();*/
/*(async function() {
    let iteration = 0;
    await Band.find()
        .cursor()
        .eachAsync(async function(e) {
            const nameFile = file.replace(".jpeg", '');
            console.log(nameFile + '|' + e.name);
            if(file === e.name) {
                iteration++;
            }
            const band = new Band({
                _id: e._id,
                name: e.name.replace('|||', '')
            });

            Band.updateOne({ _id: e._id }, band).then(result => {
                /!*console.log(result);*!/
            });
        });
    console.log(iteration, 'iter');
})();*/



