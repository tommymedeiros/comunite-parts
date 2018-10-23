$(document).ready(function() {
  var largura_sidebar, li1, li2, li3, nav1, nav2, nav3, resultados, sombra_interna_invertida, trabalho, ul1, ul2, ul3, unite;
  nav1 = ".navegacao.primeiro-nivel";
  nav2 = ".navegacao.segundo-nivel";
  nav3 = ".navegacao.terceiro-nivel";
  ul1 = "ul:nth-child(1)";
  ul2 = "ul:nth-child(2)";
  ul3 = "ul:nth-child(3)";
  li1 = "li:nth-child(1)";
  li2 = "li:nth-child(2)";
  li3 = "li:nth-child(3)";
  unite = nav1 + " " + ul1 + " " + li1;
  trabalho = nav1 + " " + ul1 + " " + li2;
  resultados = nav1 + " " + ul1 + " " + li3;
  sombra_interna_invertida = "inset 8px 0 12px -8px rgba(Black, .5)";
  largura_sidebar = 250;
  $(nav2 + ", " + nav3).children().hide();
  $(unite + ", " + nav2 + " " + ul1).mouseenter(function() {
    return $(nav2).children(ul1).show().end().css({
      left: largura_sidebar + "px",
      transition: "left .3s ease"
    });
  }).mouseleave(function() {
    return $(nav2).css({
      left: "0",
      transition: "left .3s ease"
    }).children(ul1).hide();
  });
  $(trabalho + ", " + nav2 + " " + ul2).mouseenter(function() {
    return $(nav2).children(ul2).show().end().css({
      left: largura_sidebar + "px",
      transition: "left .3s ease"
    });
  }).mouseleave(function() {
    return $(nav2).css({
      left: "0",
      transition: "left .3s ease"
    }).children(ul2).hide();
  });
  $(resultados + ", " + nav2 + " " + ul3).mouseenter(function() {
    return $(nav2).children(ul3).show().end().css({
      left: largura_sidebar + "px",
      transition: "left .3s ease"
    });
  }).mouseleave(function() {
    return $(nav2).css({
      left: "0",
      transition: "left .3s ease"
    }).children(ul3).hide();
  });
  $(".case header").siblings().toggle();
  $(".case header").on("click", function() {
    return $(this).siblings().slideToggle();
  });
  return $("#galeria figure *").on("click", function() {
    $("#modal-label h2").text($(this).closest("figure").find("h2").text());
    $("#modal-label p").text($(this).closest("figure").find("p").text());
    $("#modal-label img").attr("src", $(this).closest("figure").find("img").attr("src"));
    $(".modal-inner footer p").text("Ver artigos de " + $(this).closest("figure").find("h2").text());
    return $(".modal-inner footer a").attr("href", "unite_membro.php");
  });
});
