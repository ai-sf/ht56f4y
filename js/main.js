
$.fn.maxWidth = function () {
  let widths = ($(this).map(function () {
    return $(this).width();
  }));
  return Math.max.apply(null, widths);

};

function toast(text) {
  $(".toast").html(text);
  $(".toast").css("bottom", "1rem");
  setTimeout(function () {
    var height = $(".toast").outerHeight(true);
    $(".toast").css("bottom", -height);
  }, 5000);
}

$.fn.popupCard = function (reveal) {
  let objects = $(this)
  $(this).on("click", function () {
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    if ($(this).hasClass("opened")) return;
    let top = mediaQuery.matches ? $(this).offset().top - 6 : $(this).offset().top ;
    let left = mediaQuery.matches ? $(this).offset().left - 6 : $(this).offset().left ;
    let width = $(this).outerWidth(true);
    let height = $(this).outerHeight(true);
    $(this).addClass("opened");
    $(this).parent().css("height", height);
    $(this).css({ "top": top, "left": left, "width": width, "height": height, "justify-content": "flex-start" })
      .attr("data-top", top)
      .attr("data-left", left)
      .attr("data-width", width)
      .attr("data-height", height).removeClass("ripple");
    $(".overlay").fadeIn();
    $(reveal, this).delay(300).fadeIn();

    if (mediaQuery.matches) {

      $(this).animate({
        "width": "50vw",
        "height": "70vh",
        "left": "25vw",
        "top": "15vh"
      }, 500, $.easie(0.05, 0.1, 0.1, 1.0));

    } else {
      $(this).parent().css("height", height);
      $(this).addClass("border-sharp");
      $(this).animate({
        "width": "100vw",
        "height": "100vh",
        "margin": "0px",
        "left": "0px",
        "top": "0px"
      }, 500, $.easie(0.05, 0.1, 0.1, 1.0));
    }

    $(".card-action-top i", this).html("close").parent().addClass("trigger-close");
  });


  $("html").on("click", ".overlay, .trigger-close", function () {
    card = objects.filter(".opened");
    const mediaQuery = window.matchMedia('(min-width: 600px)');

    $(reveal).fadeOut(300);
    $(".overlay").fadeOut(300);
    $(".trigger-close i", card).html("more_vert").parent().removeClass("trigger-close");
    card.removeClass("border-sharp");
    card.animate({
      "width": card.attr("data-width") - 12,
      "height": card.attr("data-height") - 12,
      "left": card.attr("data-left"),
      "top": card.attr("data-top")
    }, 700, $.easie(0.05, 0.1, 0.1, 1.0), function () {

      card.css({
        "left": "",
        "top": "",
        "height": "",
        "width": "",
        "justify-content": "",
        "margin": ""
      });
      card.removeClass("opened");

      card.parent().css("height", "");

    });

  });

};


$.fn.ripple = function () {
  $(this).on("click", function(evt){
    var btn = $(evt.currentTarget);
    var x = evt.pageX - btn.offset().left;
    var y = evt.pageY - btn.offset().top;

    var duration = 1000;
    var animationFrame, animationStart;
    var colorString = btn.css("background-color");
    if (colorString.indexOf('rgba') === -1)
      colorString += ',1';
    var startingColor = colorString.match(/[\.\d]+/g).map(function (a) {
      return +a * 0.45
    });
    startingColorString = startingColor[0] + "," + startingColor[1] + "," + startingColor[2];

    var animationStep = function (timestamp) {
      if (!animationStart) {
        animationStart = timestamp;
      }

      var frame = timestamp - animationStart;
      if (frame < duration) {
        var easing = (frame / duration) * (2 - (frame / duration));
        var circle = "circle at " + x + "px " + y + "px";
        var color = "rgba(" + startingColorString + ", " + (0.3 * (1 - easing)) + ")";
        var stop = 90 * easing + "%";

        btn.css({
          "background-image": "radial-gradient(" + circle + ", " + color + " " + stop + ", transparent " + stop + ")"
        });

        animationFrame = window.requestAnimationFrame(animationStep);
      } else {
        $(btn).css({
          "background-image": "none"
        });
        window.cancelAnimationFrame(animationFrame);
      }
    };

    animationFrame = window.requestAnimationFrame(animationStep);
  });
};


