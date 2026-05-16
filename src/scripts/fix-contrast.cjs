const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const replacements = {
  // Fix hover backgrounds (buttons etc.)
  'hover:bg-yellow-500 hover:text-black': 'hover:bg-black hover:text-white dark:hover:bg-yellow-500 dark:hover:text-black',
  'hover:bg-yellow-400': 'hover:bg-neutral-800 dark:hover:bg-yellow-400',
  
  // Fix hover text
  'hover:text-yellow-500': 'hover:text-black dark:hover:text-yellow-500',
  'group-hover:text-yellow-500': 'group-hover:text-black dark:group-hover:text-yellow-500',
  
  // Fix hover borders
  'hover:border-yellow-500': 'hover:border-black dark:hover:border-yellow-500',
  'hover:border-yellow-500/30': 'hover:border-black/30 dark:hover:border-yellow-500/30',
  
  // Fix shadows
  'hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]': 'hover:shadow-lg hover:shadow-black/20 dark:hover:shadow-[0_0_15px_rgba(234,179,8,0.4)]',
  'hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]': 'hover:shadow-xl hover:shadow-black/20 dark:hover:shadow-[0_0_20px_rgba(234,179,8,0.5)]',
  'hover:shadow-[0_0_25px_rgba(234,179,8,0.1)]': 'hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-[0_0_25px_rgba(234,179,8,0.1)]',
  'shadow-[0_0_20px_rgba(234,179,8,0.3)]': 'shadow-lg shadow-black/10 dark:shadow-[0_0_20px_rgba(234,179,8,0.3)]',
  
  // Make sure general light mode text is very readable
  // Sometimes `text-white` is used directly in dark backgrounds, we already converted those to `text-stone-900 dark:text-white`.
  // Let's ensure any remaining text-gray-500 is readable enough. `text-stone-600` is better than 500 for contrast.
  'text-stone-500': 'text-stone-600',
  
  // Fix specific card background in light mode that was `bg-white/[0.02]` which is almost transparent and hard to see
  'bg-white/[0.02]': 'bg-white dark:bg-white/[0.02] shadow-sm dark:shadow-none',
  'hover:bg-white/[0.04]': 'hover:bg-stone-50 dark:hover:bg-white/[0.04]',
  
  // Also, any text-stone-900 is good. Let's make text-stone-900 -> text-black for even better contrast where needed? No, stone-900 is fine.
  
  // Let's also check for borders that are too light
  'border-stone-100': 'border-stone-200',
};

function applyFixes(content) {
  let newContent = content;
  
  for (const [oldClass, newClass] of Object.entries(replacements)) {
    // Escape oldClass for string replace all
    newContent = newContent.split(oldClass).join(newClass);
  }
  
  return newContent;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let newContent = applyFixes(content);
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated ${filePath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Done.');
