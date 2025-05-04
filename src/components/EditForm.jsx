import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { ErrorText, InputText } from "/src/components";
import { updateProfile } from "../redux/slices/profile";

const schema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});

const EditForm = ({ first, last, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: first,
      lastName: last,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    const { firstName, lastName } = data;
    try {
      setLoading(true);
      setErrorMessage(null);

      dispatch(updateProfile({ token, data: { firstName, lastName } }))
        .unwrap()
        .then(() => {
          setLoading(false);
          handleCancel();
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

  return (
    <section className="sign-in-content">
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText
          name="firstName"
          register={register}
          placeholder="FirstName"
          containerStyle="input-wrapper"
          labelTitle="FirstName"
        />
        <InputText
          name="lastName"
          register={register}
          placeholder="LastName"
          containerStyle="input-wrapper"
          labelTitle="LastName"
        />
        {errors.firstName && (
          <ErrorText styleClass="error-text">
            {errors.firstName.message}
          </ErrorText>
        )}
        {errors.lastName && (
          <ErrorText styleClass="error-text">
            {errors.lastName.message}
          </ErrorText>
        )}
        {errorMessage && (
          <ErrorText styleClass="error-text">{errorMessage}</ErrorText>
        )}
        {loading && <p>Loading...</p>}
        <button type="submit" className="sign-in-button">
          Save
        </button>
        <button className="sign-in-button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </section>
  );
};

EditForm.propTypes = {
  first: PropTypes.string.isRequired,
  last: PropTypes.string.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default EditForm;
