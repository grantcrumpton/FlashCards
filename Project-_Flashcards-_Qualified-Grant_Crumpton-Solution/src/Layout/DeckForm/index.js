import React from "react";

/**
 * @DeckForm component is accessed by both @CreateDeck and @EditDeck
 * components. Props are inherited from either to fill form with correct placeholders, values, button names and button handlers. 
 *
 * 
 */

function Form({
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
        <label htmlFor="name" className="form-label">
          {inputName}
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          placeholder={nameDesc}
          value={formName}
          onChange={formNameChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="textdescription" className="form-label">
          {textAreaName}
        </label>
        <textarea
          className="form-control mb-1"
          name="description"
          id="textdescription"
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
export default Form;