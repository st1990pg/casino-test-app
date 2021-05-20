import React, { useState } from 'react';

import FirstForm from '../components/FirstFormComponent';
import SecondForm from '../components/SecondFormComponent';
import { checkInputs, checkPassword } from '../share/share';

import { Form } from 'reactstrap';
import { registrationUser } from '../services/registration.service';
import { FormattedMessage, useIntl } from 'react-intl';

import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const RegistrationPage = (props) => {
  const [user, setUser] = useState({
    fname: '',
    lname: '',
    username: '',
    password: '',
    password_confirm: '',
    email: '',
  });
  const [error, setError] = useState({});
  const intl = useIntl();
  function getSteps() {
    return [
      intl.formatMessage({ id: 'enter_frst_and_last' }),
      intl.formatMessage({ id: 'enter_other_inf' }),
      intl.formatMessage({ id: 'AGGREE_TO' }),
    ];
  }
  const [condition, setCondition] = useState(false);
  const [loader, setLoader] = useState(false);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [toast, setToast] = useState(false);

  const handleNext = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (activeStep === 0) {
      checkInputs({ fname: user.fname, lname: user.lname })
        .then((res) => {
          setError({});
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          setError(error);
        });
    } else {
      checkInputs(user)
        .then((res) => {
          setError({});
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setUser({
      fname: '',
      lname: '',
      username: '',
      password: '',
      password_confirm: '',
      email: '',
    });
  };

  let saveUser = (e) => {
    e.stopPropagation();
    e.preventDefault();

    checkInputs(user)
      .then((res) => {
        setError({});
        setLoader(true);
        registrationUser(user)
          .then((res) => {
            setLoader(false);
            setToast(true);
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          })
          .catch((error) => {
            setLoader(false);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };

  let handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      let err = checkPassword(e.target.value);

      setError({ ...error, password: err });
    }
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <FirstForm user={user} error={error} handleChange={handleChange} />
        );
      case 1:
        return (
          <SecondForm
            user={user}
            error={error}
            handleChange={handleChange}
            loader={loader}
          />
        );
      case 2:
        return (
          <>
            <p>{intl.formatMessage({ id: 'AGGREE_TO_TEXT' })}</p>
            <FormControlLabel
              control={
                <Checkbox
                  value={condition}
                  onClick={() => {
                    setCondition(!condition);
                  }}
                  name="gilad"
                />
              }
              label={intl.formatMessage({ id: 'AGGREE_TO' })}
            />
          </>
        );
      default:
        return 'Unknown step';
    }
  }
  return (
    <div className={classes.root}>
      <h2 className="sing-up">
        <FormattedMessage id="SING_UP" />
      </h2>
      <p className="subtitle">
        <FormattedMessage id="GET_BONUS" />
      </p>
      <Form>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography variant="inherit">
                  {getStepContent(index)}
                </Typography>
                <div className="flex-center">
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      <FormattedMessage id="BACK" />
                    </Button>
                    {activeStep !== steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        <FormattedMessage id="NEXT" />
                        {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                      </Button>
                    )}
                    {activeStep === steps.length - 1 && (
                      <Button
                        variant="contained"
                        color="primary"
                        disabled={!condition}
                        onClick={saveUser}
                        className={classes.button}
                      >
                        <FormattedMessage id="SAVE" />
                        {/* {activeStep === steps.length - 1 ? 'Finish' : 'Next'} */}
                      </Button>
                    )}
                    {loader ? <CircularProgress /> : ''}
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Form>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>
            <FormattedMessage id="COMPILTED_REGISTRATION" />
          </Typography>
          <Button onClick={handleReset} className={classes.button}>
            <FormattedMessage id="RESET" />
          </Button>
        </Paper>
      )}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={toast}
        autoHideDuration={5000}
        onClose={() => {
          setToast(false);
        }}
      >
        <Alert
          onClose={() => {
            setToast(false);
          }}
          severity="success"
        >
          {intl.formatMessage({ id: 'REGISTRATION_SUCC' })}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default RegistrationPage;
