const {assert} = require('chai');
const { generateRandomUrl } = require('../test-utils');

describe('User deletes an existing video', () => {

  it('they are redirected to the landing page where the video has been removed', () => {

    const testTitle = 'Barrel Aged Homebrewing';
    const testUrl = generateRandomUrl('youtube.com');
    const testDescription = 'A video about barrel aged beer brewing.';

    browser.url('/videos/create');

    // Set form fields with fake data.
    browser.setValue('#title-input', testTitle);
    browser.setValue('#videoUrl-input', testUrl);
    browser.setValue('#description-input', testDescription);

    // Submit the form by clickin the submit button.
    browser.click('button[id="submit-button"]');

    browser.click('a[id="delete-button"]');

    // are we redirected to the landing page?
    assert.equal(browser.getUrl(), `${browser.options.baseUrl}/videos`);

    // has the video been removed?
    assert.notInclude(browser.getText('body'), testTitle);
    assert.notInclude(browser.getText('body'), testUrl);
    assert.notInclude(browser.getText('body'), testDescription);
  });
});
