var casper = require('casper').create();

casper.echo(casper.cli.get('LOGIN_ENTRY'));
casper.echo(casper.cli.get('COOKIE_NAME'));
casper.echo(casper.cli.get('COOKIE_VALUE'));

const cookieName = casper.cli.get("COOKIE_NAME")
const cookieValue = casper.cli.get("COOKIE_VALUE")
const domain = casper.cli.get("LOGIN_ENTRY")

var cookie = cookieName +'='+ cookieValue;
cookie.split(";").forEach(function(pair){
    pair = pair.split("=");
    phantom.addCookie({
      'name': pair[0],
      'value': pair[1],
      'domain': domain,
    });
});

casper.start('https://pqt.ttt.nat.gov.tw/Home');

casper.then(function() {
  this.echo('First Page: ' + this.getTitle());
});

casper.then(function() {
  casper.capture('screenshots/amazon-search-1.png');
});

// casper.thenOpen('http://phantomjs.org', function() {
//     this.echo('Second Page: ' + this.getTitle());
// });

casper.run();