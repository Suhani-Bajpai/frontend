import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Unauthorized() {
  const navigate = useNavigate();
  const returnToHome = () => {
    navigate('/');
  };
  return (
    <div>
      Unauthorized
      <div>
        <Button sx={{ '&:hover': { backgroundColor: 'lightblue' } }} onClick={() => { returnToHome(); }} size="small" color="primary">
          Back
        </Button>
      </div>
    </div>
  );
}

export default Unauthorized;