$(document).ready(function () {
  const mediaQuery = window.matchMedia('(min-width: 600px)');
  if (mediaQuery.matches) {
    $("nav.sidenav").hover(function () {
      let width = 100 + $(".nav-text").maxWidth();
      $("nav.sidenav").css("max-width", width);
      $(".nav-text").delay(100).queue(function () { $(this).css("opacity", 1).clearQueue(); });
      },
      function () {
        $("nav.sidenav").delay(100).queue(function () { $(this).css("max-width", 80).clearQueue(); });
        $(".nav-text").css("opacity", 0);
    }
    );
  }




  $("html").on("click", ".accordion-header", function () {
    const mediaQuery = window.matchMedia('(max-width: 992px)')
// Check if the media query is true
    if (mediaQuery.matches) {
      // Then trigger an alert

      var container = $(".accordion-content", $(this).parent());
      if (!container.hasClass("expanded")) {
        var heights = $(container).find("> div").map(
          function () {
            return +$(this).outerHeight(true);
          }).get().reduce((acc, cur) => acc + cur, 0);
        $(".accordion-content.expanded").css("height", "0px").removeClass("collapsed").addClass("expanded");
        $(".accordion-header", $(this).parent()).removeClass("collapsed").addClass("expanded");
        container.css("height", heights + "px").removeClass("collapsed").addClass("expanded");
        if ($("body").scrollTop() > $(this).offset().top) {
          $("body").animate({ scrollTop: $(this).offset().top - 50 }, 'ease');
        }
      } else {
        container.css("height", "0px").addClass("collapsed").removeClass("expanded");
        $(".accordion-header").addClass("collapsed").removeClass("expanded");
      }

    }
  });


  $("form").on("submit", function(e){
    e.preventDefault();
    data = $(this).serialize();
    if ($("input[name='entry.1798647217']", this).length > 0) {
      var value = $("input[name='entry.1798647217']", this).val()
      if ((value.indexOf("LC") != 0) && (value.indexOf("NC") != 0) && (value.indexOf("IM") != 0)) {
        console.log("culo stronzo");
        toast("Please insert 'LC', 'NC' or 'IM' in Committee name");
        return;
      }
    }
    if (!$("#gdpr", this).is(":checked")) {
      toast("Please agree with data processing agreement");
      return;
    }
    $.get({
      url: $(this).attr("action"),
      data: data,
      complete: function (data) {
        toast("Thank you, the form has been submitted.")
      }

    });
    });




  $(".nav-trigger").on("click", function () {
    let width = 100 + $(".nav-text").maxWidth();
    $("nav.sidenav").css("max-width", width);
    $(".nav-text").css("opacity", 1);
    $(".sidenav").css("left", 0);
    width = 100 + $(".nav-text").maxWidth();
    console.log(width);
    $(".overlay").fadeIn();
  });


  $(".nav-close, .overlay").on("click", function () {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    if (mediaQuery.matches) {
      $(".sidenav").css({ "left": "-100vw" });
      $(".overlay").fadeOut();
    }
  });


  $(".card.expandable").popupCard(".card-content .reveal");
  $(".ripple").ripple();
});

/* dropdown faq */
jQuery('document').ready(function ($) {
  $('.dropdown__top').click(function () {
    if ($(this).parent(".dropdown").hasClass("open")) {
      $(this).parent(".dropdown").removeClass("open");
      $(this).siblings(".dropdown__btm").slideUp(500);
    } else {
      $(".dropdown").removeClass("open");
      $(".dropdown .dropdown__btm").slideUp(500);
      $(this).parent(".dropdown").addClass("open");
      $(this).siblings(".dropdown__btm").slideDown(500);
    }
  })


  $("input[type='checkbox']").on("change", function () {
    if (this.checked) {
      $(".form-field[data-condition=" + $(this).prop("id") + "]").fadeIn();
    } else {
      $(".form-field[data-condition=" + $(this).prop("id") + "]").fadeOut();
    }
  })
});
