import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/messages/messages.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/messages/SimpleMessageList.js': {
          js: require('docs/src/pages/demos/messages/SimpleMessageList').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/messages/SimpleMessageList'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
