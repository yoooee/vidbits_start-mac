const {assert} = require('chai');
const { generateRandomUrl, createVideoUsingBrowser } = require('../test-utils');

describe('User can fill out a form to submit a video', () => {

  describe('adding a new video', () => {

    it('shows newly created video on detail page', () => {
      const testTitle = 'Barrel Aged Homebrewing';
      const testUrl = generateRandomUrl('youtube.com');
      const testDescription = 'A video about barrel aged beer brewing.';

      createVideoUsingBrowser(testTitle, testUrl, testDescription);

      assert.include(browser.getText('.video-title'), testTitle);
      assert.include(browser.getAttribute('.video-player', 'src'), testUrl);
      assert.include(browser.getText('.video-description'), testDescription);
    });
  });
});
