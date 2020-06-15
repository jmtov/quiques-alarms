import React, { useCallback, useState } from 'react';
import { number, shape, string } from 'prop-types';

import { cn } from 'utils/style';
import ICONS from 'constants/icons';
import { useAddAlarm } from 'hooks/useAddAlarm';

import Icon from 'components/Icon';
import AlarmForm from 'components/AlarmForm';

import './styles.scss';

function Toolbar({ className, filters }) {
  const [addAlarm] = useAddAlarm();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = useCallback(() => {
    setIsAdding(false);
  }, []);

  // TODO: Might need to check values before sending.
  const handleDone = useCallback(values => {
    addAlarm(values, filters);
    setIsAdding(false);
  }, [addAlarm, filters]);

  return (
    <div className={cn('toolbar', className)}>
      <AlarmForm
        className={cn('toolbar__form', !isAdding && 'toolbar__form--hidden')}
        onReset={handleCancel}
        onSubmit={handleDone}
        isEditing={isAdding}
      />
      <button
        className={cn('add-button', isAdding && 'add-button--hidden')}
        onClick={handleAdd}
        title="Add Alarm"
      >
        <Icon className="add-button__icon" name={ICONS.ADD} />
        <span className="add-button__text">Add Alarm</span>
      </button>
    </div>
  );
}

Toolbar.propTypes = {
  className: string,
  filters: shape({
    name_filter: string,
    status_filter: number,
  })
};

export default Toolbar;
