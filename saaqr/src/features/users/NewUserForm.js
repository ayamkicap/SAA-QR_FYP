import { useState, useEffect } from "react";
import { useAddNewUserMutation } from "./usersApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const USER_REGEX = /^[A-z]{3,20}$/;
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
const CARD_NUMBER_REGEX = /^[0-9]{6,10}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const YEAR_STUDY_REGEX = /^[0-9]{1,2}$/;

const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [validCardNumber, setValidCardNumber] = useState(false);
  const [roles, setRoles] = useState(["Student"]);
  const [yearStudy, setYearStudy] = useState("");
  const [validYearStudy, setValidYearStudy] = useState(false);
  const [active, setActive] = useState(true);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidCardNumber(CARD_NUMBER_REGEX.test(cardNumber));
  }, [cardNumber]);

  useEffect(() => {
    setValidYearStudy(YEAR_STUDY_REGEX.test(yearStudy));
  }, [yearStudy]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setEmail("");
      setCardNumber("");
      setRoles(["Student"]);
      setYearStudy("");
      setActive(true);
      navigate("/dash/users");
    }
  }, [isSuccess, navigate]);

  const onUsernameChanged = (e) => setUsername(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onEmailChanged = (e) => setEmail(e.target.value);
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
      validPassword,
      validEmail,
      validCardNumber,
      roles.length > 0,
      validYearStudy,
    ].every(Boolean) && !isLoading;

  const onSaveUserClicked = async (e) => {
    console.log("Save button clicked");
    e.preventDefault();
    console.log("Saving user with the following data:");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Email:", email);
    console.log("Card Number:", cardNumber);
    console.log("Roles:", roles);
    console.log("Year of Study:", yearStudy);
    console.log("Active:", active);
    if (canSave) {
      await addNewUser({
        username,
        password,
        email,
        card_number: cardNumber,
        roles,
        year_study: yearStudy,
        active,
      });
    } else {
      console.log("Cannot save the user. Please fill in all required fields.");
      // You can also provide visual feedback to the user here, like displaying an error message.
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {" "}
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validUserClass = !validUsername ? "form__input--incomplete" : "";
  const validPwdClass = !validPassword ? "form__input--incomplete" : "";
  const validEmailClass = !validEmail ? "form__input--incomplete" : "";
  const validCardNumberClass = !validCardNumber
    ? "form__input--incomplete"
    : "";
  const validRolesClass = roles.length === 0 ? "form__input--incomplete" : "";
  const validYearStudyClass = !validYearStudy ? "form__input--incomplete" : "";

  const content = (
    <>
      <p className={errClass}>{error?.data?.message}</p>

      <form className="form">
        <div className="form__title-row">
          <h2>New User</h2>
          <div className="form__action-buttons">
          <button
          className="icon-button1"
          title="Save"
          type="submit"
          onClick={onSaveUserClicked} // Add this line
        >
          <FontAwesomeIcon icon={faSave} />
        </button>
          </div>
        </div>
        <label className="form__label" htmlFor="username">
          Name: <span className="nowrap">[3-20 letters]</span>
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

        <label className="form__label" htmlFor="email">
          Email:
        </label>
        <input
          className={`form__input ${validEmailClass}`}
          id="email"
          name="email"
          type="email"
          autoComplete="off"
          value={email}
          onChange={onEmailChanged}
        />

        <label className="form__label" htmlFor="cardNumber">
          Card Number:
        </label>
        <input
          className={`form__input ${validCardNumberClass}`}
          id="cardNumber"
          name="cardNumber"
          type="text"
          autoComplete="off"
          value={cardNumber}
          onChange={onCardNumberChanged}
        />

        <label className="form__label" htmlFor="cardNumber">
          Year Study:
        </label>
        <input
          className={`form__input ${validYearStudyClass}`}
          id="yearStudy"
          name="cardNumber"
          type="text"
          autoComplete="off"
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
          size="3"
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>
      </form>
    </>
  );

  return content;
};
export default NewUserForm;
