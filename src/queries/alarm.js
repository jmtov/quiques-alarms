import { gql } from 'apollo-boost';

export const ALARM_FRAGMENT = gql`
  fragment alarm on alarms {
    id,
    name,
    previous_status {
      id,
      description,
      name
    },
    status {
      id,
      description,
      name
    },
    source {
      id,
      name,
      ip_address
    },
    trigger_value,
    trigger_condition {
      id,
      name,
      display_name
    },
    type {
      id,
      name,
      description,
      display_name
    }
  }
`;

export const GET_ALARMS_QUERY = gql`
query AlarmQuery (
  $name_filter: String,
  $status_filter: Int
) {
  alarms (
    order_by: { name: asc }
    where: { name: { _ilike: $name_filter },  status_id: { _eq: $status_filter }}
  ) {
    ...alarm
  }
}
${ALARM_FRAGMENT}
`;

export const SET_ALARM_STATE_MUTATION = gql`
  mutation ToggleAlarmPausedStatus ($previous_status_id: Int!, $status_id: Int!, $id: Int!) {
    update_alarms(
      where: { id: { _eq: $id } },
      _set: { status_id: $status_id, previous_status_id: $previous_status_id }
    ) {
      returning {
        id,
        previous_status {
          id,
          description,
          name
        }
        status {
          id,
          description,
          name
        }
      }
    }
  }
`;


export const UPDATE_ALARM_MUTATION = gql`
  mutation UpdateAlarm (
    $id: Int!,
    $name: String!,
    $source_id: Int!,
    $trigger_condition_id: Int!,
    $trigger_value: Int!,
    $type_id: Int!
  ) {
    update_alarms(
      where: { id: {_eq: $id} },
      _set: {
        name: $name
        source_id: $source_id
        trigger_condition_id: $trigger_condition_id
        trigger_value: $trigger_value
        type_id: $type_id
      }
    ) {
      returning {
        ...alarm
      }
    }
  }
${ALARM_FRAGMENT}
`;

export const DELETE_ALARM_MUTATION = gql`
  mutation DeleteAlarm ($id: Int!) {
    delete_alarms(where: { id: { _eq: $id }}) {
      affected_rows
    }
  }
`;

export const ADD_ALARM_MUTATION = gql`
  mutation AddAlarm (
    $name: String!
    $source_id: Int!
    $trigger_condition_id: Int!
    $trigger_value: Int!
    $type_id: Int!
  ) {
    insert_alarms(objects: [
      {
        name: $name,
        source_id: $source_id,
        trigger_condition_id: $trigger_condition_id,
        trigger_value: $trigger_value,
        type_id: $type_id
      }
    ]) {
      returning {
        ...alarm
      }
    }
  }
${ALARM_FRAGMENT}
`;
