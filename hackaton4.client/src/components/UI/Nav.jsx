import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/Nav.scss";

const Nav = () => {
    return (
        <div className="nav-bar">
            <div className="page-title"><Link to="/main/accommodation">Проживание</Link></div>
            <div className="page-title"><Link to="/main/ticket">Билеты</Link></div>
            <div className="page-title"><Link to="/main/menu">Питание</Link></div>
            <div className="page-title"><Link to="/main/shift">Смены</Link></div>
            <div className="page-title"><Link to="/main/medical">Больничный</Link></div>
            <div className="page-title"><Link to="/main/survey">Опросы</Link></div>
            <div className="page-title"><Link to="/main/freetime">Досуг</Link></div>
            <div className="page-title"><Link to="/main/report">Отчетность</Link></div>
        </div>
    );
};

export default Nav;
