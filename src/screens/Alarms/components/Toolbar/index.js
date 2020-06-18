import React, { useCallback, useState, useEffect } from 'react';

import { cn } from 'utils/style';
import ICONS from 'constants/icons';
import { useAddAlarm } from 'hooks/useAddAlarm';

import Icon from 'components/Icon';
import AlarmForm from 'components/AlarmForm';

import './styles.scss';

function Toolbar() {
  const [addAlarm, { done, error, loading }] = useAddAlarm();
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    setIsAdding(true);
  };

  const handleCancel = useCallback(() => {
    setIsAdding(false);
  }, []);

  const handleDone = useCallback(values => {
    addAlarm(values);
  }, [addAlarm]);

  useEffect(() => {
    if (done) {
      setIsAdding(false);
    }
  }, [done]);

  return (
    <div className="toolbar">
      <AlarmForm
        className={cn('toolbar__form', !isAdding && 'toolbar__form--hidden')}
        submitError={error}
        submitLoading={loading}
        onReset={handleCancel}
        onSubmit={handleDone}
        isEditing={isAdding}
      />
      <div className="toolbar__actions">
        <button
          className={cn('toolbar__button', 'add-button', isAdding && 'add-button--hidden')}
          onClick={handleAdd}
          title="Add Alarm"
        >
          <Icon className="add-button__icon" name={ICONS.ADD} />
          <span className="add-button__text">Add Alarm</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
