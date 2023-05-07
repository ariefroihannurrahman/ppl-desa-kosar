import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CenteredCard from '../components/card/CenteredCard';
import Button from '../components/buttons/Button';
import * as authorizationAction from '../redux/reducers/authorization';

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(authorizationAction.handleReset());
    localStorage.removeItem('isLoggedIn');
    navigate('./login', { replace: true });
  };
  return (
    <CenteredCard>
      <div>
        <div className="card-title mb-6">Wellcome</div>
        <Button type="button" onClick={logout}>Logout</Button>
        <Button type="button" onClick={() => { navigate('/profile'); }}>Profile</Button>
      </div>
    </CenteredCard>
  );
}

export default Home;
