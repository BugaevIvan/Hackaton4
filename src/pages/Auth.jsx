import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Auth.scss";
import MyService from "../api/MyService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  async function checkField(e) {
    e.preventDefault();
    const response = await MyService.CheckProfile({ username, pass });
    response
      ? navigate("/main")
      : (document.getElementById("error").style.display = "flex");
  }

  useEffect(() => {
    if (username !== "" && pass !== "")
      document.getElementById("login").removeAttribute("disabled");
    else document.getElementById("login").setAttribute("disabled", true);
  }, [username, pass]);

  return (
    <div id="center-auth">
      <div id="title">Авторизация</div>
      <div id="line"></div>
      <div id="form-block">
        <form>
          <div className="blocks-input">
            <form>
              <div className="input-block">
                <label htmlFor="username">Имя пользователя:</label>
                <input
                  type="text"
                  autoComplete="off"
                  maxLength="256"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  required
                />
              </div>
              <div className="input-block">
                <label htmlFor="pass">Пароль:</label>
                <input
                  type="password"
                  autoComplete="off"
                  maxLength="256"
                  name="pass"
                  onChange={(e) => setPass(e.target.value)}
                  id="pass"
                  required
                />
              </div>
              <div className="div-btn">
                <button type="submit" id="login" onClick={checkField}>
                  Далее
                </button>
              </div>
            </form>
          </div>
        </form>
      </div>
      <div id="error">Имя пользователя или пароль неверны!</div>
    </div>
  );
};

export default Auth;
