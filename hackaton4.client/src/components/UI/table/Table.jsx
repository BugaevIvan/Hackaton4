import React, { useEffect, useRef, memo } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Table.module.css";
import MyService from "../../../api/MyService";
import dataJson from "../../../snippet/table.json";
import { useMemo } from "react";

const Table = memo(
    ({
        sortedData,
        setSortedData,
        selectedRow,
        setSelectedRow,
        addTriangleRef,
        pathname
    }) => {
        const navigate = useNavigate();
        //useEffect(() => {
        //    console.log()
        //}, [pathname])
        // Id и заголовок для колонок
        const idToTitle = dataJson[pathname][0]

        /**
         * Добавление стрелки в колонку
         * @param event Колонка, по которой будет происходить сортировка
         * @param order Порядок сортировки
         * @param typeOrder Стрелка
         */
        const addTriangle = (event = null, order = null, typeOrder = null) => {
            const trThs = document.querySelectorAll(
                "#data-container table thead tr th"
            );
            trThs.forEach((th) => th.setAttribute("data-order", "standard"));
            trThs.forEach((th) => {
                if (["▲", "▼"].some((symbol) => th.innerText.includes(symbol)))
                    th.innerText = th.innerText.replace(/▲|▼/g, "");
            });
            if (order !== null) {
                event.target.setAttribute("data-order", order);
                event.target.innerText += typeOrder;
            }
        };
        const addTriangleRefToMain = useRef(addTriangle); // Cсылка для Main, чтобы таблица не перезагружалась при вводе в инпуты

        // Изменение порядка отображения по определенной колонке
        function changesOrder(event) {
            const type_order = Array.from(event.target.attributes).find(
                (x) => x.name === "data-order"
            );
            if (type_order.value === "standard" || type_order.value === "desc") {
                addTriangle(event, "asc", "▼");
                setSortedData(
                    [...sortedData].sort((a, b) =>
                        a[event.target.id].localeCompare(b[event.target.id])
                    )
                );
            } else {
                addTriangle(event, "desc", "▲");
                setSortedData(
                    [...sortedData].sort((a, b) =>
                        b[event.target.id].localeCompare(a[event.target.id])
                    )
                );
            }
        }
        // Клик по строке
        function selectRow(event) {
            if (!selectedRow) {
                event.target.parentNode.style.backgroundColor = "#ccc";
                setSelectedRow(event.target.parentNode.id);
            } else if (selectedRow === event.target.parentNode.id) {
                document.querySelector(
                    `#data-container table tbody tr[id='${selectedRow}']`
                ).style.backgroundColor = "#fff";
                setSelectedRow(null);
            } else if (selectedRow) {
                if (sortedData.includes((pass) => pass["passId"] === selectedRow))
                    document.querySelector(
                        `#data-container table tbody tr[id='${selectedRow}']`
                    ).style.backgroundColor = "#fff";
                setSelectedRow(event.target.parentNode.id);
            }
        }

        useEffect(() => {
            addTriangleRef.current = addTriangleRefToMain.current;
        }, []);

        async function fetchPass(passId) {
            try {
                const response = await MyService.GetPass(passId);
                return response;
            } catch (error) {
                console.error(error);
            }
        }
        let clickTimeout = null;
        const handleClick = (event) => {
            if (clickTimeout !== null) {
                clearTimeout(clickTimeout);
                clickTimeout = null;
                handleDoubleClick(event);
            } else {
                clickTimeout = setTimeout(() => {
                    clickTimeout = null;
                    selectRow(event);
                }, 140); // 50ms delay
            }
        };
        const handleDoubleClick = async (event) => {
            event.target.parentNode.style.backgroundColor = "#ccc";
            const response = await fetchPass(event.target.parentNode.id);
            navigate(`/pass/${event.target.parentNode.id}`, {
                state: { response: response },
            });
        };
        // Рендер таблицы
        return (
            <table className={classes.Table}>
                <thead>
                    <tr>
                        {Object.keys(idToTitle).map((key) =>
                            <th data-order="standard" key={key} id={key} onClick={changesOrder}>
                                {idToTitle[key]}
                            </th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((element, index) => (
                        <tr
                            key={index}
                            id={element["id"]}
                            onClick={handleClick}

                        >
                            {Object.keys(idToTitle).map((key) => (
                                <td key={key}>{element[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
);

export default Table;
