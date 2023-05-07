/* eslint-disable no-nested-ternary */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Validation from '../helpers/validation';
import Button from '../components/buttons/Button';
import BackButton from '../components/buttons/BackButton';
import MyDialog from '../components/MyDialog';
import CenteredCard from '../components/card/CenteredCard';
import Alert from '../components/alert/Alert';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);

  const submitAction = async (val) => {
    dispatch(authAction.resetPassword(val));
  };

  const handleCloseDialog = () => {
    dispatch(authReducersAction.handleReset());
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (store.status === `${authAction.resetPasswordActionType}/rejected`) {
      setTimeout(() => {
        dispatch(authReducersAction.handleReset());
      }, 1500);
    }
  }, [store.status]);

  return (
    <>
      {store.status === `${authAction.resetPasswordActionType}/rejected` ? (
        <Alert type="alert-error">{`Reset Password Failed ${store.error?.message}`}</Alert>
      ) : null}
      <CenteredCard>
        <div>
          <div className="card-title mb-4">Reset Password</div>
          <div>
            <LoginForm onSubmit={submitAction} isLoading={store.status === `${authAction.resetPasswordActionType}/pending`} />
          </div>
          <BackButton replace>Cancel</BackButton>
          <MyDialog
            open={store.status === `${authAction.resetPasswordActionType}/fulfilled`}
            title="Success"
            desc="We've reset your password, please login with new password"
            buttonText="Oke"
            handleToClose={handleCloseDialog}
          />
        </div>
      </CenteredCard>
    </>
  );
}

function LoginForm({ onSubmit, isLoading }) {
  return (
    <Formik
      initialValues={{
        newPassword: '',
        confirmPassword: '',
        email: '',
        code: '',
      }}
      validationSchema={Validation.default.ResetPassSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <Field className="form" name="email" type="email" placeholder="Email" />
          {errors.email && touched.email ? <div className="form-error-msg">{errors.email}</div> : null}
          <br />
          <Field className="form" name="code" type="number" placeholder="Code" />
          {errors.code && touched.code ? (<div className="form-error-msg">{errors.code}</div>) : null}
          <br />
          <Field className="form" name="newPassword" type="password" placeholder="New Password" />
          {errors.newPassword && touched.newPassword ? (<div className="form-error-msg">{errors.newPassword}</div>) : null}
          <br />
          <Field className="form" name="confirmPassword" type="password" placeholder="Confirm Password" />
          {errors.confirmPassword && touched.confirmPassword ? (<div className="form-error-msg">{errors.confirmPassword}</div>) : null}
          <br />
          <Button type="submit" isLoading={isLoading}>Reset Password</Button>
        </Form>
      )}
    </Formik>
  );
}

export default ResetPassword;
