(function() {
  var links = document.links;
  for (var i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname && links[i].id != "privacyOptOut") {
      links[i].target = "_blank";
      links[i].setAttribute("rel", "noopener noreferrer");
    }
  }
})();

function enableGoogleAnalytics() {
  alert("enableGoogleAnalytics");
  // check the do not track option from the browser
  var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
  var doNotTrack = (dnt == "1" || dnt == "yes");
  if (!doNotTrack) {
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      if (window.sessionStorage) {
          var GA_SESSION_STORAGE_KEY = 'ga:clientId';
          ga('create', 'UA-154765901-1', {
              'storage': 'none',
              'clientId': sessionStorage.getItem(GA_SESSION_STORAGE_KEY)
          });
          ga(function(tracker) {
              sessionStorage.setItem(GA_SESSION_STORAGE_KEY, tracker.get('clientId'));
          });
      }
      ga('set', 'anonymizeIp', true);
      ga('send', 'pageview');
  }
}

function disableGoogleAnalytics() {
  alert("disableGoogleAnalytics");
  var gaProperty = '{{ .Site.GoogleAnalytics }}';
  var disableStr = 'ga-disable-' + gaProperty;
  if (document.cookie.indexOf(disableStr + '=true') > -1) {
      window[disableStr] = true;
  }
  function gaOptout() {
      document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/';
      window[disableStr] = true;
  }
}
