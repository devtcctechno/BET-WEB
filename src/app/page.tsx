"use client";

import React, { useState } from "react";

import { TextField, Button, Typography, Box } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { useAddProduct } from "../../api/add-product";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { LoadingButton } from "@mui/lab";

const FormPage = () => {
  // -- HOOK --
  const router = useRouter();

  // -- STATE --
  const [image, setImage] = useState<any>(null);
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");
  const [open, setOpen] = React.useState({
    open: false,
    message: "",
  });

  // -- HOOK --
  const addProduct = useAddProduct();

  // -- FUNCTION --
  const onDrop = (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    setImage(file);
  };

  const handleSubmit = (e: any) => {
    console.log(sku, image, price);
    e.preventDefault();
    addProduct.mutate(
      {
        sku,
        image,
        price,
      },
      {
        onSuccess: () => {
          setImage(null);
          setSku("");
          setPrice("");
          setOpen({
            open: true,
            message: "Product added successfully!",
          });
        },
      }
    );
  };

  const handleRedirect = () => {
    router.push("/upload-glb"); // Redirects to `/another-page`
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" as any,
  });
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen({
      open: false,
      message: "",
    });
  };

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
          <Typography color="textSecondary">
            Drag 'n' drop an image, or click to select one
          </Typography>
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
      <LoadingButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 2 }}
        disabled={!image || !sku || !price}
        loading={addProduct.isLoading}
      >
        Submit
      </LoadingButton>

      {/* Redirect Button */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={handleRedirect}
        sx={{ mt: 2 }}
      >
        Go to Glb Upload Page
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open.open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={open.message}
        sx={{ "& .MuiSnackbarContent-root": { backgroundColor: "blue" } }}
      />
    </Box>
  );
};

export default FormPage;
