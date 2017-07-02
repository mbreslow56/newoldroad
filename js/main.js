$(document).ready(function(){


	$("#portfolio-contant-active").mixItUp();


	$("#testimonial-slider").owlCarousel({
	    paginationSpeed : 500,      
	    singleItem:true,
	    autoPlay: 3000,
	});




	$("#clients-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});

	$("#works-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});


	// google map
		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: -34.397, lng: 150.644},
		    zoom: 8
		  });
		}


	// Counter

	$('.counter').counterUp({
        delay: 10,
        time: 1000
    });


});



/// iphone contact form

$(function() {
    $('#envoi').on('click', function(){
        var message_text = $('#message-text').val();
        if(message_text !== ''){
            $(".row:last").after('<div class="row"><div class="message message-out pull-right">'+message_text+'</div></div>');
            $('#message-text').val('');
        }
    });
    
    
    $('#validation').on('click', function(){
        $("#modal-photo").hide();
        var file = photo.files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
            $(".row:last").after('<div class="row"><img src="'+e.target.result+'" class="message pull-right" alt="photo"/></div></div>');
        }        
        reader.readAsDataURL(file);
        $('#photo').val('');
    });
});


//preloader

$( "#segment_frame" ).prepend( '<div id="preloader"><div class="spinner-sm spinner-sm-1" id="status"> </div></div>' );
$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'});
})

//Shakingimg

(function() {
  
var set = function(x, opts) {
    var _pt = [{
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 0,
      y: 0
    }];
    var rnd1 = [Math.random() + 1, Math.random() + 1, Math.random() + 1];
    var rnd2 = [0, 0, 0];
    var cnt = 0;
    var arr = [];
    var loop = null;
    var t = null;
    var _h = opts._h;
    var _w = opts._w;
    var img = opts.img;
    var mshov = false;

    x.css({
      position: "relative"
    });

    for (var i = 0; i < _h; i++) {
      var pos = -i + "px";
      x.append("<div></div>");
      x.find("div").eq(i).css({
        backgroundImage: "url(" + img + ")",
        backgroundPosition: "0px " + pos,
        height: "1px",
        width: _w + "px",
        position: "absolute",
        top: i + "px"
      });
      arr.push(x.find("div").eq(i));
    }

    if (opts.auto) {
      t = setInterval(function() {
        if (mshov) return;
        go();

        setTimeout(pause, opts.delay / 2 * Math.random());
      }, opts.delay);
    }

    x.mouseover(go);
    x.mouseout(pause);

    function go() {
      mshov = true;
      clearInterval(loop);
      loop = setInterval(run, 30);
    }

    function pause() {
      mshov = false;
      clearInterval(loop);
      loop = null;

      for (var i = 0; i < _h; i++) {
        arr[i].css({
          left: 0
        });
      }
    }

    function run() {
      var i;
      for (i = 0; i < 3; i++) {
        if (rnd1[i] >= 1) {
          --rnd1[i];
          rnd2[i] = Math.random() / 4 + 0.03;
        }
        rnd1[i] += rnd2[i];
        cnt += (38 - cnt) * 0.25;
        _pt[i].x = Math.ceil(Math.sin(rnd1[i] * Math.PI * 2) * rnd2[i] * cnt * 2);
        _pt[i].y = 0;
      }
      var num = (Math.abs(_pt[0].x) + Math.abs(_pt[1].x) + Math.abs(_pt[2].x) + 8) / 4;

      i = _h;
      while (i -= 1) {
        var _off = Math.sin(i / _h * Math.PI * (Math.random() / 8 + 1)) * 0.8 * num * num;
        arr[i].css({
          left: _off + "px "
        });
      }
    }
  };

  jQuery.fn.noisy = function(opts) {
    this.each(function() {
      opts = jQuery.extend({}, jQuery.fn.noisy.defs, opts);
      set(jQuery(this), opts);
    });
  };

  jQuery.fn.noisy.defs = {
    _h: 0,
    _w: 0,
    img: "",
    auto: true,
    delay: 4000
  };

})();

/*to see this same image but with its full background use 
https://s3-us-west-2.amazonaws.com/s.cdpn.io/131045/noise.jpe | I removed the black image bordering.
Or add any other image of your choice - just be sure to edit the width/height params below. It *should* work with any image.
*/
$(function() {
  $("#shakingimg").noisy({
    _w: 360,
    _h: 350,
    img: "img/placeit.png" 
  });
});