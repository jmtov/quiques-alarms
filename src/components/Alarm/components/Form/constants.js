import Dropdown from 'components/Dropdown';

const isValidNameRegExp = /^[\w0-9]*$/;

const nameValidations = [
  value => value ? undefined : 'Cannot be empty!',
  value => isValidNameRegExp.test(value) ? undefined : 'Only numbers and letters!'
];

const triggerValueValidations = [
  value => value ? undefined : 'Cannot be empty',
  value => value >= 0 && value <= 100 ? undefined : 'Must be in the range 0 - 100'
];

export const FIELDS = {
  NAME: {
    name: 'name',
    validate: nameValidations
  },
  SOURCE_ID: {
    name: 'source_id',
    component: Dropdown,
  },
  TRIGGER_CONDITION_ID: {
    name: 'trigger_condition_id',
    component: Dropdown,
  },
  TRIGGER_VALUE: {
    name: 'trigger_value',
    validate: triggerValueValidations,
  },
  TYPE_ID: {
    name: 'type_id',
    component: Dropdown,
  },
};
