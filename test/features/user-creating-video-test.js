const {assert} = require('chai');
const { generateRandomUrl } = require('../test-utils');

describe('User can fill out a form to submit a video', () => {

  describe('adding a new video', () => {

    it('shows newly created video on detail page', () => {
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

      // We should now be on the landing page.
      // TODO: How Do I get the ID?
      //assert.equal(browser.getUrl(), `${browser.options.baseUrl}/videos`);
      // We should see our video with testTitle and testDescription appear.
      //assert.include(browser.getText('#videos-container'), testTitle);
      //assert.include(browser.getText('#videos-container'), testDescription);
      // Because we changed the behavior of submitting a new video, the above no longer applies.
      // We no longer get redirected back to the landing page, instead we are redirected to the detail/show page.
      assert.include(browser.getText('.video-title'), testTitle);
      assert.include(browser.getText('.video-description'), testDescription);
    });
  });
});
