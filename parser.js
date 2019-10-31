
const http = require('http');
const https = require('https');
var Stream = require('stream').Transform;
const fs = require('fs');
const cheerio = require('cheerio');
const phantom = require('phantom');

const request = require('request');


var download = async function(uri, filename, callback){
     await request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);

        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
};


/*(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });

    let bandsStr = "Abbath, Abigail Williams,Abigor,Abominator,Aborym,Absu,Absurd,Abruptum,Acheron,Admonish,Adorned Brood,Aes Dana,Aeternus,Agalloch,Agathodaimon,Ajattara,Akercocke,Alastis,Alcest,The Amenta,Amesoeurs,Amestigon,Anaal Nathrakh,Ancient,Ancient Rites,And Oceans,Angelcorpse,Angizia,Anorexia Nervosa,Antaeus,Antestor,Apostasy,Arallu,Archgoat,Arckanum,Arcturus,Arkhon Infaustus,Armagedda,Armageddon Holocaust,Arthemesia,Arvas,Asgaroth,Ásmegin,Asmodeus,Astarte,Astrofaes,Aura Noir,Aurora Borealis,Averse Sefira,Axis of Advance,The Axis of Perdition,Azaghal,B,Bahimiron,Bal  Sagoth,Baptism,Barathrum,Bathory,Behemoth,Beherit,Behexen,Belphegor,Bestial Mockery,Bestial Warlust,Bethlehem,Big Boss,Black Flame,Black Funeral,Black Messiah,Black Murder,Black Witchery,Blasphemy,Blood Tsunami,Bloodthorn,Blut Aus Nord,Borknagar,Botanist,Bulldozer,Burzum,C,Cadaveria,Carach Angren,Carpathian Forest,Carpe Tenebrum,Catamenia,Celestia,Celtic Frost,Ceremonial Castings,Chakal,Chthonic,Cirith Gorgor,Clandestine Blaze,Cobalt,Code,Cor Scorpii,Countess,Cradle of Filth,Craft,Crionics,Cruachan,Cultus Sanguine,D,Daemonarch,Dance Club Massacre,Dam,Dark Fortress,Dark Funeral,Darkspace,Darkthrone,Darkwoods My Betrothed,Dawn,Dawn of Azazel,Darzamat,Dawn of Relic,Deafheaven,Deathspell Omega,Death SS,December Wolves,Deinonychus,Demoncy,Demoniac,Den Saakaldte,Desaster,Destroy Destroy Destroy,Deströyer,Destruction,Devian,Devilish Impressions,Diaboli,Diabolical Masquerade,Diocletian,Dimmu Borgir,Dissection,Dødheimsgard,Dolorian,Dorn,Dornenreich,Dragonlord,Drastique,Drottnar,Drudkh,E,Eibon la Furies,Einherjer,Eisregen,Embraced,Emperor,Empyrium,Endstille,Enslaved,Enslavement of Beauty,Enthroned,Ephel Duath,Epoch of Unlight,Equilibrium,Estatic Fear,Ethereal Woods,Ewigkeit,F,Falkenbach,Faustcoven,Finntroll,Fimbulwinter,Fleurety,Forefather,Forest Stream,Forgotten Tomb,Frost Like Ashes,Frosthardr,Funeral Mist,The Funeral Pyre,G,Gaahlskagg,Gallhammer,Gates of Ishtar,Gehenna,Goatlord,Goatmoon,Goatwhore,God Dethroned,God Seed,Golden Dawn,Gorgoroth,Gospel of the Horns,Gramary,Grand Belial  s Key,Graveland,Graveworm,Grimfist,H,Hades Almighty,Handful of Hate,Hate,Hate Forest,Hecate,Hecate Enthroned,Helheim,Hellhammer,Helrunar,Hollenthon,Holocausto,Holy Blood,Horna,Horde,Horned Almighty,Hortus Animae,I,I,Ihsahn,Ildjarn,Immortal,Impaled Nazarene,Impiety,In Battle,In the Woods,Infernal,Infernum,Incantation,Inquinok,Inquisition,Inspell,Isengard,Iskra,J,Judas Iscariot,K,Kampfar,Katatonia,Keep of Kalessin,Kekal,Khold,King Diamond,Klabautamann,Koldbrann,Korovakill,The Kovenant,Krallice,Kreator,Krieg,Kvelertak,Kult ov A";
    let newArrayBands = bandsStr.split(',');
    let resultArray = newArrayBands.map(el => {
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
            let album = {
                leftCol: $(el).find('td:nth-child(1)').text(),
                rightCol: $(el).find('td:nth-child(2)').text(),
            };
            albums.push(album);
        });

        console.log(genre, 'test');
        let band = {
            name: resultArray[i],
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
        fs.writeFile("backend/models/allBandInfo.json", bandInfoJSON, function (err) {
            if (err) {
                console.log(err);
            }
        });
        console.log('saving');
    }


    await instance.exit();
})();*/


