var converter = require('./converter');

module.exports = function ($logger, $projectData, $errors) {
    converter.convert($logger, $projectData.projectDir);
};
