const fs = require("fs");
const cheerio = require("cheerio");
const phantom = require("phantom");
const path = require("path");
const express = require("express");
const request = require("request");
const Band = require("../models/band");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.get("/parse-band-json", async (req, res, next) => {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function (requestData) {
        console.info("Requesting", requestData.url);
    });
    fs.readFile("src/assets/black-metal.json", "utf8", function (err, data) {
        if (err) throw err;
        let bandData = JSON.parse(data);
        parseData(bandData);
    });

    async function parseData(data) {
        let resultArray = data.map(el => {
            return el.replace(/ /g, "-");
        });
        let allBands = [];
        for (let i = 0; i < resultArray.length; i++) {
            let url = `https://web.archive.org/web/20180601113045/http://dark-world.ru/bands/${resultArray[i]}.php`;
            const status = await page.open(url);
            const content = await page.property("content");
            const $ = cheerio.load(content, {decodeEntities: false});
            const bandInfo = $(".news_text").html();
            const genre = $("#bandDetails > tbody > tr:nth-child(2) > td:nth-child(2)").text();
            const country = $("#bandDetails > tbody > tr:nth-child(3) > td:nth-child(2)").text();
            const existence = $("#bandDetails > tbody > tr:nth-child(4) > td:nth-child(2)").text();
            let members = [];
            let discography = [];
            let videography = [];
            let pastMembers = [];
            $(".bandLineup").first().find("tr").each((i, el) => {
                const parsedLeftCol = $(el).find("td:nth-child(1)").text().trim();
                const parsedRightCol = $(el).find("td:nth-child(2)").text().trim();
                if (parsedLeftCol) {
                    let member = {
                        instrument: parsedLeftCol,
                        name: parsedRightCol
                    };
                    members.push(member);
                }
            });
            $(".bandLineup:nth-of-type(3)").find("tr").each((i, el) => {
                const parsedLeftCol = $(el).find("td:nth-child(1)").text().trim();
                const parsedRightCol = $(el).find("td:nth-child(2)").text().trim();
                if (parsedLeftCol) {
                    let pastMember = {
                        instrument: parsedLeftCol,
                        name: parsedRightCol
                    };
                    pastMembers.push(pastMember);
                }
            });

            $(".stripped.notop").find("tr").each((i, el) => {
                const parsedLeftCol = $(el).find("td:nth-child(1)").text().trim();
                const parsedRightCol = $(el).find("td:nth-child(2)").text().trim();
                if (parsedLeftCol) {
                    let album = {
                        year: parsedLeftCol,
                        name: parsedRightCol
                    };
                    discography.push(album);
                }
            });

            $(".bandRightCol.fl_r .stripped").find("tr").each((i, el) => {
                const parsedLeftCol = $(el).find("td:nth-child(1)").text().trim();
                const parsedRightCol = $(el).find("td:nth-child(2)").text().trim();
                if (parsedLeftCol) {
                    let video = {
                        year: parsedLeftCol,
                        name: parsedRightCol
                    };
                    videography.push(video);
                }
            });


            let band = {
                serialNumber: i,
                name: data[i],
                info: bandInfo,
                country: country,
                genre: genre,
                existence: existence,
                members: members,
                pastMembers: pastMembers,
                discography: discography,
                videography: videography,
            };
            allBands.push(band);
            let bandInfoJSON = JSON.stringify(allBands);
            fs.writeFile("backend/data/allBandInfo.json", bandInfoJSON, function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log("saving");
        }
        await instance.exit();
    }
});

router.get("/parse-image", async (req, res, next) => {
    var download = async function (uri, filename, callback) {
        await request.head(uri, function (err, res, body) {
            console.log("content-type:", res.headers["content-type"]);
            console.log("content-length:", res.headers["content-length"]);

            request(uri)
                .pipe(fs.createWriteStream(filename))
                .on("close", callback);
        });
    };
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on("onResourceRequested", function (requestData) {
        console.info("Requesting", requestData.url);
    });
    fs.readFile("src/assets/black-metal.json", "utf8", function (err, data) {
        if (err) throw err;
        let bandData = JSON.parse(data);
        parseData(bandData);
    });

    async function parseData(data) {
        for (let i = 0; i < data.length; i++) {
            let url = `https://www.metal-archives.com/bands/${data[i]}`;
            const status = await page.open(url);
            const content = await page.property("content");
            const $ = cheerio.load(content, {decodeEntities: false});
            if ($("#photo") && $("#photo")[0]) {
                const imageUrl = $("#photo")[0].attribs.href;
                download(imageUrl, `backend/test/${data[i]}.jpeg`, function () {
                    console.log("done");
                });
            } else {
                console.log("we don't have this band!");
            }
        }
        await instance.exit();
    }
});

router.get("/save-band-schema", checkAuth, (req, res, next) => {
    fs.readFile("backend/data/allBandInfo.json", "utf8", function (err, data) {
        if (err) throw err;
        let bandData = JSON.parse(data);
        processArray(bandData);

        async function processArray(array) {
            for (const item of bandData) {
                await saveSchemaData(item);
            }
        }



        function saveSchemaData(el) {
            new Band({
                serialNumber: el.serialNumber,
                name: el.name,
                info: el.info,
                country: el.country,
                genre: el.genre,
                existence: el.existence,
                members: el.members,
                pastMembers: el.pastMembers,
                discography: el.discography,
                videography: el.videography,
                imagePath: "",
                creator: req.userData.userId
            })
                .save()
                .catch(err => {
                    console.log(err.message);
                });
            console.log("saved");
        }
        console.log('All Band was saved');
    });
});



module.exports = router;
