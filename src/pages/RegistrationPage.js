import React, { useState } from 'react';

import FirstForm from 'Components/FirstFormComponent';
import SecondForm from 'Components/SecondFormComponent';
import { checkInputs, checkPassword } from 'Share/share';

import { Form } from 'reactstrap';
import { registrationUser } from 'Services/registration.service';
import ToastBottom from 'Components/ToastBottom';
import { FormattedMessage } from 'react-intl';

const RegistrationPage = (props) => {
  const [user, setUser] = useState({
    fname: 'dsfewfrwfsdf',
    lname: 'afsdfawfdsfasdf',
    username: '',
    password: '',
    password_confirm: '',
    email: '',
  });
  const [error, setError] = useState({});
  const [step, setStep] = useState('first');
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState({
    display: false,
    color: 'danger', //success
    message: 'test',
    info: 'test',
  });

  let nextStep = (e) => {
    e.stopPropagation();
    e.preventDefault();

    checkInputs({ fname: user.fname, lname: user.lname })
      .then((res) => {
        setError({});
        setStep('second');
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  let saveUser = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(user);
    checkInputs(user)
      .then((res) => {
        console.log('succes');
        setError({});
        setLoader(true);
        registrationUser(user)
          .then((res) => {
            setLoader(false);
            setToast({
              display: true,
              color: 'success',
              message: 'Your registration is a success!',
              info: 'Congratulations',
            });
          })
          .catch((error) => {
            setLoader(false);
            setToast({
              display: true,
              color: 'danger',
              message: 'Your registration is a failed!',
              info: 'Wrong',
            });
          });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  let handleChange = (e) => {
    // console.log(e, e.target);
    setUser({ ...user, [e.target.name]: e.target.value });

    if (e.target.name === 'password') {
      let err = checkPassword(e.target.value);

      setError({ ...error, password: err });
    }
  };
  return (
    <>
      <div className="registration-form">
        <h2>
          <FormattedMessage id="REGISTRATION_PAGE" />
        </h2>
        <Form className={step}>
          <FirstForm
            nextStep={nextStep}
            user={user}
            error={error}
            handleChange={handleChange}
          />
          <SecondForm
            saveUser={saveUser}
            user={user}
            error={error}
            handleChange={handleChange}
            loader={loader}
          />
        </Form>
      </div>
      <ToastBottom toast={toast} />
    </>
  );
};

export default RegistrationPage;
