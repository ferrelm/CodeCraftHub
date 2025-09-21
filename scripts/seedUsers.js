#!/usr/bin/env node
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../src/models/userModel');

const users = [
  { username: 'john_doe', email: 'johndoe@example.com', password: 'Password123!' },
  { username: 'john_smith', email: 'johnsmith@example.com', password: 'password123!' },
];

async function seed() {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.error('MONGO_URI is not set. Please set it in .env');
      process.exit(1);
    }
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    for (const u of users) {
      const exists = await User.findOne({ $or: [{ email: u.email }, { username: u.username }] });
      if (exists) {
        console.log(`Skipping existing user: ${u.username} (${u.email})`);
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 10);
      await User.create({ username: u.username, email: u.email, password: hashed });
      console.log(`Inserted user: ${u.username}`);
    }

    await mongoose.disconnect();
    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();
