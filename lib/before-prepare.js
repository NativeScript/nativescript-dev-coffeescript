var converter = require('./converter');

module.exports = function ($logger, $projectData, $usbLiveSyncService) {
    if (!$usbLiveSyncService.isInitialized) {
        return converter.convert($logger, $projectData.projectDir);
    }
};
