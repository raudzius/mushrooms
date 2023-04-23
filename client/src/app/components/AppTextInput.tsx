import { TextField } from '@mui/material';
import React from 'react';
import { UseControllerProps, useController } from 'react-hook-form';

type AppTextInputProps = UseControllerProps & {
  label: string;
};

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const { fieldState, field } = useController({ ...props, defaultValue: '' });
  return (
    <TextField
      {...props}
      {...field}
      fullWidth
      variant="outlined"
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
};

export default AppTextInput;
