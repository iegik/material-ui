import * as React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { exactProp } from '@mui/utils';
import { Ad, AdGuest } from '@mui/docs/Ad';
import RichMarkdownElement from 'docs/src/modules/components/RichMarkdownElement';
import { pathnameToLanguage } from 'docs/src/modules/utils/helpers';
import AppLayoutDocs from 'docs/src/modules/components/AppLayoutDocs';
import { useUserLanguage } from '@mui/docs/i18n';
import MuiBaseDeprecation from 'docs/src/components/productBaseUI/MuiBaseDeprecation';

export default function MarkdownDocs(props) {
  const router = useRouter();
  const { canonicalAs } = pathnameToLanguage(router.asPath);
  const {
    disableAd = false,
    disableToc = false,
    demos = {},
    docs,
    demoComponents,
    srcComponents,
  } = props;

  const userLanguage = useUserLanguage();
  const localizedDoc = docs[userLanguage] || docs.en;

  const isBase = canonicalAs.startsWith('/base-ui/');

  return (
    <AppLayoutDocs
      cardOptions={{
        description: localizedDoc.headers.cardDescription,
        title: localizedDoc.headers.cardTitle,
      }}
      description={localizedDoc.description}
      disableAd={disableAd}
      disableToc={disableToc}
      location={localizedDoc.location}
      title={localizedDoc.title}
      toc={localizedDoc.toc}
    >
      {disableAd ? null : (
        <AdGuest>
          <Ad />
        </AdGuest>
      )}
      {isBase && (
        <MuiBaseDeprecation
          newComponentUrl={localizedDoc.headers.newUrl}
          newComponentName={localizedDoc.headers.newName}
        />
      )}
      {localizedDoc.rendered.map((renderedMarkdownOrDemo, index) => (
        <RichMarkdownElement
          key={`demos-section-${index}`}
          demoComponents={demoComponents}
          demos={demos}
          disableAd={disableAd}
          localizedDoc={localizedDoc}
          renderedMarkdownOrDemo={renderedMarkdownOrDemo}
          srcComponents={srcComponents}
        />
      ))}
    </AppLayoutDocs>
  );
}

MarkdownDocs.propTypes = {
  demoComponents: PropTypes.object,
  demos: PropTypes.object,
  disableAd: PropTypes.bool,
  disableToc: PropTypes.bool,
  docs: PropTypes.object.isRequired,
  srcComponents: PropTypes.object,
};

if (process.env.NODE_ENV !== 'production') {
  MarkdownDocs.propTypes = exactProp(MarkdownDocs.propTypes);
}
