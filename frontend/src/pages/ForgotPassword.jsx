/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Validation from '../helpers/validation';
import BackButton from '../components/buttons/BackButton';
import Button from '../components/buttons/Button';
import MyDialog from '../components/MyDialog';
import CenteredCard from '../components/card/CenteredCard';
import Alert from '../components/alert/Alert';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const forgotPassword = async (val) => {
    dispatch(authAction.forgotPassword(val));
  };

  const handleCloseDialog = () => {
    dispatch(authReducersAction.handleReset());
    navigate('/reset-password', { replace: true });
  };

  useEffect(() => {
    if (store.status === `${authAction.forgotPasswordActionType}/rejected`) {
      setTimeout(() => {
        dispatch(authReducersAction.handleReset());
      }, 1500);
    }
  }, [store.status]);

  return (
    <>
      {store.status === `${authAction.forgotPasswordActionType}/rejected` ? (
        <Alert type="alert-error">{`Forgot Password Failed ${store.error?.message}`}</Alert>
      ) : null}
      <CenteredCard>
        <div>
          <div className="card-title">Forgot Password</div>
          <ForgotPasswordForm onSubmit={forgotPassword} isLoading={store.status === `${authAction.forgotPasswordActionType}/pending`} />
          <BackButton />
          <MyDialog
            open={store.status === `${authAction.forgotPasswordActionType}/fulfilled`}
            title="Success"
            desc="We've sent reset password code to your email, please check your email"
            buttonText="Oke"
            handleToClose={handleCloseDialog}
          />
        </div>
      </CenteredCard>
    </>
  );
}

function ForgotPasswordForm({ onSubmit, isLoading }) {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={Validation.default.EmailSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field className="form" name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Button type="submit" isLoading={isLoading}>Send</Button>
        </Form>
      )}
    </Formik>
  );
}

export default ForgotPassword;
