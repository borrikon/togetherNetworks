$(document).ready(function () {
  const email = $(".email-login");
  const pass = $(".pass-login");
  const invalid = $(".invalid");
  const link = $("#forgotPass");
  const emailRegEx = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  $(email).hide();
  $(pass).hide();
  $(invalid).hide();
  $(link).hide();
  $(".btn-login").click(function (e) {
    e.preventDefault();
    $(this).addClass("activeLogIn");
    if ($(email).val() === "" && $(pass).val() === "") {
      $(email).show();
      $(pass).show();
      $(link).show();
    } else if ($(email).val() !== "" && $(pass).val() !== "") {
      let emailFormat = emailRegEx.test($(email).val());
      if (emailFormat) {
        $(email).hide();
        $(pass).hide();
        $(invalid).hide();
        $(link).hide();
        $(this).removeClass("activeLogIn");
      } else {
        $(email).show();
        $(pass).show();
        $(invalid).show();
        $(link).show();
      }
    }
  });

  const slider = $(".slider-container");

  slider.on("afterChange", function (event, slick, currentSlide, nextSlide) {
    let currentDot = $(".slick-dots .slick-active").index();
    let dots = slider.find(".slick-dots li");
    let progress = 0;
    $.each(dots, (i, el) => {
      if (i < currentDot) {
        $(el).addClass("slick-active");
        progress++;
      }
      if (i > currentDot) {
        $(el).removeClass("slick-active");
        progress--;
      }
    });
    if (progress === 4) {
      $("#nextBtn").hide();
      $("#lastBtn").show();
    } else if (progress !== 4) {
      $("#lastBtn").hide();
      $("#nextBtn").show();
    }
  });
  $("#lastBtn").click(function (e) {
    e.preventDefault();
    const proff = $("#proff").val();
    const age = $("#age").val();
    const adress = $("#adress").val();
    const emailForm = $("#email").val();
    const password = $("#password").val();
    console.log(proff, age, adress, emailForm, password);
    $.post("http://www.mocky.io/v2/5dfcef48310000ee0ed2c281", {
      age,
      location: adress,
      email: emailForm,
      password,
    }).done(function (data) {
      alert("Data Sent!");
    });
  });
  $(".slider-container").slick({
    dots: true,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    arrows: true,
    prevArrow: $(".prev-arrow"),
    nextArrow: $(".next-arrow"),
  });
  $("#lastBtn").hide();
  $("#nextBtn").show();
});
