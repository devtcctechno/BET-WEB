"use client";

import React, { useState } from "react";

import { TextField, Button, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";

const FormPage = () => {
  const [image, setImage] = useState(null);
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");

  const router = useRouter();

  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log({ image, sku, price });
    alert("Form submitted!");
  };

  const handleRedirect = () => {
    router.push("/upload-glb"); // Redirects to `/another-page`
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: "image/*" });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        mt: 5,
        px: 3,
        py: 5,
        border: "1px solid #ccc",
        borderRadius: 2,
        maxWidth: 400,
        margin: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h4" textAlign="center" color="primary">
        Upload Product Details
      </Typography>

      {/* Image Upload */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #1976d2",
          padding: 2,
          textAlign: "center",
          cursor: "pointer",
          width: "100%",
        }}
      >
        <input {...getInputProps()} />
        {image ? (
          <Typography color="success.main">{image.name}</Typography>
        ) : (
          <Typography>Drag 'n' drop an image, or click to select one</Typography>
        )}
      </Box>

      {/* SKU Input */}
      <TextField
        label="SKU"
        variant="outlined"
        fullWidth
        value={sku}
        onChange={(e) => setSku(e.target.value)}
      />

      {/* Price Input */}
      <TextField
        label="Price"
        variant="outlined"
        type="number"
        fullWidth
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* Submit Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={!image || !sku || !price}
      >
        Submit
      </Button>

      {/* Redirect Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleRedirect}
        sx={{ mt: 2 }}
      >
        Go to Glb Upload Page
      </Button>
    </Box>
  );
};

export default FormPage;
