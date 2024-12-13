#!/usr/bin/env node

import { exec } from 'child_process';
import { join } from 'path';
import { mkdir, rm } from 'fs/promises';
import { cwd, chdir } from 'process';

const gitRepo = 'https://github.com/CoffeeBreakDev/setup.git';

if (process.argv.length < 3) {
  console.log('You have to provide a name to your app.');
  console.log('For example:');
  console.log('    npx coffeebreakdev my-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = cwd();
const projectPath = join(currentPath, projectName);

async function runCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

async function main() {
  try {
    await mkdir(projectPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(
        `The file ${projectName} already exists in the current directory. Please choose another name.`
      );
    } else {
      console.log(err);
    }
    process.exit(1);
  }

  try {
    console.log('Downloading files...');
    await runCommand(`git clone --depth 1 ${gitRepo} ${projectPath}`);

    chdir(projectPath);

    console.log('Installing dependencies...');
    await runCommand('npm install');

    console.log('Removing unnecessary files...');
    await rm(join(projectPath, '.git'), { recursive: true, force: true });
    await rm(join(projectPath, 'scripts'), { recursive: true, force: true });

    console.log('The installation is done, and your project is ready to use!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();