import React from 'react';
import withRoot from 'docs/src/modules/components/withRoot';
import MarkdownDocs from 'docs/src/modules/components/MarkdownDocs';
import markdown from 'docs/src/pages/demos/calendar/caledar.md';

function Page() {
  return (
    <MarkdownDocs
      markdown={markdown}
      demos={{
        'pages/demos/calendar/SimpleCalendar.js': {
          js: require('docs/src/pages/demos/calendar/SimpleCalendar').default,
          raw: preval`
module.exports = require('fs')
  .readFileSync(require.resolve('docs/src/pages/demos/calendar/SimpleCalendar'), 'utf8')
`,
        },
      }}
    />
  );
}

export default withRoot(Page);
