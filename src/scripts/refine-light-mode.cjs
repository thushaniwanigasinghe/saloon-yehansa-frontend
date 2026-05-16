const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const refinements = {
  // Backgrounds
  'bg-white dark:bg-neutral-950': 'bg-stone-50 dark:bg-neutral-950',
  'bg-gray-50 dark:bg-neutral-900': 'bg-white dark:bg-neutral-900',
  'bg-white dark:bg-black': 'bg-stone-50 dark:bg-black',
  
  // Text Colors
  'text-neutral-900 dark:text-white': 'text-stone-900 dark:text-white',
  'text-gray-600 dark:text-gray-300': 'text-stone-600 dark:text-gray-300',
  'text-gray-500 dark:text-gray-400': 'text-stone-500 dark:text-gray-400',
  
  // Borders
  'border-neutral-900/10 dark:border-white/10': 'border-stone-200 dark:border-white/10',
  'border-neutral-900/20 dark:border-white/20': 'border-stone-300 dark:border-white/20',
  'border-neutral-900/30 dark:border-white/30': 'border-stone-400 dark:border-white/30',
  'border-neutral-900/5 dark:border-white/5': 'border-stone-100 dark:border-white/5',
  
  // Subtle Backgrounds
  'bg-neutral-900/5 dark:bg-white/5': 'bg-white dark:bg-white/5 shadow-sm dark:shadow-none',
  'bg-neutral-900/10 dark:bg-white/10': 'bg-stone-100 dark:bg-white/10',
  
  // Hover States (handled generally by matching prefixes in previous, but here we can just match exactly because we know the pairs)
  'hover:bg-neutral-900/10 dark:hover:bg-white/10': 'hover:bg-stone-100 dark:hover:bg-white/10',
  'hover:bg-neutral-900/5 dark:hover:bg-white/5': 'hover:bg-stone-50 dark:hover:bg-white/5',
  'hover:text-neutral-900 dark:hover:text-white': 'hover:text-stone-900 dark:hover:text-white',
  'hover:border-neutral-900/10 dark:hover:border-white/10': 'hover:border-stone-300 dark:hover:border-white/10',
  
  // Specific Overlays
  'bg-white/90 dark:bg-black/90': 'bg-stone-50/90 dark:bg-black/90',
  'bg-white/60 dark:bg-black/60': 'bg-stone-50/60 dark:bg-black/60',
  'bg-white/40 dark:bg-black/40': 'bg-white/60 dark:bg-black/40 shadow-sm dark:shadow-none',
};

function refineClasses(content) {
  let newContent = content;
  
  // We'll just do simple string replacements for the exact pairs since they are highly specific
  for (const [oldPair, newPair] of Object.entries(refinements)) {
    // Escape for regex if needed, but simple split/join works perfectly and is safer for exact matches
    newContent = newContent.split(oldPair).join(newPair);
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
      let newContent = refineClasses(content);
      if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Refined ${filePath}`);
      }
    }
  }
}

processDirectory(srcDir);
console.log('Refinement done.');
