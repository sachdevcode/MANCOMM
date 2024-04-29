const express = require('express');

const downloadHTML = require('./downloader');
const parseHTML = require('./parser');
const { connectDb } = require('./db');
const fs = require('fs')

const app = express();
connectDb()
app.get('/', async (req, res) => {
    try {
        const url = 'https://www.ecfr.gov/api/renderer/v1/content/enhanced/2024-03-01/title-2';
        html = await downloadHTML(url),
        incomingData = parseHTML(html),
        filePath = 'data.json';

        /* incomingData.forEach(async(el) => {
            await data.create({content:el.content, title: el.title, type: el.type})
        }) */
        
        
        // res.download(filePath)
        res.status(200).json(incomingData);

    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the HTML');
    }
});

module.exports = app;
