const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

const staticPath = path.resolve(__dirname, '../../static/');

const defaultHtmlTemplate = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
  </head>
  <body>
    Sorry web-app was not builded successfully
    <script type="text/javascript" src="bundle.js"></script>
  </body>
  </html>
`

const defaultScriptTemplate = `
  alert('Sorry web-app was not builded successfully')
`

function getWebApplication() {
  let appStatic = ''
  const expectedApp = `${staticPath}/index.html`
  if(fs.existsSync(expectedApp)) {
    appStatic += fs.readFileSync(expectedApp, {encoding: 'utf8'})
  } else {
    appStatic += defaultHtmlTemplate
  }
  return appStatic
}

function getStatic(pathMap) {
  let appStatic = ''
  const expetedPath = `${staticPath}/${pathMap}`


  if(fs.existsSync(expetedPath)) {
    appStatic += fs.readFileSync(expetedPath, {encoding: 'utf8'})
  } else {
    appStatic += defaultScriptTemplate
  }
  return {appStatic, contentType: mime.contentType(appStatic)}
}

function getStaticScripts(ctx) {
  const {appStatic, contentType} = getStatic(ctx.request.url);
  ctx.header['Content-Type'] = contentType;
  ctx.status = 200;
  ctx.body = appStatic;
  return ctx
}

function getStaticHtml(ctx) {
  ctx.header['Content-Type'] = 'text/html'
  ctx.status = 200
  ctx.body = getWebApplication()
  return ctx
}

module.exports = {
  getStaticScripts,
  getStaticHtml
}
