import React from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import threeDotsVertical from "../../../img/three-dots-vertical.svg";
import bookHalf from "../../../img/book-half.svg";
import fileEarmarkFill from "../../../img/file-earmark-fill.svg";
import boxArrowRight from "../../../img/box-arrow-right.svg";

const Dropdown = () => {
  /* Когда пользователь нажимает на кнопку,
переключение между скрытием и отображением раскрывающегося содержимого */
  function getOrHideDropdown() {
    const dropdownContent = document.getElementById("dropdown-content");
    if (dropdownContent.style.display === "block")
      dropdownContent.style.display = "none";
    else dropdownContent.style.display = "block";
    positionDropDown();
  }

  /* Закройте выпадающее меню, если пользователь щелкает за его пределами */
  window.onclick = function (event) {
    if (window.location.pathname !== "/auth")
      if (
        event.target.tagName === "A" ||
        event.target.parentNode.tagName === "A" ||
        event.target.id === "threeDotsVertical"
      )
        return;
      else document.getElementById("dropdown-content").style.display = "none";
  };

  function positionDropDown() {
    const rightEdgeTitle = document
      .getElementById("title")
      .getBoundingClientRect().right;
    const bottomEdgeTitle = document
      .getElementById("title")
      .getBoundingClientRect().bottom;
    const dropdownContentWidth = document
      .getElementById("dropdown-content")
      .getBoundingClientRect().width;
    document.getElementById("dropdown-content").style.top =
      bottomEdgeTitle + "px";
    document.getElementById("dropdown-content").style.left =
      rightEdgeTitle - dropdownContentWidth + "px";
  }

  return (
    <div id="dropdown">
      <img
        src={threeDotsVertical}
        alt="threeDotsVertical"
        onClick={getOrHideDropdown}
        id="threeDotsVertical"
      />
      <div id="dropdown-content">
        <Link to={"/main"}>
          <img src={bookHalf} alt="bookHalf" />
          <span>Главная страница</span>
        </Link>
        <Link to={"/main"}>
          <img src={fileEarmarkFill} alt="fileEarmarkFill" />
          <span>Обучающие материалы</span>
        </Link>
        <div id="line"></div>
        <Link to={"/auth"}>
          <img src={boxArrowRight} alt="boxArrowRight" />
          <span>Выход</span>
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
