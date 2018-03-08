const {assert} = require('chai');

describe('User visits root', () => {
  describe('without existing items', () => {
    it('the videos-container should be blank', () => {

      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });
});
