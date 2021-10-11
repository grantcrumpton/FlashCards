import React from "react";

/**
 * Takes necessary props from @AddCard and @EditCard components in order to create the appropriate form as needed. 
 * 
 */

function CardForm({
  formName,
  formNameChange,
  formText,
  formTextChange,
  handleCancel,
  nameDesc,
  textDesc,
  handleSubmit,
  inputName,
  textAreaName,
  buttonName,
  submitButtonName,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="frontofcardtext" className="form-label">
          {inputName}
        </label>
        <textarea
          type="text"
          name="front"
          className="form-control"
          id="frontofcardtext"
          placeholder={nameDesc}
          value={formName}
          onChange={formNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="backofcardtext" className="form-label">
          {textAreaName}
        </label>
        <textarea
          className="form-control mb-1"
          name="back"
          id="backofcardtext"
          rows="3"
          placeholder={textDesc}
          onChange={formTextChange}
          value={formText}
        />
        <button
          type="button"
          className="btn btn-secondary mr-1"
          onClick={handleCancel}
        >
          {buttonName}
        </button>
        <button type="submit" className="btn btn-primary">
          {submitButtonName}
        </button>
      </div>
    </form>
  );
}
export default CardForm;