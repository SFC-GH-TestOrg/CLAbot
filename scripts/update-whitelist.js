const fs = require('fs');
const yaml = require('js-yaml');
const git = require('simple-git'); // Note the /promise

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

  // Print the new whitelist
  console.log(yamlStr);
  // Commit the updated file
  const remoteRepo = 'https://github.com/SFC-GH-TestOrg/CLAbot.git'
  const branchName = 'staging';
  const gitInstance = git();
  await gitInstance.fetch();
  await gitInstance.checkout(branchName);
  await gitInstance.add('email-whitelist.yml');
  await gitInstance.commit('Updated email whitelist');
  await gitInstance.push('origin', branchName);
}

// Call the main function
main();