import PropTypes from 'prop-types';

const InputText = ({ register, name, labelTitle, type, containerStyle, placeholder }) => {
  return (
    <div className={`${containerStyle}`}>
      <label htmlFor={`${name}`}>{labelTitle}</label>
      <input {...register(name)} type={type || 'text'} placeholder={placeholder || ''} />
    </div>
  );
};

InputText.propTypes = {
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  labelTitle: PropTypes.string.isRequired,
  labelStyle: PropTypes.string,
  type: PropTypes.string,
  containerStyle: PropTypes.string,
  placeholder: PropTypes.string,
};

export default InputText;
