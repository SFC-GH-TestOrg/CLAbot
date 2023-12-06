const fs = require('fs');
const yaml = require('js-yaml');
const git = require('simple-git/promise'); // Note the /promise

// Make the main function async
async function main() {
  // Parse the email-whitelist.yml file
  const file = fs.readFileSync('email-whitelist.yml', 'utf8');
  let whitelist = yaml.load(file);

  // Format the new item
  let newItem = {
    email: process.env.EMAIL,
    prNumber: process.env.PR_NUMBER,
    commentNumber: process.env.COMMENT_ID,
    timestamp: process.env.TIMESTAMP
  };

  // Add the new item to the individual_accounts list
  whitelist.individual_accounts.push(newItem);

  // Write the updated whitelist back to the email-whitelist.yml file
  let yamlStr = yaml.dump(whitelist);
  fs.writeFileSync('email-whitelist.yml', yamlStr, 'utf8');

  // Configure git and commit the changes
  const gitOps = git();
  await gitOps.addConfig('user.name', 'GitHub Actions');
  await gitOps.addConfig('user.email', 'actions@github.com');
  await gitOps.add('email-whitelist.yml');
  await gitOps.commit('Update email whitelist');
  await gitOps.push('origin', 'main'); // replace 'main' with your branch name
}

// Call the main function
main();