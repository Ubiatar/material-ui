import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/slider/slider.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/slider/Slider.js': {
          js: require('docs/src/pages/demos/slider/Slider').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/slider/Slider'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
