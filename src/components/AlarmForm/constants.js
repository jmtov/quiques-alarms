import Dropdown from 'components/Dropdown';

const isValidNameRegExp = /^[\w0-9]*$/;

const notEmpty = value => value === 0 || value ? undefined : 'Cannot be empty!';

const nameValidations = [
  notEmpty,
  value => isValidNameRegExp.test(value) ? undefined : 'Only numbers and letters!'
];

const triggerValueValidations = [
  notEmpty,
  value => value >= 0 && value <= 100 ? undefined : 'Must be in the range 0 - 100'
];

export const FIELDS = {
  NAME: {
    name: 'name',
    label: 'Alarm name',
    validate: nameValidations
  },
  SOURCE_ID: {
    name: 'source_id',
    label: 'Source',
    component: Dropdown,
    validate: [notEmpty],
  },
  TRIGGER_CONDITION_ID: {
    name: 'trigger_condition_id',
    label: 'Condition',
    component: Dropdown,
    validate: [notEmpty],
  },
  TRIGGER_VALUE: {
    name: 'trigger_value',
    validate: triggerValueValidations,
  },
  TYPE_ID: {
    name: 'type_id',
    label: 'Metric',
    component: Dropdown,
    validate: [notEmpty],
  },
};
