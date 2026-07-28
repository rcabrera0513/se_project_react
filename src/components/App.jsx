import { useEffect, useState } from 'react';

import './App.css'
import { coordinates, APIkey } from '../utils/constants';
import Header from './Header/Header';
import Main from "../components/Main/Main";
import Footer from './Footer/Footer';
import ModalWithForm from './ModalWithForm/ModalWithForm';
import ItemModal from './ItemModal/ItemModal';
import { getWeather, filterWeatherData } from '../utils/weatherApi';

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "hot",
    temp: { F: 999 },
    city: "",
  });
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

  useEffect(() => {
    getWeather(coordinates, APIkey)
    .then((data) => {
      const filteredData = filterWeatherData(data);
      setWeatherData((currentWeatherData) => ({
        ...currentWeatherData,
        ...filteredData,
      }));
    })
    .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} onCardClick={handleCardClick} />
        <Footer />
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
