const fs = require('fs');
const cheerio = require('cheerio');
const phantom = require('phantom');
const path = require('path');

const request = require('http');

const req = request(
    {
        host: 'http://localhost:3000/',
        path: '/api/bands',
        method: 'GET',
    },
    response => {
        console.log(response.statusCode); // 200
    }
);

req.end();

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

/*(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  let bandsStr = "Abbath,Abigail Williams,Abigor,Abominator,Aborym,Absu,Absurd,Abruptum,Acheron,Admonish,Adorned Brood,Aes Dana,Aeternus,Agalloch,Agathodaimon,Ajattara,Akercocke,Alastis,Alcest,The Amenta,Amesoeurs,Amestigon,Anaal Nathrakh,Ancient,Ancient Rites,And Oceans,Angelcorpse,Angizia,Anorexia Nervosa,Antaeus,Antestor,Apostasy,Arallu,Archgoat,Arckanum,Arcturus,Arkhon Infaustus,Armagedda,Armageddon Holocaust,Arthemesia,Arvas,Asgaroth,Ásmegin,Asmodeus,Astarte,Astrofaes,Aura Noir,Aurora Borealis,Averse Sefira,Axis of Advance,The Axis of Perdition,Azaghal,B,Bahimiron,Bal  Sagoth,Baptism,Barathrum,Bathory,Behemoth,Beherit,Behexen,Belphegor,Bestial Mockery,Bestial Warlust,Bethlehem,Big Boss,Black Flame,Black Funeral,Black Messiah,Black Murder,Black Witchery,Blasphemy,Blood Tsunami,Bloodthorn,Blut Aus Nord,Borknagar,Botanist,Bulldozer,Burzum,C,Cadaveria,Carach Angren,Carpathian Forest,Carpe Tenebrum,Catamenia,Celestia,Celtic Frost,Ceremonial Castings,Chakal,Chthonic,Cirith Gorgor,Clandestine Blaze,Cobalt,Code,Cor Scorpii,Countess,Cradle of Filth,Craft,Crionics,Cruachan,Cultus Sanguine,D,Daemonarch,Dance Club Massacre,Dam,Dark Fortress,Dark Funeral,Darkspace,Darkthrone,Darkwoods My Betrothed,Dawn,Dawn of Azazel,Darzamat,Dawn of Relic,Deafheaven,Deathspell Omega,Death SS,December Wolves,Deinonychus,Demoncy,Demoniac,Den Saakaldte,Desaster,Destroy Destroy Destroy,Deströyer,Destruction,Devian,Devilish Impressions,Diaboli,Diabolical Masquerade,Diocletian,Dimmu Borgir,Dissection,Dødheimsgard,Dolorian,Dorn,Dornenreich,Dragonlord,Drastique,Drottnar,Drudkh,E,Eibon la Furies,Einherjer,Eisregen,Embraced,Emperor,Empyrium,Endstille,Enslaved,Enslavement of Beauty,Enthroned,Ephel Duath,Epoch of Unlight,Equilibrium,Estatic Fear,Ethereal Woods,Ewigkeit,F,Falkenbach,Faustcoven,Finntroll,Fimbulwinter,Fleurety,Forefather,Forest Stream,Forgotten Tomb,Frost Like Ashes,Frosthardr,Funeral Mist,The Funeral Pyre,G,Gaahlskagg,Gallhammer,Gates of Ishtar,Gehenna,Goatlord,Goatmoon,Goatwhore,God Dethroned,God Seed,Golden Dawn,Gorgoroth,Gospel of the Horns,Gramary,Grand Belial  s Key,Graveland,Graveworm,Grimfist,H,Hades Almighty,Handful of Hate,Hate,Hate Forest,Hecate,Hecate Enthroned,Helheim,Hellhammer,Helrunar,Hollenthon,Holocausto,Holy Blood,Horna,Horde,Horned Almighty,Hortus Animae,I,I,Ihsahn,Ildjarn,Immortal,Impaled Nazarene,Impiety,In Battle,In the Woods,Infernal,Infernum,Incantation,Inquinok,Inquisition,Inspell,Isengard,Iskra,J,Judas Iscariot,K,Kampfar,Katatonia,Keep of Kalessin,Kekal,Khold,King Diamond,Klabautamann,Koldbrann,Korovakill,The Kovenant,Krallice,Kreator,Krieg,Kvelertak,Kult ov A";
  let newArrayBands = bandsStr.split(',');
  let resultArray = newArrayBands.map(el => {
    return el.replace(/ /g,"-");
  });
  let allBands = [];
    console.log(resultArray);
   for (let i = 0; i < resultArray.length; i++) {
     let url = `https://web.archive.org/web/20121101062426/http://dark-world.ru/bands/${resultArray[i]}.php`;
     console.log(url);
     const status = await page.open(url);
     const content = await page.property('content');
     const $ = cheerio.load(content);

     const imgData = $('#leftColumn > a.photoLink').attr('href');
     if (imgData) {
       const newUrl = 'https://web.archive.org' + imgData;
       console.log(newUrl);

       var downloadImageToUrl = (url, filename, callback) => {

         var client = http;
         if (url.toString().indexOf("https") === 0){
           client = https;
         }

         client.request(url, function(response) {
           var data = new Stream();

           response.on('data', function(chunk) {
             data.push(chunk);
           });

           response.on('end', function() {
             fs.writeFileSync(filename, data.read());
           });
         }).end();
       };


       downloadImageToUrl(newUrl, 'backend/test.jpg')
       console.log('saving');
     }

   }


  await instance.exit();
})();*/

