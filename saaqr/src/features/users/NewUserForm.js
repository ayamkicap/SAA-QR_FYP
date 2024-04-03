import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USERNAME_REGEX = /^[A-z]{3,20}$/;
const PASSWORD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewUserForm = () => {

  const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [yearStudy, setYearStudy] = useState("");
  const [active, setActive] = useState(true);
  const [roles, setRoles] = useState(["Student"]);

  useEffect(() => {
    setValidUsername(USERNAME_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PASSWORD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
        setUsername('');
        setEmail('');
        setPassword('');
        setCardNumber('');
        setYearStudy('');
        setRoles([]);
        setActive(true);
        navigate('/dash/users');
    }
}, [isSuccess, navigate]);



  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onCardNumberChanged = (e) => setCardNumber(e.target.value);
  const onYearStudyChanged = (e) => setYearStudy(e.target.value);
  const onActiveChanged = (e) => setActive(e.target.checked);

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const canSave =
    [
      validUsername,
      validEmail,
      validPassword,
      cardNumber.length > 0,
      yearStudy.length > 0,
    ].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({
        username,
        email,
        password,
        card_number: cardNumber,
        roles,
        year_study: yearStudy,
        active,
      });
    }
  };

  const options = Object.values(ROLES).map((role) => (
    <option key={role} value={role}>
      {role}
    </option>
  ));

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''
  const validCardClass = cardNumber.length === 0 ? "form__input--incomplete" : "";
  const validYearClass = yearStudy.length === 0 ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form" onSubmit={onSaveUserClicked}>
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className={`form__input ${validEmailClass}`}
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="form__label" htmlFor="cardNumber">
          Card Number:
        </label>
        <input
          className={`form__input ${validCardClass}`}
          id="cardNumber"
          name="cardNumber"
          type="text"
          value={cardNumber}
          onChange={onCardNumberChanged}
        />

        <label className="form__label" htmlFor="yearStudy">
          Year of Study:
        </label>
        <input
          className={`form__input ${validYearClass}`}
          id="yearStudy"
          name="yearStudy"
          type="text"
          value={yearStudy}
          onChange={onYearStudyChanged}
        />

        <label className="form__label" htmlFor="roles">
          ASSIGNED ROLES:
        </label>
        <select
          id="roles"
          name="roles"
          className={`form__select ${validRolesClass}`}
          multiple={true}
          size="4"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        <label className="form__label" htmlFor="active">
          Active:
        </label>
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        />
      </form>
    </>
  );

  return content;
};
export default NewUserForm;
