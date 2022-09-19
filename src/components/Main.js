import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import api from "../utils/api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const currentUser = useContext(CurrentUserContext);

  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInitialCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img className="profile__avatar-image" src={currentUser.avatar} alt="Аватар" />
          <button
            onClick={onEditAvatar}
            className="profile__edit-avatar"
            type="button"
            aria-label="Редактировать аватар"
          ></button>
        </div>

        <div className="profile__info">
          <div className="profile__content">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            ></button>
          </div>
          <p className="profile__about">{currentUser.about}</p>
        </div>

        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить фото"
        ></button>
      </section>

      <section className="cards">
        <ul className="cards__grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
