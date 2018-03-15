const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');
const Video = require('../../models/video');
const app = require('../../app.js');
const {connectDatabase, disconnectDatabase} = require('../database-utilities');
const {seedVideoToDatabase} = require('../test-utils');

describe('GET /videos/:id/deletions', () => {

  beforeEach(connectDatabase);
  afterEach(disconnectDatabase);

  it('deletes video from database and redirects to landing page', async () => {

    const video = await seedVideoToDatabase();

    const response = await request(app)
      .get(`/videos/${video._id}/deletions`);

    const numberOfVideos = await Video.count();

    assert.equal(numberOfVideos, 0);
    assert.equal(response.status, 302);
  });
});
