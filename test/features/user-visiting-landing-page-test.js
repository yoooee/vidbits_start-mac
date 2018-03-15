const {assert} = require('chai');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {seedVideoToDatabase, generateRandomUrl} = require('../test-utils');
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
      video1 = await seedVideoToDatabase({
        title: 'A beer video',
        videoUrl: generateRandomUrl('youtube.com'),
        description: 'A video about delicious beer.'
      });

      video2 = await seedVideoToDatabase({
        title: 'a whiskey video',
        videoUrl: generateRandomUrl('youtube.com'),
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

    it('display videos in an iframe with the videos source', () => {

      browser.url('/');
      //TODO: Is this the right way to do this?
      const iframes = browser.getAttribute('.video-player', 'src');
      assert.equal(iframes[0], video1.videoUrl);
    });

    it('a user can view details about a video by clicking its title', () => {
      browser.url('/');
      browser.click('.video-title');

      assert.include(browser.getText('body'), video1.description);
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
