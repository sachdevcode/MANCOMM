const { JSDOM } = require('jsdom');

let globalIdCounter = 1; // Initialize a counter for unique IDs

function parseHTML(html) {
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const structuredData = [];
  
    // Start with top-level titles, if they exist
    const topTitles = document.querySelectorAll('h1, h2, h3:not([class])');
    topTitles.forEach(title => {
        structuredData.push(parseTitle(title));
    });

    // Now handle parts which contain subparts and paragraphs
    const parts = document.querySelectorAll('.part');
    parts.forEach(part => {
        structuredData.push(parseSection(part, 'part'));
    });

    return structuredData;
}

function parseSection(section, type) {
    const sectionId = `${type}-${globalIdCounter++}`; // Generate a unique ID
    const titleElement = section.querySelector('h1, h2, h3');
    const title = titleElement ? titleElement.textContent.trim() : 'No Title';

    const subparts = Array.from(section.querySelectorAll('.subpart')).map(subpart => parseSection(subpart, 'subpart'));
    const paragraphs = Array.from(section.querySelectorAll('p:not([class])')).map(paragraph => parseParagraph(paragraph));

    return {
        type,
        id: sectionId,
        title,
        subparts,
        content: paragraphs
    };
}

function parseTitle(titleElement) {
    return {
        type: 'title',
        level: titleElement.tagName.toLowerCase(),
        content: titleElement.textContent.trim()
    };
}

function parseParagraph(paragraphElement) {
    const indentLevel = getIndentLevel(paragraphElement.className);
    return {
        type: 'paragraph',
        content: paragraphElement.textContent.trim(),
        indentLevel: indentLevel
    };
}

function getIndentLevel(className) {
    const match = className.match(/indent-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
}

module.exports = parseHTML;
