const fs = require('fs');
const cheerio = require('cheerio');
const phantom = require('phantom');

const request = require('request');
const path = require('path');





/*
var download = async function (uri, filename, callback) {
    await request.head(uri, function (err, res, body) {
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};

(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });
    fs.readFile('src/assets/black-metal.json', 'utf8', function (err, data) {
        if (err) throw err;
        let bandData = JSON.parse(data);
        parseData(bandData);
    });

    async function parseData(data) {
        for (let i = 0; i < data.length; i++) {
            let url = `https://www.metal-archives.com/bands/${data[i]}`;
            const status = await page.open(url);
            const content = await page.property('content');
            const $ = cheerio.load(content, {decodeEntities: false});
            if ($('#photo') && $('#photo')[0]) {
                const imageUrl = $('#photo')[0].attribs.href;
                download(imageUrl, `src/assets/images/${data[i]}.jpeg`, function () {
                    console.log('done');
                });
            } else {
                console.log("we don't have this band!")
            }
        }
        await instance.exit();
    }
})();
*/
