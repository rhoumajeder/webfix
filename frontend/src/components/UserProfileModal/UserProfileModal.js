import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import moment from "moment";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {GiCheckMark} from 'react-icons/gi';
import {GiCrossMark} from 'react-icons/gi';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useToasts } from "react-toast-notifications";
import { KeyboardDatePicker } from "@material-ui/pickers";


import UserAvatar from '../UserAvatar/UserAvatar';
import axiosInstance from "../../helpers/axios";



const UserProfileModal = ({profile, onSuccess, ...props}) => {
  const profileImage = profile.photo
  const { addToast } = useToasts();

  const handleModal = () => {
    props.setModalOpen(!props.isModalOpen);
  };


  const [profilePic, setProfilePic] = useState(profileImage)

  const [dobValue, setDobValue] = useState(moment(
    profile.dob || (new Date())
  ).format("YYYY-MM-DD"))


  const [isPassDirty, setPassDirty] = useState(false)
  const [isPassConfirmed, setPassConfirmed] = useState(false)
  const [passValue, setPassValue] = useState('')
  const [confirmPassValue, setConfirmPassValue] = useState('')

  const handlePassValueChange = (e) => {
    const value = e.target.value
    setPassValue(value)

    if((confirmPassValue !== '') && (value !== '')){
      if(!isPassDirty){
        setPassDirty(true)
      } else {
        setPassConfirmed(confirmPassValue == value)
      }
    } else {
      if(isPassDirty){
        setPassDirty(false)
      }
      setPassConfirmed(false)
    }
  }

  const handleConfirmPassValueChange = (e) => {
    const value = e.target.value
    setConfirmPassValue(value)

    if((passValue !== '') && (value !== '')){
      if(!isPassDirty){
        setPassDirty(true)
      } else {
        setPassConfirmed(passValue == value)
      }
    } else {
      if(isPassDirty){
        setPassDirty(false)
      }
      setPassConfirmed(false)
    }
  }

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
    formData.append('id', profile.id)

    // photo
    const photo = formData.get('photo')
    if (photo.name == ''){
      formData.delete('photo')
    }

    // pass
    const pass = formData.get('password')
    const confirmPass = formData.get('confirm_password')
    if (pass == ''){
      formData.delete('password')
      formData.delete('confirm_password')
    } else {
      if (pass !== confirmPass){
        addToast('Password Mismatch.', { appearance: "error" });
        return
      }
    }

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
        <Container maxWidth="sm" className="p-0">
          <Box component={Paper} className="p-4 vh-100 overflow-auto">
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
                  <UserAvatar profile={profilePic} name={profile.username} />
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
                    Name
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
                    Last Name
                  </Typography>
                  <TextField
                    required
                    fullWidth
                    name="last_name"
                    variant="outlined"
                    placeholder="Last Name"
                    defaultValue={profile.last_name}
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
                    Date Of Birth
                  </Typography>
                  <KeyboardDatePicker
                    disableToolbar
                    autoOk
                    value={dobValue}
                    name="dob"
                    format="YYYY-MM-DD"
                    margin="normal"
                    fullWidth
                    id="date-picker-inline"
                    placeholder="Aujourd'hui"
                    className={"m-0 p-0"}
                    color={"primary"}
                    InputLabelProps={{ shrink: false }}
                    size="small"
                    inputVariant="outlined"
                    onChange={date => setDobValue(moment(date).format("YYYY-MM-DD"))}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    Password {isPassDirty && (isPassConfirmed ? (
                      <GiCheckMark className="text-success" />
                    ) : (
                      <GiCrossMark className="text-danger" />
                    ))}
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    name="password"
                    variant="outlined"
                    placeholder="Password"
                    defaultValue={passValue}
                    onChange={handlePassValueChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle2"
                    color="textPrimary"
                    className="fw-bold my-2"
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    name="confirm_password"
                    variant="outlined"
                    placeholder="Confirm Password"
                    defaultValue={confirmPassValue}
                    onChange={handleConfirmPassValueChange}
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
