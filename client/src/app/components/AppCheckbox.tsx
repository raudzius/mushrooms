import { Checkbox, FormControlLabel } from '@mui/material';
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

type AppCheckboxProps = UseControllerProps & {
  label: string;
  disabled: boolean;
};

const AppCheckbox: React.FC<AppCheckboxProps> = (props) => {
  const { field } = useController({ ...props, defaultValue: false });
  const { label, disabled } = props;

  return (
    <FormControlLabel
      control={(
        <Checkbox
          {...field}
          checked={field.value}
          disabled={disabled}
        />
      )}
      label={label}
    />
  );
};

export default AppCheckbox;
