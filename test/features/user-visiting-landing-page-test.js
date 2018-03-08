const {assert} = require('chai');

describe('User visits landing page', () => {
  describe('and there are no videos in the database', () => {
    it('the videos container should be blank', () => {

      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('and there are videos in the database', () => {
    it('the videos container should contain all videos', () => {
      const testTitle = 'Barrel Aged Homebrewing';
      const testDescription = 'A video about barrel aged beer brewing.';

      browser.url('/videos/create');

      // Set form fields with fake data.
      browser.setValue('#title-input', testTitle);
      browser.setValue('#description-input', testDescription);

      // Submit the form by clickin the submit button.
      browser.click('#submit-button');

      browser.url('/');

      assert.include(browser.getText('#videos-container'), testTitle);
      assert.include(browser.getText('#videos-container'), testDescription);
    });
  });

  describe('and clicks the create video button', () => {
    it('the browser navigates to the create video page', () => {
      // Setup
      const expectedPageTitle = 'Save a video';
      let actualPageTitle = '';

      // Exercise
      browser.url('/');
      browser.click('a.add-video');
      actualPageTitle = browser.getText('.contents-container h3');

      // Verify
      assert.equal(actualPageTitle, expectedPageTitle);

    });

  });
});
