const {assert} = require('chai');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

describe('User visits landing page', () => {
  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  describe('and there are no videos in the database', () => {
    it('the videos container should be blank', () => {

      browser.url('/');
      assert.equal(browser.getText('#videos-container'), '');
    });
  });

  describe('and there are videos in the database', () => {
    let video1;
    let video2;

    beforeEach(async () => {
      video1 = await Video.create({
        title: 'A beer video',
        description: 'A video about delicious beer.'
      });

      video2 = await Video.create({
        title: 'a whiskey video',
        description: 'i love whiskey!'
      });
    });

    it('the videos container should contain all videos', () => {
      browser.url('/');

      assert.include(browser.getText('#videos-container'), video1.title);
      assert.include(browser.getText('#videos-container'), video1.description);

      assert.include(browser.getText('#videos-container'), video2.title);
      assert.include(browser.getText('#videos-container'), video2.description);
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
