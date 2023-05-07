import { useNavigate } from 'react-router-dom';
import Button from './Button';

function BackButton({ children, replace }) {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => { navigate(-1, { replace }); }}>
      {children ?? 'Back'}
    </Button>
  );
}

export default BackButton;
