# generator-gulp-angular-sp 0.1.2

Offers you a Yeoman generator to initiate a sharePoint application with Angular powered by GulpJS.

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

First of all - use [gulpfile](app/templates/_gulpfile.js) to provide sharePoint specific values:

  * `mappedSpDir:'z:\\pathToAppFolder\\', // set mapped drive or hive and folder, where app will be *REQUIRED `
  * `spAppDir:'/SiteAssets/app/', // set path to app after _spPageContextInfo.webServerRelativeUrl *REQUIRED`
  * `anchorElementId:'' // set id of element to contain app, if empty - it will be body`

Now you got 2 gulp tasks:
 * `gulp build-sp` - will build and move output to mappedSpDir
 * `gulp watch-sp` - will check for src js files changes and and copy this files to mappedSpDir
 
Finally, you got your app in SharePoint evniroment, in order to attach it to the page - all you need is to add:
 * `<script type"text/javascript" src="PUT_PATH_OF_YOUR_APP_HERE/entry.js"></script>`

Thats it. Entry.js will get all this you need to the page. Most of features of original generator-gulp-angular are supported.

### Roadmap
* Gulp task to build minified version
* BrowserSync
* Typescript
* Enhance prompt with SharePoint specific items
* Test coverage
* MDS support

### Known Issues
* In Visual Studio - dont use Windows line endings - it will break gulp test. You can use https://visualstudiogallery.msdn.microsoft.com/545e56a7-98d7-47f9-9d84-4681f2903060 to convert it.