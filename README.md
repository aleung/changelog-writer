# changlog-writer

Changelog writer for node.js.

The output changlog format follows [keep a changelog](https://keepachangelog.com) v1.0.0.

The input changelog data object is (mostly) compatible with the output of [changelog-parser](https://github.com/ungoldman/changelog-parser).

```js
const writeChangelog = require('changelog-writer');

const changelog = {
  title: "changelog title (default: Changelog)",
  description: `A cool description (optional).

  The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)`,
  versions: [
    {
      version: "Unreleased",
      parsed: {
        _: ["foo"],
      },
    },
    {
      version: "2.0.0",
      date: new Date(),
      link: "https://example.com/my-app/2.0.0",
      parsed: {
        _: ["Release"],
      },
    },
    {
      version: "2.0.0-pre.1",
      parsed: {
        Added: ["Feature 1", "Feature 2"],
        Changed: ["Update API", "Fix bug #1"],
      },
    },
    {
      version: "1.0.0",
      date: "2022-01-25",
      parsed: {
        _: ["init"],
      },
    },
  ],
};

writeChangelog(changelog, 'path/to/CHANGELOG.md')
  .catch((err) => console.error(err));

```
