import React, { useState, useRef, useEffect } from "react";
import {  useLocation } from 'react-router-dom';
import logo from "../img/rusal.png";
import Table from "../components/UI/table/Table";
import PassFilter from "../components/UI/PassFilter";
import Nav from "../components/UI/Nav";
import "../css/Main.scss";
import MyService from "../api/MyService";
import Dropdown from "../components/UI/dropdown/Dropdown";

const Main = () => {
    const location = useLocation();
    const fullPathname = location?.pathname;
    const [pathname, setPathname] = useState(fullPathname.split('/main/')[1]);
    useEffect(() => {
        setPathname(location?.pathname.split('/main/')[1])
        fetchData();
    }, [location, pathname])
    console.log(pathname);
    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [filter, setFilter] = useState({
        passId: "",
        datefrom: "",
        dateto: "",
        status: "",
    });
    const updateBtnRef = useRef(null);
    const searchBtnRef = useRef(null);
    const openBtnRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);
    const addTriangleRef = useRef(null); // Cсылка из Table, чтобы таблица не перезагружалась при вводе в инпуты

    //// Загрузка страницы
    //useEffect(() => {
    //    fetchData();
    //}, []);
    // Получение данных с сервера
    async function fetchData() {
        const responseData = await MyService.Get(pathname);
        setData(responseData);
        setSortedData(responseData);
    }

    // Событие на кнопку ОБНОВИТЬ
    useEffect(() => {
        const updateBtn = updateBtnRef.current;
        const updatePassHandler = () => {
            setSortedData([...data]);
            setSelectedRow(null);
            addTriangleRef.current();
        };
        if (updateBtn) {
            updateBtn.addEventListener("click", updatePassHandler);
            return () => updateBtn.removeEventListener("click", updatePassHandler);
        }
    }, [updateBtnRef, data]);

    // Событие на кнопку поиска по фильтрам
    useEffect(() => {
        const searchBtn = searchBtnRef.current;
        if (searchBtn) {
            searchBtn.addEventListener("click", searchPass);
            return () => searchBtn.removeEventListener("click", searchPass);
        }
    }, [searchBtnRef, filter]);

    // Поиск элемента по фильтрам
    function searchPass() {
        setSortedData(
            [...data].filter((objTable) => {
                // Проверяем, что все ключи и значения из jsonInputsData совпадают с соответствующими ключами и значениями в объекте из data
                let allMatch = true;
                Object.keys(filter)
                    .filter((x) => filter[x] !== "")
                    .forEach((key) => {
                        if (key === "passId") {
                            if (
                                !objTable[key].includes(filter[key]) &&
                                !objTable["number"].includes(filter[key])
                            ) {
                                allMatch = false;
                                return; // Выход из forEach, если хотя бы одно не совпадает
                            }
                        } else if (!objTable[key].includes(filter[key])) {
                            allMatch = false;
                            return; // Выход из forEach, если хотя бы одно не совпадает
                        }
                    });
                return allMatch;
            })
        );
        addTriangleRef.current();
    }

    // Прячем кнопку если в отсортированно списке нет этого пропуска
    useEffect(() => {
        if (
            !sortedData.find(
                (searchElement) => searchElement["passId"] === selectedRow
            )
        )
            openBtnRef.current.style.display = "none";
    }, [sortedData, selectedRow]);

    return (
        <div>
            <Nav />
            <div id="center-main">
                <div id="title">
                    <div id="left-title">
                        <img src={logo} alt="rusal" width="45" height="50" />
                        <div id="title-content">КитСеверСтрой</div>
                    </div>
                    {/*<Dropdown />*/}
                </div>
                <PassFilter
                    filter={filter}
                    setFilter={setFilter}
                    selectedRow={selectedRow}
                    openBtnRef={openBtnRef}
                    updateBtnRef={updateBtnRef}
                    searchBtnRef={searchBtnRef}
                />
                <div id="data-container">
                    <Table
                        sortedData={sortedData}
                        setSortedData={setSortedData}
                        selectedRow={selectedRow}
                        setSelectedRow={setSelectedRow}
                        addTriangleRef={addTriangleRef}
                        pathname={pathname}
                    />
                </div>
            </div>
        </div >
    );
};

export default Main;
