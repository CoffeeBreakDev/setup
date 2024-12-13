#!/usr/bin/env node

import { exec } from 'execa';
import { join } from 'path';
import { mkdir, rm } from 'fs/promises';
import { cwd, chdir } from 'process';
import { promisify } from 'util';
import * as spinners from 'cli-spinners';

const gitRepo = 'https://github.com/CoffeeBreakDev/setup.git';

if (process.argv.length < 3) {
  console.log('Oops! You forgot to provide a project name.');
  console.log('Try something like:');
  console.log('    npx coffeebreakdev my-awesome-app');
  process.exit(1);
}

const projectName = process.argv[2];
const currentPath = cwd();
const projectPath = join(currentPath, projectName);

const spinner = spinners.dots;
const spinnerText = spinner.frames[0];

async function main() {
  let spinnerInterval = setInterval(() => {
    process.stdout.write(`\rCreating project folder... ${spinnerText}`);
  }, 100);

  try {
    await mkdir(projectPath, { recursive: false });
    clearInterval(spinnerInterval);
    console.log(`\nProject folder "${projectName}" created successfully!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Uh-oh! A folder named "${projectName}" already exists.`);
    } else {
      console.error('Something went wrong:', err);
    }
    process.exit(1);
  }

  spinnerInterval = setInterval(() => {
    process.stdout.write(`\rCloning repository... ${spinnerText}`);
  }, 100);
  try {
    await exec('git', ['clone', '--depth', '1', gitRepo, projectPath]);
    clearInterval(spinnerInterval);
    console.log(`\nRepository cloned successfully!`);
  } catch (err) {
    clearInterval(spinnerInterval);
    console.error('Failed to clone the repo!');
    console.error(err);
    process.exit(1);
  }

  chdir(projectPath);
  console.log('Installing dependencies...');
  let installProgress = 0;
  const interval = setInterval(() => {
    installProgress += 2;
    process.stdout.write(`\rInstalling... [${'='.repeat(installProgress / 2)}${' '.repeat(50 - installProgress / 2)}] ${installProgress}%`);
    if (installProgress >= 100) {
      clearInterval(interval);
      console.log('\nDependencies installed successfully!');
    }
  }, 100);

  try {
    await exec('npm', ['install']);
  } catch (err) {
    clearInterval(interval);
    console.error('Error installing dependencies!');
    process.exit(1);
  }

  console.log('\nRemoving unnecessary files...');
  await rm(join(projectPath, '.git'), { recursive: true, force: true });
  await rm(join(projectPath, 'bin'), { recursive: true, force: true });

  console.log('\nDone! Your project is ready to roll! ☕');
  console.log(`🎉 Enjoy building your awesome app, "${projectName}"! 🚀`);
  console.log('If you need help, just ask CoffeeBreakDev. We’ve got your back! ☕');
}

main();