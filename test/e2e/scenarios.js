'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Conference App', function() {
  
  it('should redirect index.html to index.html#/schedule', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toBe('/schedule');
    });
  });
  
  it('should bring up the Libraries modal when you click on the third link in the footer', function() {
    browser.get('app/index.html');
    element(by.css('#creditnav li:nth-child(3) a')).click();
    
    expect(element(by.css('.reveal-modal h2')).getText()).toBe('LIBRARIES');
  });
  
  describe('sponsor view', function() {
    var sponsor_lists;
    
    beforeEach(function() {
      browser.get('app/index.html#/sponsors');
      sponsor_lists = element.all(by.repeater('(level, sponsor_list) in sponsors'));
    });
    
    it('should display 3 levels of sponsorship', function() {
      expect(sponsor_lists.count()).toBe(3);
    });
    
    it('should display Gold Sponsors first', function() {
      expect(element(by.css('.columns:first-child h2')).getText()).toBe('GOLD SPONSORS');
    });

    it('should display Brawndo as the second sponsor under the last header', function() {
      expect(element(by.css('.columns:last-child li:nth-child(2)')).getText()).toBe('Brawndo');
    });
  });
  
});
