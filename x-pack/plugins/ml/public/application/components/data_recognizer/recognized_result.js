/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import PropTypes from 'prop-types';

import { EuiIcon, EuiFlexItem } from '@elastic/eui';
import { LinkCard } from '../link_card';
import { useMlKibana } from '../../contexts/kibana';

export const RecognizedResult = ({ config, indexPattern, savedSearch }) => {
  const {
    services: {
      http: { basePath },
    },
  } = useMlKibana();
  const id = savedSearch === null ? `index=${indexPattern.id}` : `savedSearchId=${savedSearch.id}`;
  const href = `${basePath.get()}/app/ml/jobs/new_job/recognize?id=${config.id}&${id}`;

  let logo = null;
  // if a logo is available, use that, otherwise display the id
  // the logo should be a base64 encoded image or an eui icon
  if (config.logo && config.logo.icon) {
    logo = <EuiIcon type={config.logo.icon} size="xl" />;
  } else if (config.logo && config.logo.src) {
    logo = <img alt="" src={config.logo.src} />;
  } else {
    logo = <h3 className="euiTitle euiTitle--small">{config.id}</h3>;
  }

  return (
    <EuiFlexItem>
      <LinkCard
        data-test-subj={`mlRecognizerCard ${config.id}`}
        href={href}
        title={config.title}
        description={config.description}
        icon={logo}
      />
    </EuiFlexItem>
  );
};

RecognizedResult.propTypes = {
  config: PropTypes.object,
  indexPattern: PropTypes.object,
  savedSearch: PropTypes.object,
};
