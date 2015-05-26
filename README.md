# generator-gulp-angular-sp 0.1.1

Offers you a Yeoman generator to initiate a sharepoint application with Angular powered by GulpJS.

## Usage

### Create your project

Install the required tools: `yo`, `gulp`, `bower`
```
npm install -g yo gulp bower
```

Install `generator-gulp-angular-sp`:
```
npm install -g generator-gulp-angular-sp
```

Make a new directory, and `cd` into it:
```
mkdir my-new-project && cd $_
```

Run `yo gulp-angular`, optionally passing an app name:
```
yo gulp-angular-sp [app-name]
```

### Original info
[here](README.original.md)

### SharePoint specific features

This is early version, so you must consider it could be pain in the ass to use.
First of all - use [gulpfile](app/templates/_gulpfile.js) to provide sharePoint specific values:

  * `mappedSpDir:'z:\\pathToAppFolder\\', // set mapped drive or hive and folder, where app will be *REQUIRED `
  * `spAppDir:'/SiteAssets/app/', // set path to app after _spPageContextInfo.webServerRelativeUrl *REQUIRED`
  * `anchorElementId:'' // set id of element to contain app, if empty - it will be body`

Now you got 2 gulp tasks:
 * `gulp build-sp` - will build and move output to mappedSpDir
 * `gulp watch-sp` - will check for src js files changes and and copy this files to mappedSpDir
 
Now, you got your app in SharePoint evniroment, in order to attach it to the page - all you need is to add:
 * `<script type"text/javascript" src="PUT_PATH_OF_YOUR_APP_HERE/entry.js"></script>`

Thats it. Entry.js will get all this you need to the page. Most of features of original generator-gulp-angular are supported.

### Roadmap
* Fix prompt
* Gulp task to build minified version
* BrowserSync
* Typescript
* Enhance prompt with SharePoint specific items
* Test coverage


### Known Issues
* In Visual Studio - dont use Windows line endings - it will break gulp test