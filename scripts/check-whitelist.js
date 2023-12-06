#!/usr/bin/env node

const fs = require('fs');
const yaml = require('yaml');

const whitelist = yaml.parse(fs.readFileSync('email-whitelist.yml', 'utf8'));
const prAuthorEmail = process.env.PR_AUTHOR_EMAIL;

const isWhitelisted = whitelist.domains.some(domain => prAuthorEmail.endsWith(`@${domain}`)) || whitelist.individual_accounts.some(account => account.email === prAuthorEmail);

console.log(`Is PR author whitelisted? ${isWhitelisted}`);

console.log(`::set-output name=is_whitelisted::${isWhitelisted}`);