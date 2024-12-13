#!/usr/bin/env node

import { execa } from 'execa';  // Corrected import
import { join } from 'path';
import { mkdir, rm } from 'fs/promises';
import { cwd, chdir } from 'process';

// Custom spinner function
function spinner(text) {
  const spinnerFrames = ['|', '/', '-', '\\'];
  let i = 0;
  const interval = setInterval(() => {
    process.stdout.write(`\r${text} ${spinnerFrames[i % spinnerFrames.length]}`);
    i++;
  }, 100);

  return () => clearInterval(interval); // Function to stop spinner
}

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
  // Create project folder with custom spinner
  const stopSpinner = spinner('Creating project folder...');
  try {
    await mkdir(projectPath, { recursive: false });
    stopSpinner();
    console.log(`\nProject folder "${projectName}" created successfully!`);
  } catch (err) {
    stopSpinner();
    if (err.code === 'EEXIST') {
      console.log(`Uh-oh! A folder named "${projectName}" already exists.`);
    } else {
      console.error('Something went wrong:', err);
    }
    process.exit(1);
  }

  // Clone repository with custom spinner
  const stopSpinnerClone = spinner('Cloning repository...');
  try {
    await execa('git', ['clone', '--depth', '1', gitRepo, projectPath]);
    stopSpinnerClone();
    console.log(`\nRepository cloned successfully!`);
  } catch (err) {
    stopSpinnerClone();
    console.error('Failed to clone the repo!');
    console.error(err);
    process.exit(1);
  }

  // Install dependencies with a loading bar
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
    await execa('npm', ['install']);
  } catch (err) {
    clearInterval(interval);
    console.error('Error installing dependencies!');
    process.exit(1);
  }

  // Add additional information and steps after installation
  console.log('\nNext, we will clean up unnecessary files to make your project neat and tidy.');

  // Remove unnecessary files with spinner
  const stopSpinnerCleanup = spinner('Cleaning up unnecessary files...');
  try {
    await rm(join(projectPath, '.git'), { recursive: true, force: true });
    await rm(join(projectPath, 'bin'), { recursive: true, force: true });
    stopSpinnerCleanup();
    console.log('\nUnnecessary files removed successfully!');
  } catch (err) {
    stopSpinnerCleanup();
    console.error('Error cleaning up files:', err);
    process.exit(1);
  }

  // Final message with project summary
  console.log('\nDone! Your project is ready to roll! ☕');
  console.log(`🎉 Your awesome app, "${projectName}", is set up. Now you can start building! 🚀`);
  console.log('If you need help, just ask CoffeeBreakDev. We’ve got your back! ☕');
  console.log('To start your app, navigate to the project folder and run:');
  console.log(`    cd ${projectName}`);
  console.log('    npm start');
}

main();