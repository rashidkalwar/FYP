import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLogout } from '../../redux/user/userSlice';
import { Button } from '@nextui-org/react';

function Home() {
  const user = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {user ? (
        <div className="flex flex-col items-center">
          <div>You're logged in as {user.username}</div>
          <Button
            radius="full"
            variant="shadow"
            className="bg-gray-700 hover:bg-gray-600 text-white mt-2"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <>
          <div>You are not logged in, please </div>
          <Link className="ml-1 text-teal-600 hover:underline" to="/login">
            Login!
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
