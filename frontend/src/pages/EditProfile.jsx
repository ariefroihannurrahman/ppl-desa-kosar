import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as profileAction from '../redux/asyncActions/profile';
import Button from '../components/buttons/Button';
import BackButton from '../components/buttons/BackButton';
import CenteredCard from '../components/card/CenteredCard';
import Alert from '../components/alert/Alert';

function EditProfile({ token }) {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.profile);
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
  }, [image]);

  const updateProfile = (val) => {
    const data = {
      token,
      val: { ...val, image },
    };
    dispatch(profileAction.updateProfile(data));
  };

  useEffect(() => {
    if (store.status === `${profileAction.updateProfileActionType}/fulfilled`) {
      navigate(-1);
    }
  }, [store]);

  return (
    <div className="edit-profile">
      {store.status === `${profileAction.updateProfileActionType}/rejected` ? (
        <Alert type="alert-error">{`Failed ${store.error?.message}`}</Alert>
      ) : null}
      <CenteredCard>
        <div className="text-center">
          <div className="card-title mb-4">Edit Profile</div>
          <div className="avatar self-center">
            <div className=" rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 self-center">
              <img src={preview ?? `${store.profile?.picture}`} alt={store.profile?.fullName} />
            </div>
          </div>
          <div className="card-body items-center text-center">
            <EditProfileForm
              status={store.status}
              onSubmit={updateProfile}
              initial={location.state}
              setImage={setImage}
            />

          </div>
        </div>

      </CenteredCard>
      <img className="profile-image" src={`http://localhost:8081/assets/uploads/${location.state?.picture}`} alt={store.profile?.fullName} />
      {(store.status === `${profileAction.updateProfileActionType}/rejected`)
        ? <p>{store.errMsg}</p> : null}
    </div>
  );
}

function EditProfileForm({
  onSubmit, status, initial, setImage,
}) {
  const onImagePicked = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <Formik
      initialValues={{
        fullName: initial.fullName,
        picture: null,
        birthDate: initial.birthDate,
      }}
      onSubmit={({ fullName, birthDate }) => {
        onSubmit({ fullName, birthDate });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field className="form" name="fullName" type="text" placeholder="fullName" />
          {errors.fullName && touched.fullName ? <div className="form-error-msg">{errors.fullName}</div> : null}
          <br />
          <input className="file-input file-input-bordered file-input-info w-full max-w-xs" name="picture" type="file" accept="image/*" onChange={onImagePicked} placeholder="Picture" />
          {errors.picture && touched.picture ? (<div className="form-error-msg">{errors.picture}</div>) : null}
          <br />
          <Field className="form" name="birthDate" type="text" placeholder="Birt Date" />
          {errors.birthDate && touched.birthDate ? (<div className="form-error-msg">{errors.birthDate}</div>) : null}
          <br />
          <div className="card-actions justify-center">
            <BackButton>Back</BackButton>
            <Button type="submit" isLoading={status === `${profileAction.updateProfileActionType}/pending`}>Save</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default EditProfile;
