const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('Warning: Could not set DNS servers. Falling back to default system DNS.', e.message);
}

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Admin } = require('./models/Schemas');

const MONGO_URI = process.env.MONGO_URI;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ;

if (!MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in your environment variables.');
  process.exit(1);
}

async function seedAdmin() {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful.');

    console.log(`Checking if admin user "${ADMIN_USERNAME}" exists...`);
    const existingAdmin = await Admin.findOne({ username: ADMIN_USERNAME });

    console.log('Hashing password...');
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    if (existingAdmin) {
      console.log(`Admin user "${ADMIN_USERNAME}" already exists. Updating password...`);
      existingAdmin.passwordHash = passwordHash;
      await existingAdmin.save();
      console.log('Admin password updated successfully.');
    } else {
      console.log(`Creating new admin user "${ADMIN_USERNAME}"...`);
      const newAdmin = new Admin({
        username: ADMIN_USERNAME,
        passwordHash,
      });
      await newAdmin.save();
      console.log('Admin user created successfully.');
    }

    console.log('\n--- Admin Credentials ---');
    console.log(`Username: ${ADMIN_USERNAME}`);
    console.log(`Password: ${ADMIN_PASSWORD}`);
    console.log('-------------------------\n');

  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Database disconnected.');
  }
}

seedAdmin();
