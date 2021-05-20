import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
} from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { FormattedMessage, useIntl } from 'react-intl';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
}));

const FirstForm = (props) => {
  const classes = useStyles();
  const intl = useIntl();
  return (
    <div className={classes} autoComplete="off">
      <TextField
        key="fname"
        type="text"
        error={props.error && props.error.fname ? true : false}
        value={props.user.fname}
        onChange={props.handleChange}
        name="fname"
        label={intl.formatMessage({ id: 'FRST_NAME' })}
        fullWidth={true}
        helperText={
          props.error.fname
            ? intl.formatMessage(
                { id: `${props.error.fname.invalid_message}` },
                { number: props.error.fname.parameters.targetLength }
              )
            : ' '
        }
      />

      <TextField
        key="lname"
        type="text"
        error={props.error && props.error.lname ? true : false}
        value={props.user.lname}
        onChange={props.handleChange}
        name="lname"
        label={intl.formatMessage({ id: 'LAST_NAME' })}
        fullWidth={true}
        helperText={
          props.error.lname
            ? intl.formatMessage(
                { id: `${props.error.lname.invalid_message}` },
                { number: props.error.lname.parameters.targetLength }
              )
            : ' '
        }
      />
    </div>
  );
};

export default FirstForm;
