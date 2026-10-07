import { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "./ModalWithForm/ModalWithForm";

const defaultValues = {
  name: "",
  link: "",
  weatherType: "",
};

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, setValues, handleChange } = useForm(defaultValues);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setValues(defaultValues);
      setError("");
    }
  }, [isOpen, setValues]);

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      await onAddItem(values);
      onCloseModal();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : String(submitError),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={isOpen ? "add-garment" : ""}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      {error && (
        <p className="modal__error" role="alert">
          Could not add garment: {error}
        </p>
      )}
      <label htmlFor="name" className="modal__label">
        Name{""}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageURL" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageURL"
          name="link"
          placeholder="Image URL"
          value={values.link}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio_-input"
            name="weatherType"
            value="hot"
            checked={values.weatherType === "hot"}
            onChange={handleChange}
          />
          <span>Hot</span>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio_-input"
            name="weatherType"
            value="warm"
            checked={values.weatherType === "warm"}
            onChange={handleChange}
          />
          <span>Warm</span>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio_-input"
            name="weatherType"
            value="cold"
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />
          <span>Cold</span>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
