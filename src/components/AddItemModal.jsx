import { useForm} from '../../hooks/useForm';
import ModalWithForm from './ModalWithForm/ModalWithForm';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const defaultValues = ({
    name: "", 
    link: "", 
    weatherType: "", 
  });

  const { values, handleChange } = useForm(defaultValues);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    onCloseModal();
  }
  
  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={isOpen ? "add-garment" : ""}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
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
                <label 
                   htmlFor="hot" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="hot"
                        type="radio" 
                        className="modal__radio_-input"
                        name="weatherType"
                        value="hot"
                        onChange={handleChange}
                     /><span>Hot</span>
                   </label>
                   <label 
                   htmlFor="warm" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="warm"
                        type="radio" 
                        className="modal__radio_-input"
                        name="weatherType"
                        value="warm"
                        onChange={handleChange} /><span>Warm</span> 
                   </label><label 
                   htmlFor="cold" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="cold"
                        type="radio" 
                        className="modal__radio_-input"
                        name="weatherType"
                        value="cold"
                        onChange={handleChange} /><span>Cold</span> 
                   </label>
            </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;