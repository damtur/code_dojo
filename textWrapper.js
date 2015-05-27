"use strict";

var expect = require('chai').expect;
var newline = '<br>';
describe('Text Wrapping', function() {

  describe('Short text', function(){
    it('when empty wrapped is empty text', function() {
      var columnWidth = 80;
      var textToWrap = '';
      var emptyString = '';
      var wrappedString = wrap(textToWrap, columnWidth);
      expect(wrappedString).to.equal(emptyString);
    });

    it('when wrapped is same text', function() {
      var columnWidth = 80;
      var textToWrap = 'Test text';
      var wrappedString = wrap(textToWrap, columnWidth);
      expect(wrappedString).to.equal(textToWrap);
    });
  });


  describe('Text with length longer then column width', function(){


    function createTestWithColums(columnWidth) {
      it('when wrapped contains newline character (columnWidth=' + columnWidth + ')', function() {
        var textToWrap = '123456789012345';
        var wrappedString = wrap(textToWrap, columnWidth);
        expect(wrappedString).to.contain('\n');
      });


      it('when wrapped length of first line is equal to column width (columnWidth=' + columnWidth + ')', function() {
        var textToWrap = '123456789012345';
        var wrappedString = wrap(textToWrap, columnWidth);
        expect(wrappedString.indexOf('\n')).to.equal(columnWidth);
      });

      it('when wrapped contains all characters from initial text (columnWidth=' + columnWidth + ')', function() {
        var textToWrap = '123456789012345';
        var wrappedString = wrap(textToWrap, columnWidth);
        expect(wrappedString.replace('\n', '')).to.equal(textToWrap);
      });
    };

    for (var columnWidth = 10; columnWidth <= 12; columnWidth++) {
      createTestWithColums(columnWidth);
    }
  });

  describe('Text with length more than twice the column width', function(){
    it('when wrapped contains 2 newline characters', function() {
      var columnWidth = 5;
      var textToWrap = '1234567890123';
      var wrappedString = wrap(textToWrap, columnWidth);

      var newlineCount = (wrappedString.match(/\n/g) || []).length;
      expect(newlineCount).to.equal(2);
    });

    it('when wrapped is split by word', function() {
      var columnWidth = 5;
      var textToWrap = '123 456 789 0123';
      var expected = '123\n456\n789\n0123'
      var wrappedString = wrap(textToWrap, columnWidth);
      expect(wrappedString).to.equal(expected);
    });

    it('will remove trailing spaces after enter', function() {
      var columnWidth = 5;
      var textToWrap = '123        54 23';
      var expected = '123\n54 23';
      var wrappedString = wrap(textToWrap, columnWidth);
      expect(wrappedString).to.equal(expected);
    });
  });
});



//**** solution ****//
if (!String.prototype.trim) {  
  String.prototype.trim = function () {  
    return this.replace(/^\s+|\s+$/g,'');  
  };  
} 

function getSplitPosition(text, columnWidth) {
  var positionToSplit = text.substring(0, columnWidth).lastIndexOf(' ');
  if (positionToSplit == -1) return columnWidth;
  return positionToSplit;
}

function wrap(text, columnWidth) {
  var output = '';
  var remainingText = text;

  while (remainingText.length > columnWidth) {
    var positionToSplit = getSplitPosition(remainingText, columnWidth);
    output += remainingText.substring(0, positionToSplit).trim() + '\n';
    remainingText = remainingText.substring(positionToSplit).trim();
  } 
  output += remainingText;

  return output;
}