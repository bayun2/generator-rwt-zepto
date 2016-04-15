'use strict';
const spawn = require('child_process').spawn;

const monitor = spawn('npm', ['run', 'monitor'], { stdio: 'inherit'});
const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit'});

monitor.on('close', (code) => {
    console.log(`monitor-server exited width code ${code}`);
})

dev.on('close', (code) => {
    console.log(`dev-server exited width code ${code}`);
});
