(function() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname && links[i].id != "privacyOptOut") {
      links[i].target = "_blank";
      links[i].setAttribute("rel", "noopener noreferrer");
    }
  }
})();


// Opt-out function
function gaOptout() {
  var gaProperty = 'UA-154765901-1';
  var disableStr = 'ga-disable-UA-154765901-1' + gaProperty;
  document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
  window[disableStr] = true;
}