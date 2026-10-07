import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import { coordinates, apiKey, defaultClothingItems } from "../utils/constants";
import Header from "./Header/Header";
import Main from "../components/Main/Main";
import Footer from "./Footer/Footer";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal/ItemModal";
import Profile from "./Profile/Profile";
import { getWeather, filterWeatherData } from "../utils/weatherApi";
import { getItems, addItem, removeItem } from "../utils/api";
import CurrentTemperatureUnitContext from "../contexts/currentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "cold",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const filteredItems = weatherData.type
    ? clothingItems.filter((item) => item.weather === weatherData.type)
    : clothingItems;

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const onAddItem = (inputValues) => {
    const newItem = {
      name: inputValues.name,
      imageUrl: inputValues.link,
      weather: inputValues.weatherType,
      createdAt: new Date().toISOString(),
    };

    return addItem(newItem).then((addedItem) => {
      setClothingItems((currentItems) => [addedItem, ...currentItems]);
      return addedItem;
    });
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const deleteItemHandler = (itemId) => {
    removeItem(itemId)
      .then(() => {
        setClothingItems((currentItems) =>
          currentItems.filter((item) => item._id !== itemId),
        );
        handleCloseModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, apiKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData((currentWeatherData) => ({
          ...currentWeatherData,
          ...filteredData,
        }));
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const sorted = [...data].sort((a, b) => {
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });

        setClothingItems(sorted);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} weatherData={weatherData} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={filteredItems}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
              }
            />
            <Route
              path="/main"
              element={
                <>
                  <p>Profile</p>
                  <Main
                    weatherData={weatherData}
                    clothingItems={filteredItems}
                    onCardClick={handleCardClick}
                  />
                </>
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onCloseModal={handleCloseModal}
          onAddItem={onAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={handleCloseModal}
          onDeleteItem={deleteItemHandler}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
