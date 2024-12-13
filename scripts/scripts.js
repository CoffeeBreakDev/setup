#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const git_repo = 'https://github.com/CoffeeBreakDev/setup.git'

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example :');
  console.log('    npx coffeebreakdev my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);

async function main() {
  try {
    fs.mkdirSync(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(
        `The file ${projectName} already exist in the current directory, please give it another name.`
      );
    } else {
      console.log(err);
    }
    process.exit(1);
  }

  try {
    console.log('Downloading files...');
      exec(`git clone --depth 1 ${git_repo} ${projectPath}`);

    process.chdir(projectPath);

    console.log('Installing dependencies...');
     exec('npm install');

    console.log('Removing useless files');
    fs.rmSync('./.git', { recursive: true, force: true });
    fs.rmdirSync(path.join(projectPath, 'scripts'), { recursive: true });

    console.log('The installation is done, this is ready to use!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();