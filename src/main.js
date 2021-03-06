import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Home from './home'
import MaxForLiveDevices from './max-for-live'
import MiniakPatchEditor from './miniak-patch-editor'
import WacNetworkMidi from './wac-network-midi'
import Error from './error'
import { readFile, writeFile } from './files/'
import path from 'path'

const html = css => component => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="description" content="A site for the music and software of Will Crossland.">
    <link rel="shortcut icon" type="image/x-icon" href="data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAAVdb4AK3V7ABdqucAttnrAF2w6ADu7e4A6+vrAFai6QBcs+gAsdjsAOvt7QDt7e0AvdHtAHV1dQCiyecApdDtAKXW7gDv7+8AibjtAOrs7gCcw+UA7OzuAGiz7gDt7O4AYr7rAE3U+QBkqecA6OjoAHGt7QCX0ekA6+ztAO7s7QDO2+wA6urqAH2z7gBjp+MAc7nuAKTF7QBiy/cA7OzsAF2l7QBfyusAstntAGip7ACh1e0AnNLsAFnH9wCVvuwAOzs7AIe+6gBQoeUAxdbsAGGu7QCyy+0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxMTEAMTEAAAAxMQAAAAAxDAwoMSgoMQAxMwkxAAAxKAwMKDEMKDEAMQgFMQAAMSgiHCgxKCgxADEpAzEAADEMKDExMSgoMQAxLCQxAAAxDCgxADEMKDEAMR0bMTEAMQwoMQAxKCgxADEjNRkqMTEMKDEAMQwMCzExExcvGjExKCgxADEoEigUMTAlJwExMQwoMQAxKCgxFjEmMjExADEMKDEAMSgoMSgONhUxAAAxKCgxMTEoKDEgDg0PMTEAMSgHIigxKAcLHzE0EC4eMTEoDAwoMQwMCwYxIQIRLTEAMQwoKDEMKBgxADEEKwoxAAAxMTEAMTExAAAAMTExAMTnAACAQwAAAEMAAABDAAAAQwAACEEAAAhAAAAIAAAACAAAAAgBAAAIAwAAAAEAAAAAAAAAAAAAgCAAAMRxAAA=">
    <title>chippanfire.com</title>
    <style>
${css}
    </style>
  </head>
  <body>
    ${ReactDOMServer.renderToStaticMarkup(component)}
  </body>
</html>
`

const writeFileToDist = filename => writeFile(path.resolve('dist', filename))

readFile(path.resolve('src', 'app.css'))
  .then(html)
  .then(render => Promise.all([
    Promise.resolve(<Home />).then(render).then(writeFileToDist('index.html')),
    Promise.resolve(<Error />).then(render).then(writeFileToDist('error.html')),
    Promise.resolve(<MaxForLiveDevices />).then(render).then(writeFileToDist('max-for-live-devices.html')),
    Promise.resolve(<MiniakPatchEditor />).then(render).then(writeFileToDist('miniak-patch-editor.html')),
    Promise.resolve(<WacNetworkMidi />).then(render).then(writeFileToDist('wac-network-midi.html')),
    Promise.resolve('User-agent: *\nDisallow:').then(writeFileToDist('robots.txt'))
  ]))
