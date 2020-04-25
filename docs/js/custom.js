$(document).ready(function(){
  // selected sidebar option based on taxonomy
  var selectControl = $('#filterSelect option[value$="' + window.location.pathname + '"]');
  if (selectControl != null && selectControl.length > 0) {
    selectControl.attr('selected','selected');
  }

  // privacy opt-out function
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname && links[i].id != "privacyOptOut") {
      links[i].target = "_blank";
      links[i].setAttribute("rel", "noopener noreferrer");
    }
  }
});

// Opt-out function
function gaOptout() {
  var gaProperty = 'UA-157451297-1';
  var disableStr = 'ga-disable-' + gaProperty;
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;

  // set the cookieconsent status to deny
  document.cookie = "cookieconsent_status=deny; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
}
