const { Builder, Capabilities, By } = require("selenium-webdriver");

require("chromedriver");

const driver = new Builder().withCapabilities(Capabilities.chrome()).build();

beforeAll(async () => {
  await driver.get("http://127.0.0.1:5500/movieList/index.html");
});

afterAll(async () => {
  await driver.quit();
});





test('if clicking span will change class to checked', async ()=>{
        let addMovieInput = await driver.findElement(By.css("input"));
        await addMovieInput.sendKeys("Star Wars");
        let addMovieButton = await driver.findElement(By.xpath("//form/button"));
        await addMovieButton.click();
        await driver.sleep(3000);

        let movie = await driver.findElement(By.xpath("//li/span"));
        await movie.click()
        await driver.sleep(3000)
        let checked = await driver.findElement(By.xpath("//li/span"));
        // let checked = await driver.findElement(By.css("[class='checked']"))
        // console.log(await checked.getAttribute('class'))
        expect(await checked.getAttribute('class')).toBe('checked')
})
test('if clicking span again will change it back', async ()=>{
    let movie = await driver.findElement(By.xpath("//li/span"));
    await movie.click()
    await driver.sleep(3000)
    let checked = await driver.findElement(By.xpath("//li/span"));
    expect(await checked.getAttribute('class')).not.toBe('checked')

})
test('if delete button deletes', async ()=>{
    // let list = await (await driver.findElements(By.xpath("//ul/*"))).length;
    // console.log(list)

    let button = await driver.findElement(By.xpath('//li/button'))
    await button.click()
    await driver.sleep(3000)
    let list = await (await driver.findElements(By.xpath("//ul/*"))).length;
    console.log(list)
    expect(list).toBe(0)
})
