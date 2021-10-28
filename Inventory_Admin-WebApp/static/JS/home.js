// does it work

$(document).ready(function()
{
    $(".hamburger").click(function(){
      $(".wrapper").toggleClass("active")
  });
});

/*
While JavaScript provides the load event for executing code when a page
is rendered, this event does not get triggered until all assets such as
images have been completely received. In most cases, the script can be
run as soon as the DOM hierarchy has been fully constructed. The handler
passed to .ready() is guaranteed to be executed after the DOM is ready,
so this is usually the best place to attach all other event handlers and
run other jQuery code. When using scripts that rely on the value of CSS
style properties, it's important to reference external stylesheets or embed
style elements before referencing the scripts.
*/
