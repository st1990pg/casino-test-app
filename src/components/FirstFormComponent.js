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
import { FormattedMessage } from 'react-intl';

const FirstForm = (props) => {
  return (
    <div className="first-form">
      <FormGroup>
        <Label for="fname">
          <FormattedMessage id="FRST_NAME" />
        </Label>
        <Input
          type="text"
          value={props.user.fname}
          onChange={props.handleChange}
          name="fname"
          invalid={props.error.fname}
        />
        <FormFeedback>{props.error.fname}</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Label for="lname">
          <FormattedMessage id="LAST_NAME" />
        </Label>
        <Input
          type="text"
          value={props.user.lname}
          onChange={props.handleChange}
          name="lname"
          invalid={props.error.lname}
        />
        <FormFeedback>{props.error.lname}</FormFeedback>
      </FormGroup>
      <Button color="primary" className="mt-3" onClick={props.nextStep}>
        <FormattedMessage id="NEXT" /> >>
      </Button>
    </div>
  );
};

export default FirstForm;
