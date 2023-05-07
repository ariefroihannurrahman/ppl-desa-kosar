import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import { useEffect } from 'react';
import BackButton from '../components/buttons/BackButton';
import * as Validation from '../helpers/validation';
import Button from '../components/buttons/Button';
import CenteredCard from '../components/card/CenteredCard';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';
import * as authorizationAction from '../redux/reducers/authorization';
import Alert from '../components/alert/Alert';

function Register() {
  const navigate = useNavigate();
  const store = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const submitAction = async (val) => {
    dispatch(authAction.register(val));
  };

  useEffect(() => {
    if (store.status === `${authAction.registerActionType}/fulfilled`) {
      dispatch(authorizationAction.handleSetToken(store.data.access_token));
      dispatch(authReducersAction.handleReset());
      navigate('/');
    }
    if (store.status === `${authAction.registerActionType}/rejected`) {
      setTimeout(() => {
        dispatch(authReducersAction.handleReset());
      }, 1500);
    }
  }, [store]);
  return (
    <>
      {store.status === `${authAction.registerActionType}/rejected` ? (
        <Alert type="alert-error">{`Register Failed ${store.error?.message}`}</Alert>
      ) : null}
      <CenteredCard>
        <div>
          <div className="card-title">Register</div>
          <RegisterForm className="card-body" onSubmit={submitAction} isLoading={store.status === `${authAction.registerActionType}/pending`} />
          <div className="card-actions justify-end">
            <BackButton />
          </div>
        </div>
      </CenteredCard>
    </>
  );
}

function RegisterForm({ onSubmit, isLoading }) {
  return (
    <Formik
      initialValues={{
        password: '',
        email: '',
      }}
      validationSchema={Validation.default.EmailPassSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field className="form" name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field className="form" name="password" type="password" placeholder="Password" />
          {errors.password && touched.password ? (
            <div className="form-error-msg">{errors.password}</div>
          ) : null}
          <br />
          <Button type="submit" isLoading={isLoading}>Register</Button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;
