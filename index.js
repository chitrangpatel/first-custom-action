const core = require('@actions/core');
const github = require('@actions/github');
const fs = require("fs");
const { connected } = require('process');

async function checkFileExistence(path) {
    return fs.promises.access(path, fs.constants.F_OK)
    .then(() => {
        core.info(`${path} exists`);
        return true;
    })
    .catch(() => {
        core.setFailed(`${path} does not exist`);
        return false;
    });
  }

(async () => {
    try {
        core.notice('Check File Action called!!!');
	var files = process.env.files;
	core.info(`Looking for: ${files}`);
	for(const val of files.split(',')) {
    	    checkFileExistence(val);
	}
    } catch (error) {
        core.setFailed(error.message);
    }
})();
