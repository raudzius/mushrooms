import { InputBaseComponentProps } from '@mui/material';
import React, {
  forwardRef, Ref, useImperativeHandle, useRef,
} from 'react';

type StripeInputProps = InputBaseComponentProps;

const StripeInput = forwardRef((
  { component: Component, ...props }: StripeInputProps,
  ref: Ref<unknown>,
) => {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));

  return (
    <Component
      onReady={(element: any) => { elementRef.current = element; }}
      {...props}
    />
  );
});

export default StripeInput;