(async function () {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function (requestData) {
        console.info('Requesting', requestData.url);
    });

    let bandsStr = "Abbath, Abigail Williams,Abigor,Abominator,Aborym,Absu,Absurd,Abruptum,Acheron,Admonish,Adorned Brood,Aes Dana,Aeternus,Agalloch,Agathodaimon,Ajattara,Akercocke,Alastis,Alcest,The Amenta,Amesoeurs,Amestigon,Anaal Nathrakh,Ancient,Ancient Rites,And Oceans,Angelcorpse,Angizia,Anorexia Nervosa,Antaeus,Antestor,Apostasy,Arallu,Archgoat,Arckanum,Arcturus,Arkhon Infaustus,Armagedda,Armageddon Holocaust,Arthemesia,Arvas,Asgaroth,Ásmegin,Asmodeus,Astarte,Astrofaes,Aura Noir,Aurora Borealis,Averse Sefira,Axis of Advance,The Axis of Perdition,Azaghal,B,Bahimiron,Bal  Sagoth,Baptism,Barathrum,Bathory,Behemoth,Beherit,Behexen,Belphegor,Bestial Mockery,Bestial Warlust,Bethlehem,Big Boss,Black Flame,Black Funeral,Black Messiah,Black Murder,Black Witchery,Blasphemy,Blood Tsunami,Bloodthorn,Blut Aus Nord,Borknagar,Botanist,Bulldozer,Burzum,C,Cadaveria,Carach Angren,Carpathian Forest,Carpe Tenebrum,Catamenia,Celestia,Celtic Frost,Ceremonial Castings,Chakal,Chthonic,Cirith Gorgor,Clandestine Blaze,Cobalt,Code,Cor Scorpii,Countess,Cradle of Filth,Craft,Crionics,Cruachan,Cultus Sanguine,D,Daemonarch,Dance Club Massacre,Dam,Dark Fortress,Dark Funeral,Darkspace,Darkthrone,Darkwoods My Betrothed,Dawn,Dawn of Azazel,Darzamat,Dawn of Relic,Deafheaven,Deathspell Omega,Death SS,December Wolves,Deinonychus,Demoncy,Demoniac,Den Saakaldte,Desaster,Destroy Destroy Destroy,Deströyer,Destruction,Devian,Devilish Impressions,Diaboli,Diabolical Masquerade,Diocletian,Dimmu Borgir,Dissection,Dødheimsgard,Dolorian,Dorn,Dornenreich,Dragonlord,Drastique,Drottnar,Drudkh,E,Eibon la Furies,Einherjer,Eisregen,Embraced,Emperor,Empyrium,Endstille,Enslaved,Enslavement of Beauty,Enthroned,Ephel Duath,Epoch of Unlight,Equilibrium,Estatic Fear,Ethereal Woods,Ewigkeit,F,Falkenbach,Faustcoven,Finntroll,Fimbulwinter,Fleurety,Forefather,Forest Stream,Forgotten Tomb,Frost Like Ashes,Frosthardr,Funeral Mist,The Funeral Pyre,G,Gaahlskagg,Gallhammer,Gates of Ishtar,Gehenna,Goatlord,Goatmoon,Goatwhore,God Dethroned,God Seed,Golden Dawn,Gorgoroth,Gospel of the Horns,Gramary,Grand Belial  s Key,Graveland,Graveworm,Grimfist,H,Hades Almighty,Handful of Hate,Hate,Hate Forest,Hecate,Hecate Enthroned,Helheim,Hellhammer,Helrunar,Hollenthon,Holocausto,Holy Blood,Horna,Horde,Horned Almighty,Hortus Animae,I,I,Ihsahn,Ildjarn,Immortal,Impaled Nazarene,Impiety,In Battle,In the Woods,Infernal,Infernum,Incantation,Inquinok,Inquisition,Inspell,Isengard,Iskra,J,Judas Iscariot,K,Kampfar,Katatonia,Keep of Kalessin,Kekal,Khold,King Diamond,Klabautamann,Koldbrann,Korovakill,The Kovenant,Krallice,Kreator,Krieg,Kvelertak,Kult ov A";
    let resultArray = bandsStr.split(',');
    for (let i = 0; i < resultArray.length; i++) {
        let url = `https://www.metal-archives.com/bands/${resultArray[i]}`;
        const status = await page.open(url);
        const content = await page.property('content');
        const $ = cheerio.load(content,  { decodeEntities: false });
        if ($('#photo') && $('#photo')[0]) {
            const imageUrl = $('#photo')[0].attribs.href;
            download(imageUrl, `backend/test/${resultArray[i]}.jpeg`, function(){
                console.log('done');
            });
        } else {
            console.log("we don't have this band!")
        }

    }


    await instance.exit();
})();
