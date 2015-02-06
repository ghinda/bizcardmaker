var $imgOrig = document.querySelectorAll('.img-orig');

var getDataUrl = function($img){ 
  
  // create an empty canvas element
  var canvas = document.createElement("canvas");
  var canvasContext = canvas.getContext("2d");
  
  //Set canvas size is same as the picture
  canvas.width = $img.width;
  canvas.height = $img.height;

  // draw image into canvas element
  canvasContext.drawImage($img, 0, 0, $img.width, $img.height);

  // get canvas contents as a data URL (returns png format by default)
  var dataURL = canvas.toDataURL();

  return dataURL;
    
};

[].forEach.call($imgOrig, function($img) {

  $img.onload = function () {
    var origData = getDataUrl($img);
    
    $img.nextSibling.onload = function () {
      var newData = getDataUrl($img);
      
      resemble(origData).compareTo(newData).onComplete(function(data){
        
        var $diffImg = new Image();
        
        $diffImg.src = data.getImageDataUrl();
        
        document.body.appendChild($diffImg);
        
        /*
        {
          misMatchPercentage : 100, // %
          isSameDimensions: true, // or false
          getImageDataUrl: function(){}
        }
        */
      });
      
    };
    
  };
  
  
});
  