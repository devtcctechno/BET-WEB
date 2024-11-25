"use client";

import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Badge,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { useSkuList } from "../../../api/sku-list";
import { useAddProductGLB } from "../../../api/add-glb";
import { useDeleteProductGLB } from "../../../api/delete-glb";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AnotherPage = () => {
  // -- HOOK --
  const router = useRouter();

  // -- STATE --
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedGlbs, setSelectedGlbs] = useState<any[]>([]);
  const [selectedPmat, setSelectedPmat] = useState<any[]>([]);
  const [open, setOpen] = React.useState(false);

  //-- API --
  const skuList = useSkuList().data?.data;
  const addGlb = useAddProductGLB();
  const deleteGlb = useDeleteProductGLB();

  // -- USE EFFECT --
  useEffect(() => {
    if (deleteGlb.isSuccess) {
      setSelectedOption("");
      setSelectedGlbs([]);
      setSelectedPmat([]);
      setOpen(false);
    }
  }, [deleteGlb.isSuccess]);

  // -- FUNCTION --
  const handleDropdownChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Dropzone = ({ label, onDrop, selected }: any) => {
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
          width: "100%",
        }}
      >
        <input {...getInputProps()} />
        <Badge badgeContent={selected} color="primary">
          <Typography variant="body1" color="textSecondary">
            Drag and drop your {label} file here, or click to browse.
          </Typography>
        </Badge>
      </Box>
    );
  };

  const handleGlbDrop = (files: any) => {
    setSelectedGlbs(files);
  };

  const handlePmatDrop = (files: any) => {
    setSelectedPmat(files);
  };

  const handleSave = () => {
    const formData = new FormData();
    selectedGlbs.map((glbs) => {
      formData.append("GLB", glbs);
    });
    selectedPmat.map((pmat) => {
      formData.append("PMAT", pmat);
    });

    addGlb.mutate(
      {
        id: selectedOption,
        body: formData,
      },
      {
        onSuccess: () => {
          setSelectedOption("");
          setSelectedGlbs([]);
          setSelectedPmat([]);
        },
      }
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    deleteGlb.mutate(selectedOption);
  };

  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      my: 'auto',
      px: 3,
      py: 5,
      border: "1px solid #ccc",
      borderRadius: 2,
      maxWidth: 700,
      margin: "auto",
      backgroundColor: "#f9f9f9",
    }}
    >
      <Typography variant="h3" color="primary" mb={3}>
        GLB and PMAT files upload
      </Typography>

      {/* Dropdown */}
      <FormControl fullWidth sx={{ mb: 4 }}>
        <InputLabel id="dropdown-label">Select Option</InputLabel>
        <Select
          labelId="dropdown-label"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          {skuList?.map((item: any) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.sku}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      {/* Dropzones */}
      <Dropzone
        label="GLB"
        onDrop={handleGlbDrop}
        selected={selectedGlbs.length}
      />
      <Dropzone
        label="PMAT"
        onDrop={handlePmatDrop}
        selected={selectedPmat.length}
      />

      {/* Buttons */}
      <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button
          variant="contained"
          color="primary"
          disabled={
            selectedOption.length === 0 ||
            selectedGlbs.length === 0 ||
            selectedPmat.length === 0
          }
          onClick={handleSave}
        >
          Save
        </Button>
        <Button variant="contained" color="error" onClick={handleClickOpen}>
          Delete
        </Button>
      </Box>

      {/* Navigation */}
      <Button
        variant="outlined"
        color="secondary"
        onClick={() => router.push("/")}
        sx={{
          color: "blue",
          fontSize: "18px",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        Go Back to Product Page
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this Product Glb and Pmat files ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDelete} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnotherPage;
