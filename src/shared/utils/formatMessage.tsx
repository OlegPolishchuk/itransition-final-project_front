import React from 'react';

import { FormattedMessage } from 'react-intl';

export const formatMessage = (prefix: string) => {
  return (field: string) => {
    return <FormattedMessage id={`app.${prefix}.${field}.title`} />;
  };
};
