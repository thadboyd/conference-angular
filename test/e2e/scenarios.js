'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Conference App', function() {
  
  it('should redirect index.html to index.html#/schedule', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toBe('/schedule');
    });
  });
  
  describe('sponsor view', function() {
    beforeEach(function() {
      browser.get('app/index.html#/sponsors');
    });
    
    it('should display 3 levels of sponsorship', function() {
	var sponsor_lists = element.all(by.repeater('(level, sponsor_list) in sponsors'));
	expect(sponsor_lists.count()).toBe(3);
    });
  });
  
});