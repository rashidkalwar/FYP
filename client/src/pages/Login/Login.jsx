import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button, Divider, Card, Input, Checkbox } from '@nextui-org/react';
import { toast } from 'react-hot-toast';
import { userLogin } from '../../redux/user/userSlice';
import GoogleOAuthButton from '../../components/GoogleOAuthButton';

function Login() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const values = {
    username: username,
    password: password,
  };

  // Error handling for local state
  const [inputErrors, setInputErrors] = React.useState({});

  // Accessing global state
  const { error, loading, message } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(userLogin({ values, navigate }));
  };

  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  React.useEffect(() => {
    const loggedUser = localStorage.getItem('user')
      ? localStorage.getItem('user')
      : null;

    // check for if exists user then redirect from login to home page
    if (loggedUser) {
      navigate(redirect);
    }

    setInputErrors(error); // Set global state errors to local state

    message && toast.success(message);
    error.message && toast.error(error.message);
  }, [navigate, redirect, error, message]);

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md p-7 shadow-none">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold mt-7 text-center">Welcome back</p>
          <p className="mt-2 font-medium text-gray-600 text-center">
            Welcome back! Please enter your details
          </p>
          <GoogleOAuthButton />
          <div className="flex items-center w-full justify-center text-gray-500 font-medium">
            <Divider className="mr-2 w-28" />
            or
            <Divider className="ml-2 w-28" />
          </div>
        </div>
        <form action="/" onSubmit={handleLogin}>
          <Input
            className="rounded-full my-5"
            type="text"
            name="name"
            labelPlacement="outside"
            label="Username"
            placeholder="Enter your username"
            isRequired
            size="md"
            radius="full"
            variant="bordered"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setInputErrors({ ...inputErrors, username: '' });
            }}
            validationState={inputErrors.username ? 'invalid' : 'valid'}
            errorMessage={inputErrors.username ? inputErrors.username : null}
          />
          <Input
            className="rounded-full my-5"
            type="password"
            name="password"
            labelPlacement="outside"
            label="Password"
            placeholder="Enter your password"
            isRequired
            size="md"
            radius="full"
            variant="bordered"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setInputErrors({ ...inputErrors, password: '' });
            }}
            validationState={inputErrors.password ? 'invalid' : 'valid'}
            errorMessage={inputErrors.password ? inputErrors.password : null}
          />
          <Checkbox color="default" size="sm">
            Remember me
          </Checkbox>
          <Button
            radius="full"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold w-full my-5 "
            disableRipple
            variant="shadow"
            type="submit"
            isLoading={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </Button>
          <p className="text-sm font-medium text-gray-700">
            Don't have an account?{' '}
            <Link className="text-teal-600" to="/register">
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default Login;
