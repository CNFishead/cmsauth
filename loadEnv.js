// loadEnv.js
require('dotenv').config();
const fs = require('fs');

const envContent = `
  API_URL=${process.env.API_URL}
  ENCRYPTION_KEY=${process.env.ENCRYPTION_KEY}
`;

fs.writeFileSync('.env.production', envContent);
