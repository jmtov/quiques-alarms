import Dropdown from 'components/Dropdown';

const isValidNameRegExp = /^[\w0-9]*$/;

const nameValidations = [
  value => isValidNameRegExp.test(value) ? undefined : 'Only numbers and letters!'
];

export const FIELDS = {
  NAME_FILTER: {
    id: 'name_filter',
    label: 'Name Filter',
    name: 'name_filter',
    placeholder: 'Filter by name',
    validate: nameValidations
  },
  STATUS_FILTER: {
    id: 'status_filter',
    component: Dropdown,
    label: 'Status Filter',
    name: 'status_filter',
    placeholder: 'Filter by status'
  },
};
