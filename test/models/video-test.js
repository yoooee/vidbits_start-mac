const {assert} = require('chai');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const Video = require('../../models/video');

describe('Video model', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  it('has a title that is a string', () => {
    const videoTitle = 1;
    const video = new Video({ title: videoTitle });

    assert.strictEqual(video.title, `${videoTitle}`);
  });

  it('has a title that is required', () => {
    const video = new Video({});
    video.validateSync();
    assert.equal(video.errors.title.message, 'Video `Title` is required');
  });

  it('has a url that is a string', () => {
    const videoUrl = 1;
    const video = new Video({ videoUrl: videoUrl });

    assert.strictEqual(video.videoUrl, `${videoUrl}`);
  });

  it('has a url that is required', () => {
    const video = new Video({});
    video.validateSync();
    assert.equal(video.errors.videoUrl.message, 'Video `VideoUrl` is required');
  });
});
