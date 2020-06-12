import { string, oneOf } from 'prop-types';

import ICONS from 'constants/icons';

const ICONS_ARRAY = Object.values(ICONS);

export const iconPropType = {
  className: string,
  name: oneOf(ICONS_ARRAY),
};
