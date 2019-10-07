const phantom = require('phantom');
const cheerio = require('cheerio');

loadJsSite = async (url) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(url);
  const content = await page.property('content');
  // console.log(content);
  // let $ = cheerio.load(content);

  await instance.exit();

  return {$: cheerio.load(content), content: content};
}
