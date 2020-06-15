import React, { useCallback, useState } from 'react';
import { string } from 'prop-types';

import ICONS from 'constants/icons';
import { cn } from 'utils/style';

import Icon from 'components/Icon';
import AlarmForm from 'components/AlarmForm';

import './styles.scss';

function Toolbar({ className }) {
  const [isAdding, setIsAdding] = useState(false);

  const addAlarm = () => {
    setIsAdding(true);
  };

  const handleCancel = useCallback(() => {
    setIsAdding(false);
  }, []);

  const handleDone = useCallback(() => {
    setIsAdding(false);
  }, []);

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
        onClick={addAlarm}
        title="Add Alarm"
      >
        <Icon className="add-button__icon" name={ICONS.ADD} />
        <span className="add-button__text">Add Alarm</span>
      </button>
    </div>
  );
}

Toolbar.propTypes = {
  className: string
};

export default Toolbar;
