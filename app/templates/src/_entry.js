(function() {
  'use strict';

  angular
    .module('<%= appName %>', [<%= modulesDependencies %>])<%= routerJs %>
})();
/**
 * Created by Dima on 10.05.2015.
 */
(function() {
  var headEl = document.getElementsByTagName('head')[0],
  body = true;
  var appContainer = document.createElement('div');
  appContainer.innerHTML = '<div ng-app="<%= appName %>"><div ui-view></div></div>';
  var container = document.getElementById('ng-app-container');
  if (container) {
    container.appendChild(appContainer);
  } else {
    document.body.appendChild(appContainer);
  }
  
  var scripts, styles;
  var spAppDir = "";
  var opts=
  {
    vendor:[
      _spPageContextInfo.webServerRelativeUrl + spAppDir + "scripts/vendor.js"
    ],
    vendorCss:[
      _spPageContextInfo.webServerRelativeUrl + spAppDir + "styles/vendor.css"
    ],
    scripts:[

    ],
    styles:[

    ]
  }
  for (var i = 0; i < opts.vendor.length; i++){
    script = opts.vendor[i];
    addTag('script', {src: script}, body);
  }
  for (var i = 0; i < opts.vendorCss.length; i++){
    style = opts.vendorCss[i];
    addTag('link', {rel: 'stylesheet', href: style, type: 'text/css'}, false);
  }
  for (var i = 0; i < opts.scripts.length; i++){
    script = opts.scripts[i];
    addTag('script', {src: script }, body);
  }
  for (var i = 0; i < opts.styles.length; i++){
    style = opts.styles[i];
    addTag('link', {rel: 'stylesheet', href: style, type: 'text/css'}, false);
  }


  function addTag(name, attributes, sbody) {
    var el = document.createElement(name),
      attrName;

    for (attrName in attributes) {
      el.setAttribute(attrName, attributes[attrName]);
    }

    sbody ? document.write(outerHTML(el)) : headEl.appendChild(el);
      //document.body.appendChild(el) : headEl.appendChild(el);//
  }

  function outerHTML(node){
    // if IE, Chrome take the internal method otherwise build one
    return node.outerHTML || (
        function(n){
          var div = document.createElement('div'), h;
          div.appendChild(n);
          h = div.innerHTML;
          div = null;
          return h;
        })(node);
  }
})();
