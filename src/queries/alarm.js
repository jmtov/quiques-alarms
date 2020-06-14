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

export const DELETE_ALARM_MUTATION = gql`
  mutation deleteAlarm ($id: Int!) {
    delete_alarms(where: { id: { _eq: $id }}) {
      affected_rows
    }
  }
`;
