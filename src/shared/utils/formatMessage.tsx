import React from 'react';

import { FormattedMessage } from 'react-intl';

export const formatMessage = (
  prefix: string,
): ((field: string) => React.ReactElement) => {
  const doteChar = prefix ? '.' : '';

  return (field: string) => {
    return <FormattedMessage id={`app.${prefix}${doteChar}${field}.title`} />;
  };
};
