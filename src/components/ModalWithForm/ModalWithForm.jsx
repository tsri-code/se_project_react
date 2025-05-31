import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal">
      <div className="modal__container">
        <h2 className="modal__title">New Garment</h2>
        <button type="button" className="modal__close-button">
          CLOSE
        </button>
        <form className="modal__form">
          <div className="modal__input-container">
            <label className="modal__label">
              Name
              <input
                type="text"
                className="modal__input"
                placeholder="Name"
                id="name"
              />
            </label>
            <label htmlFor="imageURL" className="modal__label">
              Image
              <input
                type="text"
                className="modal__input"
                placeholder="Image URL"
                id="imageURL"
              />
            </label>
            <fieldset className="modal__radio-fieldset">
              <legend className="modal__legend">
                Select the weather type:
              </legend>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weatherType"
                  value="hot"
                  className="modal__radio"
                  id="hot"
                />
                Hot
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weatherType"
                  value="warm"
                  className="modal__radio"
                  id="warm"
                />
                Warm
              </label>
              <label className="modal__radio-label">
                <input
                  type="radio"
                  name="weatherType"
                  value="cold"
                  className="modal__radio"
                  id="cold"
                />
                Cold
              </label>
            </fieldset>
          </div>
          <button type="submit" className="modal__button">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
