var fs = require('fs');
var path = require('path');
var coffee = require('coffee-script');
var glob = require('glob');

exports.convert = function(logger, projectDir, options) {
    return new Promise(function(resolve, reject) {
        options = options || {};

        try {
            var peerPath = require('coffee-script/package.json');
            logger.info('Found peer CoffeeScript ' + peerPath.version);
        } catch (e) {
            throw new Error('CoffeeScript installation was not found.');
        }

        var coffeeFiles = glob.sync('app/**/*.coffee', { cwd: projectDir }).filter(function(fileName) {
            return fileName.indexOf("app/App_Resources/") !== 0;
        });

        for (var i = 0; i < coffeeFiles.length; i++) {
            var filePath = coffeeFiles[i];

            try {
                var coffeeContents = fs.readFileSync(filePath, { encoding: 'utf-8' });
                var jsContents = coffee.compile(coffeeContents, { bare: 'true' });
            } catch (e) {
                reject(new Error(filePath + ' CoffeeScript failed. Error: ' + e));
                return;
            }

            if (jsContents) {
                var jsFilePath = filePath.replace('.coffee', '.js');
                fs.writeFile(jsFilePath, jsContents, 'utf-8');
            } else {
                reject(new Error('CoffeeScript cannot generate output for file ' + filePath));
                return;
            }
        }

        resolve();
    });
}
