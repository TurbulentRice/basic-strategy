// Simple script to create placeholder icons using canvas in Node
const fs = require('fs');

// Create a simple SVG as placeholder
const createSVG = (size, name) => {
  const svg = `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#1a472a"/>
  <text x="50%" y="50%" font-family="Arial" font-size="${size/6}" fill="#ffd700" text-anchor="middle" dy=".3em" font-weight="bold">BS</text>
</svg>`;
  fs.writeFileSync(`assets/${name}.svg`, svg);
  console.log(`Created assets/${name}.svg`);
};

createSVG(1024, 'icon');
createSVG(1024, 'adaptive-icon');
createSVG(2048, 'splash');
createSVG(48, 'favicon');

console.log('Placeholder icons created!');
