const {assert} = require('chai');
const {generateRandomUrl} = require('../test-utils');

describe('User edits existing video', () => {
  it('and the updated information is displayed on the detail page', () => {

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

    browser.click('a[id="edit-button"]');

    const updatedTitle = 'This is a new title';
    const updatedDescription = 'This is a new description';
    const updatedVideoUrl = 'http://new-video-url.com';

    // We should be on the /videos/edit page
    browser.setValue('#title-input', updatedTitle);
    browser.setValue('#description-input', updatedDescription);
    browser.setValue('#videoUrl-input', updatedVideoUrl);

    browser.click('button[id="submit-button"]');

    // We should be on the videos/show page.
    assert.include(browser.getText('.video-title'), updatedTitle);
    assert.include(browser.getText('.video-description'), updatedDescription);
    assert.include(browser.getAttribute('.video-player', 'src'), updatedVideoUrl);
  });
});
