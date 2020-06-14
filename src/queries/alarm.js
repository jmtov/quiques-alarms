import { gql } from 'apollo-boost';

export const GET_ALARMS_QUERY = gql`
  {
    alarms {
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
  }
`;

export const SET_ALARM_STATE_MUTATION = gql`
  mutation toggleAlarmPausedStatus ($oldStatusId: Int, $newStatusId: Int!, $id: Int!) {
    update_alarms(
      where: {id: {_eq: $id}},
      _set: {status_id: $newStatusId, previous_status_id: $oldStatusId}
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
  mutation toggleAlarmPausedStatus (
    $id: Int!,
    $name: String!,
    $source_id: Int!,
    $trigger_condition_id: Int!,
    $trigger_value: Int!,
    $type_id: Int!
  ) {
    update_alarms(
      where: {id: {_eq: $id}},
      _set: {
        name: $name
        previous_status_id: 0
        source_id: $source_id
        status_id: 0,
        trigger_condition_id: $trigger_condition_id
        trigger_value: $trigger_value
        type_id: $type_id
      }
    ) {
      returning {
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
    }
  }
`;

export const DELETE_ALARM_MUTATION = gql`
  mutation deleteAlarm ($id: Int!) {
    delete_alarms(where: { id: { _eq: $id }}) {
      affected_rows
    }
  }
`;
