var casper = require('casper').create({
  verbose: true,
  logLevel: "debug"
});

casper.echo(casper.cli.get('LOGIN_ENTRY'));
casper.echo(casper.cli.get('COOKIE_NAME'));
casper.echo(casper.cli.get('COOKIE_VALUE'));

const cookieName = casper.cli.get("COOKIE_NAME")
const cookieValue = casper.cli.get("COOKIE_VALUE")
const domain = casper.cli.get("LOGIN_ENTRY")

var cookie = cookieName +'='+ cookieValue;

const url = process.env.LOGIN_ENTRY

cookie.split(";").forEach(function(pair){
    pair = pair.split("=");
    phantom.addCookie({
      'name': pair[0],
      'value': pair[1],
      'domain': domain,
    });
});

casper.start(url);

casper.then(function() {
  this.echo('First Page: ' + this.getTitle());
});

casper.then(function(){
  this.evaluate(function() {
      document.querySelector('select.country').selectedIndex = 3;
  });
  this.capture('screenshots/1.png');
});

casper.then(function(){
  this.evaluate(function() {
      document.querySelector('input.sectioncode').value = 1;
  });
  this.capture('screenshots/2.png');
});

casper.then(function(){
  this.click('#RBUILD');
  this.capture('screenshots/2.png');
});

casper.then(function(){
  this.evaluate(function() {
      document.querySelector('#number').value = 1;
  });
  this.capture('screenshots/3.png');
});

// casper.then(function(){
//   this.sendKeys('#demo-input', casper.page.event.key.Enter , {keepFocus: true});

//   this.click('a.d_btn.font01');
// });

casper.then(function(){
  this.evaluate(function() {
    console.log(' -=-=-=-=-=-=-=')
    console.log(document.querySelector('a'))
      document.querySelector('a.d_btn.font01').click()
  });
  this.capture('screenshots/4.png');
});
casper.on('remote.message', function(msg) {
  this.echo(msg);
})

casper.then(function() {
  casper.capture('screenshots/done.png');
});

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo('Second Page: ' + this.getTitle());
// });

casper.run();