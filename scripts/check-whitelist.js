#!/usr/bin/env node

const fs = require('fs');
const yaml = require('yaml');

const whitelist = yaml.parse(fs.readFileSync('email-whitelist.yml', 'utf8'));
const prAuthorEmail = 'pr.author.email@example.com'; // Replace this with the PR author's email

const isWhitelisted = whitelist.domains.some(domain => prAuthorEmail.endsWith(`@${domain}`)) || whitelist.individual_accounts.includes(prAuthorEmail);

console.log(`Is PR author whitelisted? ${isWhitelisted}`);

console.log(`::set-output name=is_whitelisted::${isWhitelisted}`);