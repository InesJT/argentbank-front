import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { login } from '/src/redux/slices/auth';
import { ErrorText, InputText } from '/src/components';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      setLoading(true);
      setErrorMessage(null);

      dispatch(login({ email, password }))
        .unwrap()
        .then(() => {
          navigate('/profile');
        })
        .catch((message) => {
          setErrorMessage(message);
          setLoading(false);
        });
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputText name="email" register={register} placeholder="Email" containerStyle="input-wrapper" labelTitle="Email" />
          <InputText
            type="password"
            name="password"
            register={register}
            placeholder="Password"
            containerStyle="input-wrapper"
            labelTitle="Password"
          />
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {errors.email && <ErrorText styleClass="error-text">{errors.email.message}</ErrorText>}
          {errors.password && <ErrorText styleClass="error-text">{errors.password.message}</ErrorText>}
          {errorMessage && <ErrorText styleClass="error-text">{errorMessage}</ErrorText>}
          {loading && <p>Loading...</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
