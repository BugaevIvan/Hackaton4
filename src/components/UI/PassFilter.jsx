import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "./select/Select";
import InputDate from "./inputDate/InputDate";
import InputText from "./inputText/InputText";
import BlueButton from "./blueButton/BlueButton";
import GreenButton from "./greenButton/GreenButton";
import MyService from "../../api/MyService";

const PassFilter = ({
    filter,
    setFilter,
    selectedRow,
    updateBtnRef,
    searchBtnRef,
    openBtnRef,
}) => {
    const navigate = useNavigate();
    const statusSelectRef = useRef(null);
    const datefromRef = useRef(null);
    const datetoRef = useRef(null);
    const passIdRef = useRef(null);

    // Обновить таблицу, сбросить фильтры
    function updateFilters() {
        setFilter({ id: "", datefrom: "", dateto: "", status: "" });
        openBtnRef.current.style.display = "none";
        statusSelectRef.current.value = "";
        datefromRef.current.value = "";
        datetoRef.current.value = "";
        passIdRef.current.value = "";
    }

    // При повторном нажатии на серую строку
    useEffect(() => {
        if (!selectedRow) openBtnRef.current.style.display = "none";
        else openBtnRef.current.style.display = "block";
    }, [selectedRow]);

    async function fetchPass() {
        try {
            const response = await MyService.GetPass(selectedRow);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="options">
            <div id="left_options">
                <InputText
                    name="passId"
                    id="passId"
                    placeholder="Номер или код пропуска"
                    value={filter.passId || ""}
                    onChange={(e) => setFilter({ ...filter, passId: e.target.value })}
                    ref={passIdRef}
                />
                <BlueButton value="ПОИСК" id="search" ref={searchBtnRef} />
                <InputDate
                    name="datefrom"
                    id="datefrom"
                    title="от"
                    value={filter.datefrom}
                    onChange={(e) => setFilter({ ...filter, datefrom: e.target.value })}
                    ref={datefromRef}
                />
                <InputDate
                    name="dateto"
                    id="dateto"
                    title="до"
                    value={filter.dateto}
                    onChange={(e) => setFilter({ ...filter, dateto: e.target.value })}
                    ref={datetoRef}
                />
                <Select
                    ref={statusSelectRef}
                    onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                />
                <BlueButton
                    value="ОБНОВИТЬ"
                    id="update"
                    onClick={updateFilters}
                    ref={updateBtnRef}
                />
            </div>
            <div id="right_options">
                <GreenButton
                    value="ОТКРЫТЬ"
                    id="open_pass"
                    onClick={async () => {
                        const response = await fetchPass();
                        navigate(`/pass/${selectedRow}`, { state: { response } });
                    }}
                    ref={openBtnRef}
                />
                <BlueButton
                    value="ДОБАВИТЬ"
                    id="add_pass"
                    onClick={() => navigate(`/pass`)}
                />
            </div>
        </div>
    );
};

export default PassFilter;
