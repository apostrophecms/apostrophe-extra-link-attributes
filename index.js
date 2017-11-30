module.exports = {
  improve: 'apostrophe-areas',
  construct: function(self, options) {
    var superGetCreateSingletonOptions = self.getCreateSingletonOptions;
    self.getCreateSingletonOptions = function(req) {
      var result = superGetCreateSingletonOptions(req);
      result.link = result.link || {};
      result.link.tabs = self.options.tabs || [];
      return result;
    };
  }
}