import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useToasts } from "react-toast-notifications";


import UserAvatar from '../UserAvatar/UserAvatar';
import axiosInstance from "../../helpers/axios";



const UserProfileModal = ({profile, onSuccess, ...props}) => {
  const profileImage = profile.photo
  const fullName = `${profile.first_name} ${profile.last_name}`
  const { addToast } = useToasts();

  const handleModal = () => {
    props.setModalOpen(!props.isModalOpen);
  };


  const [profilePic, setProfilePic] = useState(profileImage)

  useEffect(() => {
    setProfilePic(profileImage)
  }, [profileImage])

  const handleProfilePicChange = (e) => {
    const files = e.target.files

    if (files.length > 0){
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfilePic(e.target.result)
      }
      reader.readAsDataURL(files[0])
    } else {
      setProfilePic(null)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const photo = formData.get('photo')
    if (photo.name == ''){
      formData.delete('photo')
    }
    formData.append('id', profile.id)

    const data = {}
    formData.forEach((value, key) => {
      data[key] = value
    })

    axiosInstance
      .put("auth/update-profile", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        console.log(res.data);
        handleModal();
        addToast("Profile Updated Successfully.", { appearance: "success" });
        onSuccess(res.data)
      })
      .catch((err) => {
        console.log(err.response);
        addToast('Bad Request.', { appearance: "error" });
      });
  }

  return (
    <Modal
      open={props.isModalOpen}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Fade in={props.isModalOpen}>
        <Container maxWidth="sm" className="mt-5 p-0">
          <Box component={Paper} className="p-4">
            <form onSubmit={submitHandler}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box align="right">
                    <input
                      name="photo"
                      type="file"
                      accept="image/*"
                      className="d-none"
                      id="icon-button-file"
                      onChange={handleProfilePicChange}
                    />
                    <label htmlFor="icon-button-file">
                      <IconButton className="p-0" color="primary" aria-label="upload picture" component="span">
                        <PhotoCamera />
                      </IconButton>
                    </label>
                  </Box>
                  <UserAvatar profile={profilePic} name={fullName} />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold mb-2"
                  >
                    Introduction
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="intro"
                    variant="outlined"
                    placeholder="Intro"
                    defaultValue={profile.intro}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    First Name
                  </Typography>
                  <TextField
                    fullWidth
                    name="first_name"
                    variant="outlined"
                    placeholder="First Name"
                    defaultValue={profile.first_name}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    Email
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    type="email"
                    variant="outlined"
                    placeholder="Email"
                    defaultValue={profile.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    Phone Number
                  </Typography>
                  <TextField
                    fullWidth
                    name="phone_number"
                    variant="outlined"
                    placeholder="Phone Number"
                    defaultValue={profile.phone_number}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    Current Address
                  </Typography>
                  <TextField
                    fullWidth
                    name="address"
                    variant="outlined"
                    placeholder="Current Address"
                    defaultValue={profile.address}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box align="center">
                    <Button type="submit" color="primary" variant="contained" className="w-25">
                      Save
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Container>
      </Fade>
    </Modal>
  );
};

UserProfileModal.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  profile: PropTypes.shape({}).isRequired,
  onSuccess: PropTypes.func,
}

UserProfileModal.defaultProps = {
  onSuccess: (data) => {},
}


export default UserProfileModal;
