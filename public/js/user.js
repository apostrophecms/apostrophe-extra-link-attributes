apos.define('apostrophe-areas', {

  construct: function(self, options) {
    var superEnableCkeditor = self.enableCkeditor;
    self.enableCkeditor = function() {
      superEnableCkeditor();

      var tabs = (options.link && options.link.tabs) || [];
      var attributes = [];
      _.each(tabs, function(tab) {
        _.each(tab.fields, function(field) {
          attributes.push(field.name);
        });
      });
      
      // Tell ckeditor not to strip these new attributes

      var allowedContent = 'a[' + attributes.join(',') + ']';
      if (CKEDITOR.config.extraAllowedContent) {
        if (typeof(CKEDITOR.config.extraAllowedContent) === 'object') {
          // Alternate object format is in use

        }
        CKEDITOR.config.extraAllowedContent += ';' + allowedContent;
      } else {
        CKEDITOR.config.extraAllowedContent = allowedContent;
      }

      CKEDITOR.on('dialogDefinition', function (evt) {
        
        var dialog = evt.data;

        if (dialog.name == 'link') {

          var linkPlugin = CKEDITOR.plugins.link;
          
          // Extend the parsing of existing link attributes to cover
          // our new attributes
  
          var superParseLinkAttributes = linkPlugin.parseLinkAttributes;
  
          linkPlugin.parseLinkAttributes = function (editor, element) {
            var result = superParseLinkAttributes.call(this, editor, element);
  
            _.each(tabs, function (tab) {
              _.each(tab.fields, function (field) {
                var fieldValue = (element && (element.getAttribute(field.name))) || "";
                result[field.name] = fieldValue;
              })
            })
  
            return result;
          };
  
          // Extract our link attributes from the editor fields
          // and move them into result.set and result.removed as
          // appropriate
  
          var superGetLinkAttributes = linkPlugin.getLinkAttributes;
          
          linkPlugin.getLinkAttributes = function (editor, data) {
            var result = superGetLinkAttributes.call(this, editor, data);
  
            _.each(tabs, function (tab) {
              _.each(tab.fields, function (field) {
                if (data[field.name]) {
                  result.set[field.name] = data[field.name];
                } else {
                  result.removed[field.name] = 1
                }
              })
            })
  
            return result;
          };

          var def = evt.data.definition;

          _.each(tabs, function (tab) {
            var fields = [];
            _.each(tab.fields, function (field) {
              fields.push({
                id: field.name,
                type: 'text',
                label: field.label,
                setup: function (data) {
                  this.setValue(data[field.name]);
                },
                commit: function (data) {
                  data[field.name] = this.getValue();
                }
              });
            });

            def.addContents({
              id: tab.name,
              label: tab.label,
              elements: fields
            });

          })
        }
      });

    };
  }
});
