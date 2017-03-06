const { renderFile } = require('ejs')
const fs = require('fs')
const absoluteLinks = true
const href = path => (absoluteLinks ? '' : 'https://www.chippanfire.com/') + path
const renderPage = page => new Promise((resolve, reject) => {
  renderFile('templates/page.ejs', page, {}, (err, str) => err ? reject(err) : resolve({ content: str, file: page.file }))
})
const addHref = page => page.href ? page : Object.assign({}, page, { href: href(page.file) })

const musicPage = {
  content: {
    title: 'Music'
  },
  file: 'music.html',
  template: 'music'
}

const m4lPage = {
  content: {
    title: 'Max For Live Devices'
  },
  file: 'max-for-live-devices.html',
  strapline: 'A collection of Max For Live devices I have made',
  template: 'm4l-devices'
}

const kmkScriptPage = {
  content: { title: 'KMK Control Script' },
  external: true,
  href: 'https://github.com/crosslandwa/kmkControl',
  strapline: 'In-depth control of Ableton Live using the Korg Microkontrol'
}

const cpfPage = {
  content: { title: 'ChipPanFire Source' },
  external: true,
  href: 'https://github.com/crosslandwa/chippanfire-site',
  strapline: 'Totally meta, see the source code for generating this site!'
}

const wacNetworkMidiPage = {
  content: { title: 'Wac Network MIDI' },
  file: 'wac-network-midi.html',
  strapline: 'Cross-platform (Win/OS X) tool for transmitting MIDI between computers',
  template: 'content-wac-network-midi'
}

const softwarePage = {
  content: {
    linked: [ m4lPage, wacNetworkMidiPage, kmkScriptPage, cpfPage ].map(addHref),
    title: 'Software'
  },
  file: 'software.html',
  template: 'software'
}

const homePage =  {
  content: {
    music: { href: href(musicPage.file) },
    software: { href: href(softwarePage.file) }
  },
  file: 'index.html',
  template: 'index'
}

const contactPage = {
  content: { title: 'Contact' },
  file: 'contact.html',
  template: 'contact'
}

const errorPage = {
  content: {
    title: 'Not Found 40404040404'
  },
  file: 'error.html',
  scripts: ['assets/error-page.js'],
  template: 'error'
}

const navItem = page => Object.assign({}, { href: addHref(page).href, title: page.content.title, external: !!page.external })

const baseData = {
  assetsBaseUrl: href('assets'),
  image: path => `${href('assets/images')}/${path}`,
  navigation: {
    homePageUrl: href(homePage.file),
    items: [
      navItem(musicPage),
      Object.assign(navItem(softwarePage), { dropdown: softwarePage.content.linked.map(navItem) }),
      navItem(contactPage)
    ]
  }
}

const pages = [ homePage, errorPage, musicPage,
  softwarePage, m4lPage, contactPage, wacNetworkMidiPage ]
  .map(page => Object.assign({}, addHref(page), baseData))

module.exports = {
  pages: pages.map(page => { return { file: page.file, scripts: page.scripts || [] } }),
  renderTemplates: () => Promise.all(pages.map(renderPage))
}
