const fs = require('fs');
const path = require('path');

// تحديد المسار إلى مجلد الجذر للمشروع أو مسار الـ backend
const vercelJsonPath = path.join(__dirname, 'vercel.json');

// المحتوى الذي نود إدراجه في vercel.json
const vercelConfig = {
  version: 2,
  builds: [
    {
      src: "backend/index.js",
      use: "@vercel/node"
    }
  ],
  routes: [
    {
      src: "/backend/(.*)",
      dest: "/backend/index.js"
    }
  ]
};

// كتابة الملف
fs.writeFileSync(vercelJsonPath, JSON.stringify(vercelConfig, null, 2), 'utf8');

console.log('vercel.json has been generated at:', vercelJsonPath);
