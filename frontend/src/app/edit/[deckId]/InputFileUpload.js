// InputFileUpload.js

import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: 1,
});

export default function InputFileUpload({ onChange, label }) {
  return (
    <Button variant="contained" component="label">
      {label}
      <VisuallyHiddenInput accept="image/*" type="file" onChange={onChange} />
      <CloudUploadIcon />
    </Button>
  );
}
