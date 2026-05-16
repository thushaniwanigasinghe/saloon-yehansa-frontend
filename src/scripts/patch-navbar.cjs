const fs = require('fs');
const path = require('path');

const navbarPath = path.join(__dirname, 'src', 'components', 'Navbar.jsx');
let content = fs.readFileSync(navbarPath, 'utf8');

// 1. Add isActive back and the new helper functions right after const user
const helperCode = `  const isActive = (path) => location.pathname === path;

  const getLinkClass = (path) => {
    return \`px-4 py-2 rounded-full text-sm font-medium transition-all \${
      isActive(path)
        ? 'bg-yellow-500 text-black dark:text-yellow-500 dark:bg-yellow-500/10'
        : 'text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5'
    }\`;
  };

  const getMobileLinkClass = (path) => {
    return \`block px-4 py-4 rounded-xl text-lg font-medium border transition-all \${
      isActive(path)
        ? 'bg-yellow-500 text-black border-transparent dark:text-yellow-500 dark:bg-yellow-500/10 dark:border-yellow-500/20'
        : 'text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white/5 border-transparent hover:border-stone-300 dark:hover:border-white/10'
    }\`;
  };
`;

content = content.replace(
  /const user = userStr \? JSON\.parse\(userStr\) : null;\n/,
  `const user = userStr ? JSON.parse(userStr) : null;\n\n${helperCode}`
);

// 2. Replace the desktop links
content = content.replace(
  /<Link\s*to="\/"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*Home\s*<\/Link>/s,
  `<Link to="/" className={getLinkClass('/')}>Home</Link>`
);
content = content.replace(
  /<Link\s*to="\/about"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*About\s*<\/Link>/s,
  `<Link to="/about" className={getLinkClass('/about')}>About</Link>`
);
content = content.replace(
  /<Link\s*to="\/gallery"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*Gallery\s*<\/Link>/s,
  `<Link to="/gallery" className={getLinkClass('/gallery')}>Gallery</Link>`
);
content = content.replace(
  /<Link\s*to="\/services"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*Services\s*<\/Link>/s,
  `<Link to="/services" className={getLinkClass('/services')}>Services</Link>`
);
content = content.replace(
  /<Link\s*to="\/contact"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*Contact\s*<\/Link>/s,
  `<Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>`
);

content = content.replace(
  /<Link\s*to=\{user\.role === "admin" \? "\/admin" : "\/dashboard"\}\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 px-4 py-2 rounded-full text-sm font-medium transition-all"\s*>\s*Dashboard\s*<\/Link>/s,
  `<Link to={user.role === "admin" ? "/admin" : "/dashboard"} className={getLinkClass(user.role === "admin" ? "/admin" : "/dashboard")}>Dashboard</Link>`
);

// 3. Replace the mobile links
content = content.replace(
  /<Link\s*to="\/"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*Home\s*<\/Link>/s,
  `<Link to="/" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/')}>Home</Link>`
);
content = content.replace(
  /<Link\s*to="\/about"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*About Us\s*<\/Link>/s,
  `<Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/about')}>About Us</Link>`
);
content = content.replace(
  /<Link\s*to="\/gallery"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*Gallery\s*<\/Link>/s,
  `<Link to="/gallery" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/gallery')}>Gallery</Link>`
);
content = content.replace(
  /<Link\s*to="\/services"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*Services\s*<\/Link>/s,
  `<Link to="/services" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/services')}>Services</Link>`
);
content = content.replace(
  /<Link\s*to="\/contact"\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*Contact\s*<\/Link>/s,
  `<Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass('/contact')}>Contact</Link>`
);

content = content.replace(
  /<Link\s*to=\{user\.role === "admin" \? "\/admin" : "\/dashboard"\}\s*className="text-stone-600 dark:text-gray-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-50 dark:hover:bg-white\/5 block px-4 py-4 rounded-xl text-lg font-medium border border-transparent hover:border-stone-300 dark:hover:border-white\/10 transition-all"\s*>\s*Dashboard\s*<\/Link>/s,
  `<Link to={user.role === "admin" ? "/admin" : "/dashboard"} onClick={() => setIsMobileMenuOpen(false)} className={getMobileLinkClass(user.role === "admin" ? "/admin" : "/dashboard")}>Dashboard</Link>`
);

fs.writeFileSync(navbarPath, content);
console.log('Navbar updated');
