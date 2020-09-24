"use strict";

const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const By = require("selenium-webdriver").By;

let browser;

test.describe("Three simple use cases in Selenium", function() {
    test.beforeEach(function(done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .forBrowser("firefox")
            .build();

        browser.get("http://localhost:3000/");
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });


    function goToNavLink(target) {
        browser.findElement(By.linkText(target)).then(function(element) {
            element.click();
        });
    }

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css("h1")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }



    test.it("Test me page", function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, "Me-app i jsramverk");
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, "Me-app i jsramverk");
        });

        assertH1("Me-app i jsramverk");
        matchUrl("");

        done();
    });



    test.it("Test link to login page", function(done) {
        goToNavLink("Logga in");
        assertH1("Logga in");
        matchUrl("/login" );

        done();
    });

    test.it("Test that login page has green login button", function(done) {
        goToNavLink("Logga in");

        browser.findElement(By.css("button")).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, "Logga in");
            });
            element.getCssValue("background-color").then(function(bgColor) {
                assert.equal(bgColor, "rgb(52, 162, 156)");
            });
        });

        done();
    });
});
