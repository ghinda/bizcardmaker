/* PDF generation for final printing.
 */

window.GeneratePdf = (function () {
  'use strict';

  var config =  {
    card: [ 3.75, 2.25 ],
    margin: 0.35,
    trim: 0.125
  };

  var cardWidth = config.card[0];
  var cardHeight = config.card[1];

  var trim = config.trim;
  var trimWithMargin = trim + config.margin;
  var marginWithoutTrim = config.margin - trim;
  var trimSubstract = 0.06;

  var trimLines = [
    // top left
    {
      x: trimWithMargin,
      y: trimSubstract,
      x1: trimWithMargin,
      y1: trimWithMargin - trimSubstract
    },
    {
      x: trimSubstract,
      y: trimWithMargin,
      x1: trimWithMargin - trimSubstract,
      y1: trimWithMargin
    },

    // top right
    {
      x: cardWidth + marginWithoutTrim,
      y: trimSubstract,
      x1: cardWidth + marginWithoutTrim,
      y1: trimWithMargin - trimSubstract
    },
    {
      x: cardWidth + marginWithoutTrim + trimSubstract,
      y: trimWithMargin,
      x1: cardWidth + (config.margin * 2) - trimSubstract,
      y1: trimWithMargin
    },

    // bottom left
    {
      x: trimWithMargin,
      y: cardHeight + marginWithoutTrim + trimSubstract,
      x1: trimWithMargin,
      y1: cardHeight + (config.margin * 2) - trimSubstract
    },
    {
      x: trimSubstract,
      y: cardHeight + marginWithoutTrim,
      x1: trimWithMargin - trimSubstract,
      y1: cardHeight + marginWithoutTrim
    },

    // bottom right
    {
      x: cardWidth + marginWithoutTrim,
      y: cardHeight + marginWithoutTrim + trimSubstract,
      x1: cardWidth + marginWithoutTrim,
      y1: cardHeight + (config.margin * 2) - trimSubstract
    },
    {
      x: cardWidth + marginWithoutTrim + trimSubstract,
      y: cardHeight + marginWithoutTrim,
      x1: cardWidth + (config.margin * 2) - trimSubstract,
      y1: cardHeight + marginWithoutTrim
    }
  ];

  return function(name, imgData) {
    var doc = new jsPDF('landscape', 'in', [
      cardWidth + config.margin * 2,
      cardHeight + config.margin * 2
    ]);

    doc.addImage(imgData, 'JPEG', config.margin, config.margin, cardWidth, cardHeight);

    // write the trim lines
    trimLines.forEach(function(line) {
      doc.setLineWidth(0.01);
      doc.line(line.x, line.y, line.x1, line.y1);
    });

    doc.save(name);
  };
}());
