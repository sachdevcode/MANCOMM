const axios = require('axios');

async function downloadHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error downloading the HTML:', error);
    throw error;
  }
}

module.exports = downloadHTML;
