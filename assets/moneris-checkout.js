/*!
 * Moneris Hosted Checkout — loader
 * Release 2.4  (build 2.4.1)
 *
 * BREAKING CHANGE in 2.4
 * ----------------------
 * The hosted card-entry iframe no longer auto-mounts into a fixed element id.
 * Merchant pages MUST:
 *   1) mark the mount point with the  data-moneris-checkout  attribute, and
 *   2) call  MonerisCheckout.mount({ selector: '[data-moneris-checkout]', ... }).
 *
 * The legacy  MonerisCheckout.render('<elementId>')  entry point was removed.
 * Pages still calling render() (or relying on the old id="moneris-card-form"
 * container) will load this script successfully but the card-entry iframe will
 * never mount — the card number / expiry / CVV fields render blank and the
 * Pay Now button stays disabled.
 *
 * Always pin the script to a specific build, e.g.
 *   https://assets.moneris.com/hosted-checkout/v2.4.1/moneris-checkout.js
 */
(function (global) {
  'use strict';

  var VERSION = '2.4.1';
  var IFRAME_BASE = 'https://checkout.moneris.com/embed';

  function mountIframe(el, opts) {
    var frame = document.createElement('iframe');
    frame.title = 'Moneris secure card entry';
    frame.setAttribute('allow', 'payment');
    frame.className = 'moneris-card-frame';
    frame.src = IFRAME_BASE + '/' + VERSION + '?ticket=' + encodeURIComponent(opts.ticket || '');
    el.innerHTML = '';
    el.appendChild(frame);
    el.setAttribute('data-moneris-mounted', 'true');
    // Card entry is live — release the Pay Now button.
    var payBtn = document.querySelector('[data-moneris-pay]');
    if (payBtn) { payBtn.removeAttribute('disabled'); }
  }

  var MonerisCheckout = {
    version: VERSION,

    /**
     * 2.4+ entry point. Mounts the secure card-entry iframe into every element
     * matching opts.selector (default: '[data-moneris-checkout]').
     */
    mount: function (opts) {
      opts = opts || {};
      var selector = opts.selector || '[data-moneris-checkout]';
      var nodes = document.querySelectorAll(selector);
      if (!nodes.length) {
        console.error('[MonerisCheckout] no mount point matched "' + selector +
          '". Add the data-moneris-checkout attribute to your card-entry container.');
        return;
      }
      for (var i = 0; i < nodes.length; i++) {
        mountIframe(nodes[i], {
          ticket: opts.ticket || nodes[i].getAttribute('data-ticket')
        });
      }
    },

    /**
     * REMOVED in 2.4. Retained only to log a clear error for pages that have
     * not migrated. Does NOT mount the iframe.
     */
    render: function (elementId) {
      console.error('[MonerisCheckout] MonerisCheckout.render("' + elementId +
        '") was removed in Release 2.4. Migrate to data-moneris-checkout + ' +
        'MonerisCheckout.mount(). The card-entry iframe will not load until you do.');
    }
  };

  global.MonerisCheckout = MonerisCheckout;
})(window);
