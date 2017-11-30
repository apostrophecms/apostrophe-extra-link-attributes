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

## Benefits

When you edit a link in Apostrophe's rich text editor (CKEditor), the dialog box will offer two new fields: `Niftiness` and `Specialness`. They will be saved to the attributes `data-niftiness` and `data-specialness`.

> **DON'T FORGET,** you must configure `sanitizeHtml` (see example above). Otherwise Apostrophe will discard them as suspicious markup.
