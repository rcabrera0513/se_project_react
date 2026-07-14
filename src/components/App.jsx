import { useState } from 'react';

import './App.css'
import Header from './Header/Header';
import Main from "../components/Main/Main";
import ModalWithForm from './ModalWithForm/ModalWithForm';
import ItemModal from './ItemModal/ItemModal';

function App() {
  const [weatherData, setWeatherData] = useState({ type: "hot" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment"); 
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />
        <Main weatherData={weatherData} onCardClick={handleCardClick} />
      </div>
      <ModalWithForm 
        title="New garment" 
        buttonText="Add garment" 
        activeModal={activeModal}
        onClose={handleCloseModal}>
        <label htmlFor="name" className="modal__label">
                Name{" "}
                <input 
                    type="text" 
                    className="modal__input" 
                    id="name" 
                    placeholder="Name"/>
            </label>
            <label htmlFor="imageURL" className="modal__label">
                Image{" "}
                <input 
                    type="url" 
                    className="modal__input" 
                    id="imageURL" 
                    placeholder="Image URL"/>
            </label>
            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">Select the weather type:</legend>
                <label 
                   htmlFor="hot" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="hot"
                        type="radio" 
                        className="modal__radio_-input" /><span>Hot</span>
                   </label>
                   <label 
                   htmlFor="warm" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="warm"
                        type="radio" 
                        className="modal__radio_-input" /><span>Warm</span> 
                   </label><label 
                   htmlFor="cold" 
                   className="modal__label modal__label_type_radio">
                    <input 
                        id="cold"
                        type="radio" 
                        className="modal__radio_-input" /><span>Cold</span> 
                   </label>
            </fieldset>
        </ModalWithForm>
        <ItemModal activeModal={activeModal} card={selectedCard} onClose={handleCloseModal} />
    </div>
    );
}

export default App
