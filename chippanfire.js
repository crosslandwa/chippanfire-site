const { renderFile } = require('ejs')
const fs = require('fs')
const absoluteLinks = true
const href = path => (absoluteLinks ? '' : 'https://www.chippanfire.com/') + path
const renderPage = page => new Promise((resolve, reject) => {
  renderFile('templates/page.ejs', page, {}, (err, str) => err ? reject(err) : resolve({ content: str, file: page.file }))
})


const musicPage = {
  content: {
    title: 'Music'
  },
  href: href('music.html'),
  template: 'music'
}

const softwarePage = {
  content: {
    title: 'Software'
  },
  href: href('software.html')
}

const homePage =  {
  content: {
    music: { href: musicPage.href },
    software: { href: softwarePage.href }
  },
  href: href('index.html'),
  template: 'index'
}

const errorPage = {
  content: {
    title: 'Not Found 40404040404'
  },
  href: href('error.html'),
  template: 'error'
}

const baseData = {
  assetsBaseUrl: href('assets'),
  image: path => `${href('assets/images')}/${path}`,
  navigation: {
    homePageUrl: homePage.href,
    items: [
      { href: musicPage.href, title: musicPage.content.title }
    ]
  }
}

const pages = [
  Object.assign({}, baseData, homePage, { file: 'index.html' }),
  Object.assign({}, baseData, errorPage, { file: 'error.html' }),
  Object.assign({}, baseData, musicPage, { file: 'music.html' }),
]

module.exports = {
  fileMap: [/* sync. returns list of files with 'chunks' an template file name */],
  renderTemplates: () => Promise.all(pages.map(renderPage))
}
