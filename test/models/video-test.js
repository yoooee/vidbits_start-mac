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

});
