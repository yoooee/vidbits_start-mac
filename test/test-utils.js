const {jsdom} = require('jsdom');
const Video = require('../models/video');

// Create and return a sample Video object
const buildVideoObject = (options = {}) => {
  const title = options.title || 'My favorite video';
  const videoUrl = options.videoUrl || generateRandomUrl('youtube.com');
  const description = options.description || 'Just the best video';
  return {title, videoUrl, description};
};

// Add a sample Video object to mongodb
const seedVideoToDatabase = async (options = {}) => {
  const video = await Video.create(buildVideoObject(options));
  return video;
};

// Create and return a random url
const generateRandomUrl = (domain) => {
  return `http://${domain}/${Math.random()}`;
};

// extract text from an Element by selector.
const parseTextFromHTML = (htmlAsString, selector) => {
  const selectedElement = jsdom(htmlAsString).querySelector(selector);
  if (selectedElement !== null) {
    return selectedElement.textContent;
  } else {
    throw new Error(`No element with selector ${selector} found in HTML string`);
  }
};

// Find iFrame with specific src.
const findIFrameElementBySource = (htmlAsString, src) => {
  return findElement(htmlAsString, `iframe[src="${src}"]`);
};

const findElement = (html, selector) => {
  const element = jsdom(html).querySelector(selector);

  if (element) {
    return element;
  } else {
    throw new Error(`Element ${selector} not found`);
  }
}

module.exports = {
  buildVideoObject,
  seedVideoToDatabase,
  generateRandomUrl,
  parseTextFromHTML,
  findIFrameElementBySource,
  findElement
};
