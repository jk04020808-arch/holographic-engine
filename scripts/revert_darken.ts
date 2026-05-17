import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');
content = content.replace(/bg-black\/40/g, 'bg-white/[0.01]');
content = content.replace(/bg-black\/60/g, 'bg-white/[0.02]');
content = content.replace(/bg-black\/80/g, 'bg-white/[0.04]');
content = content.replace(/opacity-100 text-gray-300/g, 'opacity-70');
content = content.replace(/opacity-100 text-gray-400/g, 'opacity-60');
content = content.replace(/opacity-100 text-gray-500/g, 'opacity-50');
fs.writeFileSync('src/App.tsx', content);
