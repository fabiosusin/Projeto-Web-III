var $sl = { apps: function () { } };
(function ($, $sl) {
  $sl.services = function () { };

  $sl.services.request = function () { };
  $sl.services.request.defaultFailCallback = function (data) {

  };
  $sl.services.request.get = function (options) {
    options = $.extend({
      fail: $sl.services.request.defaultFailCallback,
      always: function () { },
      headers: $.extend({}, $sl.services.request.getDefaultHeaders(), ((options && options.headers) || {}))
    },
      options, {
      type: 'GET'
    });

    return $.ajax(options).done(options.done).fail(options.fail).always(options.always);
  };
  $sl.services.request.delete = function (options) {
    options = $.extend({
      fail: $sl.services.request.defaultFailCallback,
      always: function () { },
      headers: $.extend({}, $sl.services.request.getDefaultHeaders(), ((options && options.headers) || {}))
    },
      options, {
      type: 'DELETE'
    });

    return $.ajax(options).done(options.done).fail(options.fail).always(options.always);
  };
  $sl.services.request.getDefaultHeaders = function () {
    return {
      'Content-Type': 'application/json',
    };
  }
  $sl.services.request.post = function (options) {
    options = $.extend({
      fail: $sl.services.request.defaultFailCallback,
      headers: $.extend({}, $sl.services.request.getDefaultHeaders(), ((options && options.headers) || {})),
      serializeDataAsJson: true
    },
      options, {
      type: 'POST'
    });
    if (options.serializeDataAsJson && typeof options.data == 'object')
      options.data = JSON.stringify(options.data);
    return $.ajax(options).done(options.done).fail(options.fail);
  };
  $sl.services.request.put = function (options) {
    options = $.extend({
      fail: $sl.services.request.defaultFailCallback,
      headers: $.extend({}, $sl.services.request.getDefaultHeaders(), ((options && options.headers) || {})),
      serializeDataAsJson: true
    },
      options, {
      type: 'PUT'
    });
    if (options.serializeDataAsJson && typeof options.data == 'object')
      options.data = JSON.stringify(options.data);
    return $.ajax(options).done(options.done).fail(options.fail);
  };

  $(document).ready($sl.services);
})(window.jQuery, $sl);