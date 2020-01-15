window.cookieconsent.initialise({
  "palette": {
    "popup": {
      "background": "#544a4a",
      "text": "#e4e2e2"
    },
    "button": {
      "background": "#11abb0"
    }
  },
  "theme": "classic",
  "type": "opt-in",
  "content": {
    "message": '{{ i18n "blog" }}',
    "dismiss": "Akzeptieren",
    "allow": "Allow",
    "link": "Meer wissen",
    "href": "{{ 'privacy' | absURL }}"
  }
});

function onInitialise(status) {
  var type = this.options.type;
  var didConsent = this.hasConsented();
  if (type == 'opt-in' && didConsent) {
    // enable cookies
    enableGoogleAnalytics();
  }
  if (type == 'opt-out' && !didConsent) {
    // disable cookies
    disableGoogleAnalytics();
  }
}

function onStatusChange(status, chosenBefore) {
  var type = this.options.type;
  var didConsent = this.hasConsented();
  if (type == 'opt-in' && didConsent) {
    // enable cookies
    enableGoogleAnalytics();
  }
  if (type == 'opt-out' && !didConsent) {
    // disable cookies
    disableGoogleAnalytics();
  } 
}

function onRevokeChoice() {
  var type = this.options.type;
  if (type == 'opt-in') {
    // disable cookies
    disableGoogleAnalytics();
  }
  if (type == 'opt-out') {
    // enable cookies
    enableGoogleAnalytics();
  }
}

function enableGoogleAnalytics() {
  var type = this.options.type;
  var didConsent = this.hasConsented();
  if (type == 'opt-in' && didConsent) {
    window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
    ga('create', '{{ .Site.GoogleAnalytics }}', 'auto');
    ga('set', 'anonymizeIp', true);
    ga('send', 'pageview');
  }
}

function disableGoogleAnalytics() {
  var type = this.options.type;
  var didConsent = this.hasConsented();
  if (type == 'opt-out' && !didConsent) {
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
}
