'use strict';

angular.module('<%= appName %>', [<%= modulesDependencies %>]).constant('options', new (function()
{
    this.spAppDir="";
    this.spAppDirImages =  this.spAppDir + '/assets/images/';
})())<%= routerJs %>;
