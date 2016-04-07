/******************************************************************************
 * This file is used to build dySDK from `src/*`
 *
 * Installation:
 * 1. Install Gulp (`npm install -g gulp`)
 *
 * Build:
 * Execute `grunt` from root directory of this directory (where gulpfile.js is)
 *
 * Result:
 * building dySDK will create files:
 *  - dist/dySDK.js
 *  - dist/dySDK.min.js
 *
 * See http://
 ******************************************************************************/
var gulp            = require('gulp')
,   argv            = require('yargs').argv
,   async           = require('async')
,   jshint          = require('gulp-jshint')
,   concat          = require('gulp-concat')
,   uglify          = require('gulp-uglify')
,   fs              = require('fs')
,   AWS             = require('aws-sdk')
;



//http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Credentials_from_Disk
AWS.config.loadFromPath('./.awsrc');
AWS.config.update({region: 'eu-central-1'});
var SRC_FILES = ["src/*.js"];
//ficheros ordenados 
var ORD_SRC_FILES = [
    "src/dy-sdk.module.js",
    "src/token-interceptor.factory.js",
    "src/datary.factory.js",
    "src/search.factory.js",
    "src/connection.service.js",
    "src/member.service.js",
    "src/repo.service.js",
    "src/working-dir.service.js",
    "src/commit.service.js",
    "src/tree.service.js",
    "src/dataset.service.js",
    "src/tag.service.js",
    "src/head.service.js",
];
var ORD_DEP_FILES = [
    "bower_packages/ng-file-upload/ng-file-upload.min.js",
];
var ORD_ALL = ORD_DEP_FILES.concat(ORD_SRC_FILES);
var DIST_FOLDER = "./dist/";



/******************************************************************************
* @name lint
* @type task
* @description
*/
gulp
    .task(
        'lint', 
        [],
        function(){
            console.log("@@@ Running Lint Task @@@");
            gulp
                .src(SRC_FILES)
                .pipe(jshint("./.jshintrc"))
                .pipe(jshint.reporter('default'));
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
gulp
    .task(
        'distify', 
        [],
        function(){
            console.log("@@@ Running Distify task @@@");
            
            /////// genero una version concatenada no minificada
            try {
                gulp
                    .src(ORD_ALL)
                    .pipe(concat("dy-angular-sdk.js"))
                    .pipe(gulp.dest(DIST_FOLDER));
            } catch(err) {
                throw new Error("Error on @Vanilla JS");
            }
            
            ////// concateno y minifico
            try {
                gulp
                    .src(ORD_ALL)
                    .pipe(uglify())
                    .pipe(concat("dy-angular-sdk.min.js"))
                    .pipe(gulp.dest(DIST_FOLDER));
            } catch(err) {
                throw new Error("Error on @Vanilla JS");
            }
            
            console.log("@@@ Completed Distify task @@@");
        }
    );



/******************************************************************************
* @name publish
* @type task
* @description
*/
gulp
    .task(
        'publish', 
        [],
        function(){
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
            
            
            async.series(
                [
                    uploadMinifiedVersion,
                    uploadFullVersion
                ],
                function(e, r){
                    if (e) {
                        console.log("@@@ Error on Publish task @@@");
                    } else {
                        console.log("@@@ Completed Publish task @@@");
                    }
                }
            );
            
            
            /////// VERSION ORIGINAL
            function uploadFullVersion(signal){
                //AWS configuration
                var s3 = new AWS.S3();
                var PARAMS = {
                    Bucket: "prometeo",
                    ACL: "public-read",
                    Key: "lib/dy-angular-sdk/" + VERSION + "/dy-angular-sdk.js",
                    Body: null,
                };
                
                //Read in the file, convert it to base64, store to S3
                fs.readFile('./dist/dy-angular-sdk.js', function (err, data) {
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
                    Key: "lib/dy-angular-sdk/" + VERSION + "/dy-angular-sdk.min.js",
                    Body: null,
                };
                
                // Read in the file, convert it to base64, store to S3
                fs.readFile('./dist/dy-angular-sdk.min.js', function (err, data) {
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