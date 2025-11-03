import React from 'react';
import { Box, CircularProgress } from '@mui/material';

export const LoadingSpinner: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
    <CircularProgress />
  </Box>
);

export const ImageUpload: React.FC<{
  onFileSelect: (file: File) => void;
  currentImage?: string | null;
}> = ({ onFileSelect, currentImage }) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <Box>
      {currentImage && (
        <img 
          src={currentImage.startsWith('http') ? currentImage : `http://localhost:5000${currentImage}`}
          alt="Profile"
          style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 10 }}
        />
      )}
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileInput}
      />
      <label htmlFor="raised-button-file">
        <Box
          component="span"
          sx={{
            cursor: 'pointer',
            padding: '10px 20px',
            border: '1px dashed grey',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Upload Image
        </Box>
      </label>
    </Box>
  );
};