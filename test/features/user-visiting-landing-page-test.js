const {assert} = require('chai');

describe('User visits root', () => {
  describe('and there are no videos in the database', () => {
    it('the videos-container should be blank', () => {

      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
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
