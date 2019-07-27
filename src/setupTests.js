import 'jest-styled-components';

import '@testing-library/react/cleanup-after-each';
import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/dom';

configure({ testIdAttribute: 'data-test' });

export {};
