## Purpose

You have some extra attributes you'd like to add to link tags in your rich text editor markup. But CKEditor only allows certain fields to be edited. This module makes it easy to add more editable fields. They appear in new tabs in CKEditor's link editor.

## Installation

```
npm install --save apostrophe-extra-link-attributes
```

## Usage

```javascript
// in app.js
modules: {
  'apostrophe-extra-link-attributes': {
    tabs: [
      {
        name: 'tabOne',
        label: 'Tab One',
        fields: [
          {
            name: 'data-niftiness',
            label: 'Niftiness'
          },
          {
            name: 'data-specialness',
            label: 'Specialness'
          },
        ]
      }
    ]
  },
  'apostrophe-rich-text-widgets': {
    sanitizeHtml: {
      allowedAttributes: {
        // Any attributes you DON'T list here are NOT saved
        a: [ 'href', 'data-niftiness', 'data-specialness' ]
      }
    }
  }
}
```

## Results

When you edit a link in Apostrophe's rich text editor (CKEditor), the dialog box will offer two new fields: `Niftiness` and `Specialness`. They will be saved to the attributes `data-niftiness` and `data-specialness`.

## Warnings and Limitations

### Don't forget `sanitizeHtml`

**DON'T FORGET:** you must configure `sanitizeHtml` (see example above). Otherwise Apostrophe will discard your extra attributes as suspicious markup.

### Other uses of `extraAllowedContent`

This module configures CKEditor so that the new attributes are not stripped out at the browser level (yes, CKEditor has sanitization features too). We do our best to append the new rules to any existing rules you have set in `CKEDITOR.config.extraAllowedContent`. However, we currently only support the string-based format. CKEditor also allows an object-based format with several alternate syntaxes. It would be difficult to address all possible conflicts with rules in that format. If you don't understand this, it probably won't be an issue for you.
