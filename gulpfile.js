/******************************************************************************
 * 
 *
 * 
 ******************************************************************************/
var gulp            = require('gulp')
,   argv            = require('yargs').argv
,   async           = require('async')
,   gutil           = require('gulp-util')
,   jshint          = require('gulp-jshint')
,   concat          = require('gulp-concat')
,   insert          = require('gulp-insert')
,   uglify          = require('gulp-uglify')
,   fs              = require('fs')
,   AWS             = require('aws-sdk')
;



//http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Disk
AWS.config.loadFromPath('./.awsrc');
AWS.config.update({region: 'eu-central-1'});
var SRC_FILES = ["src/*.js"];
//ficheros ordenados 
var ORDERED_SRC_FILES = [
    "src/sdk.module.js",
    "src/token-interceptor.factory.js",
    "src/class.factory.js",
    "src/search.factory.js",
    "src/connection.service.js",
    "src/member.service.js",
    "src/repo.service.js",
    "src/workdir.service.js",
    "src/commit.service.js",
    "src/tree.service.js",
    "src/dataset.service.js",
];
var ORDERED_DEP_FILES = [
    "bower_packages/ng-file-upload/ng-file-upload.min.js",
];
var ORDERED_ALL = ORDERED_DEP_FILES.concat(ORDERED_SRC_FILES);
var DIST_FOLDER = "./dist/";




/******************************************************************************
* @name lint
* @type task
* @description
*/
gulp.task('lint', [], function(){
        console.log("@@@ Running Lint Task @@@");
        
        gulp.src(SRC_FILES)
            .on('error', gutil.log)   
            .pipe(jshint("./.jshintrc"))
            .on('error', gutil.log)
            .pipe(jshint.reporter('default'))
            .on('error', gutil.log);
        
    }
);




/******************************************************************************
* @name distify
* @type task
* @description
* Conjunto de actividades destinadas a preparar los archivos para un entorno 
* de produccion; es decir, a crear las versiones `dist` de los archivos usados 
* en la aplicacion. 
*/
gulp.task('distify', [], function(){
        console.log("@@@ Running Distify task @@@");
        var IIFE_OPENING = "(function(){\n";
        var IIFE_CLOSING = "\n})();";
        
        /////// genero una version concatenada no minificada
        gulp.src(ORDERED_ALL)
            .on('error', gutil.log)
            .pipe(insert.wrap(IIFE_OPENING, IIFE_CLOSING))
            .on('error', gutil.log)
            .pipe(concat("datary-angular-sdk.js"))
            .on('error', gutil.log)
            .pipe(gulp.dest(DIST_FOLDER))
            .on('error', gutil.log);

        
        ////// genero otra version concatenada y minificada
        gulp.src(ORDERED_ALL)
            .on('error', gutil.log)
            .pipe(insert.wrap(IIFE_OPENING, IIFE_CLOSING))
            .on('error', gutil.log)
            .pipe(uglify())
            .on('error', gutil.log)
            .pipe(concat("datary-angular-sdk.min.js"))
            .on('error', gutil.log)
            .pipe(gulp.dest(DIST_FOLDER))
            .on('error', gutil.log);
    }
);




/******************************************************************************
* @name publish
* @type task
* @description
*/
gulp.task('publish', [], function(){
        console.log("@@@ Running Publish task @@@");
        
        //obtencion de la version de la release
        var VERSION;
        if (!argv.version) {
            VERSION = "latest";
            console.log("Using default version: %s", VERSION);
        } else if (argv.version === "semver") {
            VERSION = require("./package.json").version;
            console.log("Using package version: %s", VERSION);
        } else {
            VERSION = argv.version;
            console.log("Using specified version: %s", VERSION);
        }
        
        
        var OPERATIONS = [uploadMinifiedVersion, uploadFullVersion];
        async.series(OPERATIONS, function(e, r){
                if (e) console.log("@@@ Error on Publish task @@@");
                else console.log("@@@ Completed Publish task @@@");
            }
        );
        
        
        /////// VERSION ORIGINAL
        function uploadFullVersion(signal){
            //AWS configuration
            var s3 = new AWS.S3();
            var PARAMS = {
                Bucket: "prometeo",
                ACL: "public-read",
                Key: "lib/datary-angular-sdk/" + VERSION + "/datary-angular-sdk.js",
                Body: null,
            };
            
            //Read in the file, convert it to base64, store to S3
            fs.readFile('./dist/datary-angular-sdk.js', function (err, data) {
                    if (err) { signal(err, null) }
                    //creo un buffer
                    var B64_DATA = new Buffer(data, 'binary');
                    //configuro los params con el buffer
                    PARAMS.Body = B64_DATA;
                    //envio la peticion
                    s3.putObject(PARAMS, function(err, data) {
                            if (err) {
                                console.log(err, err.stack); 
                                signal(err, null);
                            } else {
                                console.log(data);
                                signal(null, true);
                            }
                        }
                    );
                }
            );
        
        }
        
        
        
        /////// VERSION MINIFICADA
        function uploadMinifiedVersion(signal){
            //AWS configuration
            var s3 = new AWS.S3();
            var PARAMS = {
                Bucket: "prometeo",
                ACL: "public-read",
                Key: "lib/datary-angular-sdk/" + VERSION + "/datary-angular-sdk.min.js",
                Body: null,
            };
            
            // Read in the file, convert it to base64, store to S3
            fs.readFile('./dist/datary-angular-sdk.min.js', function (err, data) {
                    if (err) { signal(err, null) }
                    //creo un buffer
                    var B64_DATA = new Buffer(data, 'binary');
                    //configuro los params con el buffer
                    PARAMS.Body = B64_DATA;
                    //envio la peticion
                    s3.putObject(PARAMS, function(err, data) {
                            if (err) {
                                console.log(err, err.stack);
                                signal(err, true);
                            } else {
                                console.log(data);
                                signal(null, true);
                            }
                        }
                    );
                }
            );
        }
    }
);