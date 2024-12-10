import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../components/UI/dropdown/Dropdown";
import SelectPass from "../components/UI/select/SelectPass";
import InputPass from "../components/UI/inputDate/InputPass";
import fieldConfig from "../snippet/data.json";
import MyService from "../api/MyService";
import "../css/Pass.scss";
import rusal from "../img/rusal.png";

const Pass = () => {
  const location = useLocation();
  const [pass, setPass] = useState(location.state?.response);
  const [isEditMode, setIsEditMode] = useState(
    pass === undefined ? true : false
  );
  const [isPassAdded, setIsPassAdded] = useState(pass !== undefined);

  // Добавление нового пропуска
  async function PostPass(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("FormId"));
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await MyService.PostPass(data);
      setPass(response);
      setIsPassAdded(true);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  // Сохранение изменений пропуска
  async function UpdatePass(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById("FormId"));
    const data = Object.fromEntries(formData.entries());
    try {
      const response = await MyService.UpdatePass({
        ...data,
        id: pass["id"],
        passId: pass["passId"],
        dateApply: pass["dateApply"],
        number: pass["number"],
      });
      setPass(response);
      setIsEditMode(false);
    } catch (error) {
      console.error(error);
    }
  }

  function drawColumn(num_col) {
    const fromData = num_col === 1 ? "first_column" : "second_column";
    return fieldConfig[fromData].map((field) =>
      field.tag === "select" ? (
        <SelectPass
          key={field.name}
          name={field.name}
          title={field.title}
          options={field.options}
          isEditMode={isEditMode}
          pass={pass}
        />
      ) : (
        <InputPass
          key={field.name}
          type={field.type}
          name={field.name}
          title={field.title}
          isEditMode={isEditMode}
          pass={pass}
        />
      )
    );
  }

  return (
    <div id="center-pass">
      <div id="title">
        <div id="left-title">
          <img src={rusal} alt="rusal" width="45" height="50" />
          <div id="title-content">
            <Link to={"/main"}>Эл. Проходная</Link>
          </div>
          <div id="sign">&#62;</div>
          <div id="current-page">Пропуск</div>
        </div>
        <Dropdown />
      </div>
      <div id="forma">
        <form id="FormId">
          {/* Отрисовка пропуска */}
          <div id="columns">
            <div className="column">{drawColumn(1)}</div>
            <div className="column">{drawColumn(2)}</div>
          </div>
          <div id="for_input">
            {isPassAdded === false ? (
              <button type="button" id="add_pass" onClick={PostPass}>
                ДОБАВИТЬ
              </button>
            ) : isEditMode === false ? (
              <>
                <button
                  type="button"
                  id="edit_pass"
                  onClick={() => setIsEditMode(true)}
                >
                  РЕДАКТИРОВАТЬ
                </button>
                <button type="button" id="print_pass">
                  ОТПРАВИТЬ НА ПЕЧАТЬ
                </button>
              </>
            ) : (
              <>
                <button type="button" id="save_pass" onClick={UpdatePass}>
                  СОХРАНИТЬ
                </button>
                <button
                  type="button"
                  id="cancel_pass"
                  onClick={() => setIsEditMode(false)}
                >
                  ОТМЕНИТЬ
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pass;
