import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  FormFeedback,
  FormText,
  Button,
} from 'reactstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InfoIcon from '@material-ui/icons/Info';
const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const SecondForm = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const intl = useIntl();

  return (
    <div className="second-form">
      <TextField
        key="username"
        type="text"
        error={props.error && props.error.username ? true : false}
        value={props.user.username}
        onChange={props.handleChange}
        name="username"
        label={intl.formatMessage({ id: 'USERNAME' })}
        fullWidth={true}
        helperText={
          props.error.username
            ? intl.formatMessage(
                { id: `${props.error.username.invalid_message}` },
                {
                  name: intl.formatMessage({ id: 'USERNAME' }),
                  number: props.error.username.parameters.targetLength,
                }
              )
            : ' '
        }
      />

      <TextField
        key="email"
        type="text"
        error={props.error && props.error.email ? true : false}
        value={props.user.email}
        onChange={props.handleChange}
        name="email"
        label={intl.formatMessage({ id: 'EMAIL' })}
        fullWidth={true}
        helperText={
          props.error.email
            ? intl.formatMessage({ id: `${props.error.email}` })
            : ' '
        }
      />

      <FormControl fullWidth={true}>
        <InputLabel
          className={
            props.error.password && props.error.password.code === 'strong'
              ? 'green'
              : ''
          }
          error={
            props.error &&
            props.error.password &&
            props.error.password.code === 'error'
              ? true
              : false
          }
          htmlFor="standard-adornment-password"
        >
          Password
        </InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={props.user.password}
          onChange={props.handleChange}
          name="password"
          className={
            props.error.password && props.error.password.code === 'strong'
              ? 'green'
              : ''
          }
          error={
            props.error &&
            props.error.password &&
            props.error.password.code === 'error'
              ? true
              : false
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {props.error.password && props.error.password.message ? (
          <FormHelperText
            error={
              props.error &&
              props.error.password &&
              props.error.password.code === 'error'
                ? true
                : false
            }
            className={
              props.error.password && props.error.password.code === 'strong'
                ? 'green'
                : ''
            }
          >
            {intl.formatMessage({ id: `${props.error.password.message}` })}
          </FormHelperText>
        ) : (
          <FormHelperText> </FormHelperText>
        )}
      </FormControl>

      <FormControl fullWidth={true}>
        <InputLabel
          error={props.error && props.error.password_confirm ? true : false}
          htmlFor="standard-adornment-password"
        >
          Password
        </InputLabel>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={props.user.password_confirm}
          onChange={props.handleChange}
          name="password_confirm"
          error={props.error && props.error.password_confirm ? true : false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
        {props.error.password_confirm ? (
          <FormHelperText
            error={props.error && props.error.password_confirm ? true : false}
          >
            {intl.formatMessage({ id: `${props.error.password_confirm}` })}
          </FormHelperText>
        ) : (
          <FormHelperText> </FormHelperText>
        )}
      </FormControl>
      <div>
        <p>
          <InfoIcon />
          {intl.formatMessage({ id: 'strong_passwor_info' })}
        </p>
      </div>

      {/* <div className="both">{props.loader && <Loader />}</div> */}
    </div>
  );
};

export default SecondForm;
