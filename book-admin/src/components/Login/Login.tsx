import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';

import * as Yup from 'yup';
import {Container,Row,Col,Card,CardBody,CardTitle,FormGroup,Label,Input,Button} from 'reactstrap';
import { useNavigate } from 'react-router-dom';


interface LoginFormValues {
  username: string;
  password: string;
}


const validationSchema: Yup.ObjectSchema<LoginFormValues> = Yup.object({
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .max(8, 'Username cannot exceed 8 characters')
    .required('Username is required'),

  password: Yup.string()
    .min(3, 'Password must be at least 3 characters')
    .max(8, 'Password cannot exceed 8 characters')
    .required('Password is required'),
});



function Login() {
  const navigate = useNavigate();

  const initialValues: LoginFormValues = {
    username: '',
    password: ''
  };



 const handleSubmit = (
  values: LoginFormValues
): void => {
  navigate('/console');
};




  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center">
      <Row className="w-100 justify-content-center">
        <Col md={6} lg={4}>
          <Card className="shadow-lg p-3">
            <CardBody>
              <CardTitle tag="h2" className="text-center mb-4">Sign In</CardTitle>
              
              <Formik<LoginFormValues>
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}

                
              >
                {() => (
                  <Form>
                   <FormGroup>
  <Label for="username">Username</Label>
<Field
  name="username"
  as={Input}
  type="text"
  id="username"
  placeholder="Enter your username"
/>

  <ErrorMessage name="username" component="div" className="text-danger small" />
</FormGroup>

<FormGroup>
  <Label for="password">Password</Label>
<Field
  name="password"
  as={Input}
  type="password"
  id="password"
  placeholder="Enter your password"
/>


  <ErrorMessage name="password" component="div" className="text-danger small" />


</FormGroup>

                    <Button type="submit" color="primary">
                      Sign In
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;