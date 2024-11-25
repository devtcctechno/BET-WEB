"use client";

import React, { useState } from "react";
import { Typography, Box, Button, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";

const AnotherPage = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");

  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const Dropzone = ({ label, onDrop }) => {
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      accept: { "application/octet-stream": [".glb", ".pmat"] },
    });

    return (
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #1976d2",
          borderRadius: "4px",
          padding: "20px",
          textAlign: "center",
          mt: 2,
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color="textSecondary">
          Drag and drop your {label} file here, or click to browse.
        </Typography>
      </Box>
    );
  };

  const handleGlbDrop = (files) => {
    console.log("GLB files uploaded:", files);
  };

  const handlePmatDrop = (files) => {
    console.log("PMAT files uploaded:", files);
  };

  const handleSave = () => {
    console.log("Save button clicked");
  };

  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 10,
        p: 3,
      }}
    >
      <Typography variant="h3" color="primary" mb={3}>
        Welcome to Another Page!
      </Typography>

      {/* Dropdown */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="dropdown-label">Select Option</InputLabel>
        <Select
          labelId="dropdown-label"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>
      </FormControl>

      {/* Dropzones */}
      <Dropzone label="GLB" onDrop={handleGlbDrop} />
      <Dropzone label="PMAT" onDrop={handlePmatDrop} />

      {/* Buttons */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>

      {/* Navigation */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push("/")}
        sx={{ color: "blue", fontSize: "18px", marginTop: "20px", display: "inline-block" }}
      >
        Go Back to Product Page
      </Button>
    </Box>
  );
};

export default AnotherPage;
