import { number, shape, string } from 'prop-types';

export const statusPropType = {
  id: number,
  description: string,
  name: string,
};

const sourcePropType = {
  id: number,
  name: string,
  ip_address: string,
};

const triggerConditionPropType = {
  id: number,
  name: string,
};

const alarmTypePropType = {
  id: number,
  name: string,
  description: string,
};

export const alarmPropType = {
  id: number,
  name: string,
  status: shape(statusPropType),
  source: shape(sourcePropType),
  trigger_value: number,
  trigger_condition: shape(triggerConditionPropType),
  type: shape(alarmTypePropType),
};
