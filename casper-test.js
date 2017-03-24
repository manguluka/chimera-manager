const casper = require('casper').create()
casper.start('https://www.facebook.com/groups/chimera.art.space/events/')

casper.then(function () {
  this.echo('First Page: ' + this.getTitle())
  if (this.exists('h1.page-title')) {
    this.echo('the heading exists');
  }
  //this.click('')
  this.capture('facebook.png', {
    top: 0,
    left: 0,
    width: 900,
    height: 900
  })
})

casper.run()
