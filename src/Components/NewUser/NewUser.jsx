import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewUser } from '../../Redux/UsertableSLice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function NewUser({ open, handleClose }) {
  const dispatch = useDispatch();
//   below code for local state and it use for form field or error message
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  // Form field change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // by useing if condition operator we validate state values or show error massage
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Valid email is required';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) {
        newErrors.phone = 'Phone number must be 10 digits';
      }
      
    if (!formData.companyName) newErrors.companyName = 'Company name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // below code for Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const newUser = {
        ...formData,
        company: { name: formData.companyName || 'Unknown' }, 
      };
  
      dispatch(addNewUser(newUser));
  
      handleClose();
    }
  };
  

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography variant="h6" component="h2" gutterBottom>
          Add New User
        </Typography>
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Phone"
                variant="outlined"
                fullWidth
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Company Name"
                variant="outlined"
                fullWidth
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                error={!!errors.companyName}
                helperText={errors.companyName}
              />
            </Grid>
          </Grid>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Add User
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default NewUser;
