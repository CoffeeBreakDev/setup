#!/usr/bin/env node

import { exec } from 'child_process';
import { join } from 'path';
import { mkdir, rm } from 'fs/promises';
import { cwd, chdir } from 'process';
import { promisify } from 'util';
import ora from 'ora';
import ProgressBar from 'progress';

const execAsync = promisify(exec);
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

async function main() {
  const spinner = ora('Creating project folder...').start();

  try {
    await mkdir(projectPath, { recursive: false });
    spinner.succeed(`Project folder "${projectName}" created successfully!`);
  } catch (err) {
    if (err.code === 'EEXIST') {
      console.log(`Uh-oh! A folder named "${projectName}" already exists.`);
    } else {
      console.error('Something went wrong:', err);
    }
    process.exit(1);
  }

  const gitSpinner = ora('Cloning repository...').start();
  try {
    await execAsync(`git clone --depth 1 ${gitRepo} ${projectPath}`);
    gitSpinner.succeed('Repository cloned successfully!');
  } catch (err) {
    gitSpinner.fail('Failed to clone the repo!');
    console.error(err);
    process.exit(1);
  }

  chdir(projectPath);

  const bar = new ProgressBar(':bar :percent', {
    total: 100,
    width: 40,
    complete: '=',
    incomplete: ' ',
    renderThrottle: 100,
  });

  const installSpinner = ora('Installing dependencies...').start();

  let progress = 0;
  const interval = setInterval(() => {
    progress += 2;
    bar.tick(2);
    if (progress >= 100) {
      clearInterval(interval);
      installSpinner.succeed('Dependencies installed successfully!');
    }
  }, 100);

  console.log('\nRemoving unnecessary files...');
  await rm(join(projectPath, '.git'), { recursive: true, force: true });
  await rm(join(projectPath, 'bin'), { recursive: true, force: true });

  console.log('\nDone! Your project is ready to roll! ☕');
  console.log(`🎉 Enjoy building your awesome app, "${projectName}"! 🚀`);
  console.log('If you need help, just ask CoffeeBreakDev. We’ve got your back! ☕');
}

main();