import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as authAction from '../redux/asyncActions/auth';
import * as authReducersAction from '../redux/reducers/auth';
import * as Validation from '../helpers/validation';
import Button from '../components/buttons/Button';
import CenteredCard from '../components/card/CenteredCard';
import Alert from '../components/alert/Alert';
import * as authorizationAction from '../redux/reducers/authorization';

function Login() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const submitAction = async (val) => {
    dispatch(authAction.login(val));
  };

  // const toRegister = () => {
  //   navigate('/register');
  // };

  useEffect(() => {
    if (store.status === `${authAction.loginActionType}/fulfilled`) {
      dispatch(authReducersAction.handleReset());
      dispatch(authorizationAction.handleSetToken(store.data.access_token));
      navigate('/');
    }
    if (store.status === `${authAction.loginActionType}/rejected`) {
      setTimeout(() => {
        dispatch(authReducersAction.handleReset());
      }, 1500);
    }
  }, [store.status]);

  return (
    <>
      {store.status === `${authAction.loginActionType}/rejected` ? (
        <Alert type="alert-error">{`Login Failed ${store.error?.message}`}</Alert>
      ) : null}
      <CenteredCard>
        <div>
          <div className="card-title mb-2">Login</div>
          <LoginForm className="card-body" onSubmit={submitAction} status={store.status} />
          <div className="card-actions justify-strecth mt-6">
            <p>
              Dont have an account?
              <Link className="link link-primary" to="/register"> SignUp</Link>
            </p>
          </div>
        </div>
      </CenteredCard>
    </>
  );
}

function LoginForm({ onSubmit, status }) {
  return (
    <Formik
      className="form-control"
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
          <p className="text-end"><Link className="link link-primary" to="/forgot-password">Forgot password?</Link></p>
          <Button type="submit" isLoading={status === `${authAction.loginActionType}/pending`}>Login</Button>

        </Form>
      )}
    </Formik>
  );
}

export default Login;
