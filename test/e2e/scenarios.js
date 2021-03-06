'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Conference App', function() {
  
  it('should redirect index.html to index.html#/schedule', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
      expect(url).toBe('/schedule');
    });
  });
  
  it('should bring up the Libraries modal when you click on the Libraries link in the footer', function() {
    browser.get('app/index.html');
    element(by.linkText('libraries')).click();
    
    expect(element(by.css('.reveal-modal h2')).getText()).toBe('LIBRARIES');
  });
  
  describe('schedule view', function() {
    beforeEach(function() {
      browser.get('app/index.html#/schedule');
    });
    
    it('should list "Promoting viability" as fourth header under March 31', function() {
      expect(element(by.css('section[id="03-31"] li:nth-child(4) h3')).getText()).toBe('Promoting viability');
    });
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
      //expect(sponsor_lists['Bronze', 1]).toBe('Brawndo');
      expect(element(by.css('.columns:last-child li:nth-child(2)')).getText()).toBe('Brawndo');
    });
  });
  
  describe('register view', function() {
    function hasClass (selector, class_name) {
      // returns true/false depending if selector has class name

      // split classes for selector into a list
      return $(selector).getAttribute('class').then(function(classes){
	var classes = classes.split(' ');
	if (classes.indexOf(class_name) > -1) return true;
	return false;
      });
    }
    
    beforeEach(function() {
      browser.get('app/index.html#/register');
    });
    
    describe('Name field', function() {
      it('should produce an error if Name field is left empty', function() {
	expect(hasClass('#name', 'ng-valid')).toBe(false);
	expect(hasClass('#name', 'ng-invalid')).toBe(true);
	expect((element(by.css('#errorName'))).isDisplayed()).toBeTruthy;
      });
      
      it('should produce success if any text is added to Name field', function() {
	var nameField = element(by.css('#name'));
	nameField.sendKeys('foo', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(hasClass('#name', 'ng-valid')).toBe(true);
	expect(hasClass('#name', 'ng-invalid')).toBe(false);
	expect((element(by.css('#errorName'))).isDisplayed()).toBeFalsy;
      });
    }); // Name field
    
    describe('Phone field', function() {
      var phoneField = element(by.css('#phone'));
      it('should produce an error if phone number is invalid', function() {
	phoneField.sendKeys('123', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(hasClass('#phone', 'ng-valid')).toBe(false);
	expect(hasClass('#phone', 'ng-invalid')).toBe(true);
	expect((element(by.css('#errorPhone'))).isDisplayed()).toBeTruthy;
      });
      
      it('should produce success if 10 or more digits are entered', function() {
	phoneField.sendKeys('1234567890000', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(hasClass('#phone', 'ng-valid')).toBe(true);
	expect(hasClass('#phone', 'ng-invalid')).toBe(false);
	expect((element(by.css('#errorPhone'))).isDisplayed()).toBeFalsy;
      });
      
      it('should ignore invalid characters and apply mask (999) 999-9999', function() {
	phoneField.sendKeys('foo(123)!@#456-bar78900000baz', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(element(by.css('#phone')).getAttribute('value')).toBe('(123) 456-7890');
      });
    }); // Phone field
    
    describe('Email field', function() {
      var emailField = element(by.css('#email'));
      
      it('should produce an error if email is invalid', function() {
	emailField.sendKeys('foo', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(hasClass('#email', 'ng-valid')).toBe(false);
	expect(hasClass('#email', 'ng-invalid')).toBe(true);
	expect((element(by.css('#errorEmail'))).isDisplayed()).toBeTruthy;
      });
      
      it('should produce success if email is valid', function() {
	emailField.sendKeys('foo@example.com', protractor.Key.TAB); // tab blurs input and triggers validation
	expect(hasClass('#email', 'ng-valid')).toBe(true);
	expect(hasClass('#email', 'ng-invalid')).toBe(false);
	expect((element(by.css('#errorEmail'))).isDisplayed()).toBeFalsy;
      });
    }); // Email field
    
    describe('Date checkbox group', function() {
      it('should produce an error if no dates are checked and Submit is clicked', function() {
	element(by.css('[type="submit"]')).click();
	expect((element(by.css('#errorDays'))).isDisplayed()).toBeTruthy;
      });
      
      it('should produce a total price of $185.50 if two dates are selected', function () {
	element(by.css('[value="04-01"]')).click();
	element(by.css('[value="04-02"]')).click();
	expect(element(by.css('#totalPrice .currency')).getText()).toBe('$185.50');
      });
    }); // Date checkbox group
    
    describe('Success', function() {
      beforeEach(function() {
	var nameField = element(by.css('#name'));
	var phoneField = element(by.css('#phone'));
	var emailField = element(by.css('#email'));
	var april1Checkbox = element(by.css('[value="04-01"]'));
	var submitBtn = element(by.css('[type="submit"]')).click();
	
	nameField.sendKeys('foo');
	phoneField.sendKeys('1234567890');
	emailField.sendKeys('foo@example.com');
	
	april1Checkbox.click();
	
	submitBtn.click();
      });
      
      it('should succeed if valid name, phone, and email are entered and a date is selected', function() {
	expect((element(by.css('#thankyou'))).isDisplayed()).toBeTruthy;
      });
      
      it('should produce a modal with accurate data', function() {
	element(by.css('[ng-click="open(user)"]')).click();
	expect(element(by.css('.reveal-modal h2')).getText()).toBe('SUBMITTED FORM DATA');
	expect(element(by.css('#name')).getText()).toBe('foo');
	expect((element(by.css('[ng-if="data.reg0401"]'))).isDisplayed()).toBeTruthy;
      });
    }); // Success
  });
});
