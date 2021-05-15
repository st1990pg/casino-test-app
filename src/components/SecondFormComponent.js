import React, { useState } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  Button,
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import Loader from './Loader';

const SecondForm = (props) => {
  const [condition, setCondition] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="second-form">
      <FormGroup>
        <Label for="username">
          <FormattedMessage id="USERNAME" />
        </Label>
        <Input
          type="text"
          value={props.user.username}
          onChange={props.handleChange}
          name="username"
          invalid={props.error.username}
        />
        <FormFeedback>{props.error.username}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="email">
          <FormattedMessage id="EMAIL" />
        </Label>
        <Input
          type="email"
          value={props.user.email}
          onChange={props.handleChange}
          name="email"
          invalid={props.error.email}
        />
        <FormFeedback>{props.error.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="password">
          <FormattedMessage id="PASSWORD" />
        </Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={props.user.password}
          onChange={props.handleChange}
          name="password"
          invalid={
            typeof props.error.password === 'object' &&
            props.error.password.code === 'error'
          }
          valid={
            typeof props.error.password === 'object' &&
            props.error.password.code === 'strong'
          }
        />
        <FormFeedback>
          {props.error.password && props.error.password.message}
        </FormFeedback>
        <FormFeedback valid>
          {props.error.password && props.error.password.message}
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="password_confirm">
          <FormattedMessage id="PASSWORD_CON" />
        </Label>
        <Input
          type={showPassword ? 'text' : 'password'}
          value={props.user.password_confirm}
          onChange={props.handleChange}
          name="password_confirm"
          invalid={props.error.password_confirm}
        />
        <FormFeedback>{props.error.password_confirm}</FormFeedback>
      </FormGroup>
      <FormGroup className="mt-3">
        <Label check>
          <Input
            type="checkbox"
            className="mr-10"
            value={showPassword}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          />
          <FormattedMessage id="SHOW_PASSWORD" />
        </Label>
      </FormGroup>
      <FormGroup className="mt-3">
        <Label check>
          <Input
            type="checkbox"
            className="mr-10"
            value={condition}
            onClick={() => {
              setCondition(!condition);
            }}
          />
          <FormattedMessage id="AGGREE_TO" />
        </Label>
      </FormGroup>
      <div className="both">
        <Button
          color="primary"
          disabled={props.loader || !condition}
          className="mt-3 pull-left"
          onClick={props.saveUser}
        >
          <FormattedMessage id="SAVE" />
        </Button>
        {props.loader && <Loader />}
      </div>
    </div>
  );
};

export default SecondForm;
