const {assert} = require('chai');

describe('User can fill out a form to submit a video', () => {
  describe('adding a new video', () => {
    it('shows newly created video on detail page', () => {
      const testTitle = 'Barrel Aged Homebrewing';
      const testDescription = 'A video about barrel aged beer brewing.';

      browser.url('/videos/create.html');

      // Set form fields with fake data.
      browser.setValue('#title-input', testTitle);
      browser.setValue('#description-input', testDescription);

      // Submit the form by clickin the submit button.
      browser.click('button[id="submit-button"]');

      // We should now be on the landing page.
      assert.equal(browser.getUrl(), `${browser.options.baseUrl}/videos`);

      // We should see our video with testTitle and testDescription appear.
      assert.include(browser.getText('#videos-container'), testTitle);
      assert.include(browser.getText('#videos-container'), testDescription);

    });
  });
});
