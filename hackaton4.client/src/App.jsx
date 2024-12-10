import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AddChange from "./pages/AddChange";
import Main from "./pages/Main";
import Auth from "./pages/Auth";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="addcChange" element={<AddChange />} />
                {/*<Route path="addChange/:addChangeid" element={<AddChange />} />*/}
                <Route path="/addChange/accommodation" element={<AddChange />} />
                <Route path="/addChange/ticket" element={<AddChange />} />
                <Route path="/addChange/menu" element={<AddChange />} />
                <Route path="/addChange/shift" element={<AddChange />} />
                <Route path="/addChange/medical" element={<AddChange />} />
                <Route path="/addChange/survey" element={<AddChange />} />
                <Route path="/addChange/freetime" element={<AddChange />} />
                <Route path="/addChange/report" element={<AddChange />} />

                <Route path="main" element={<Main />} />
                <Route path="/main/accommodation" element={<Main />} />
                <Route path="/main/ticket" element={<Main />} />
                <Route path="/main/menu" element={<Main />} />
                <Route path="/main/shift" element={<Main />} />
                <Route path="/main/medical" element={<Main />} />
                <Route path="/main/survey" element={<Main />} />
                <Route path="/main/freetime" element={<Main />} />
                <Route path="/main/report" element={<Main />} />
                <Route path="*" element={<Navigate to="/main" replace />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;
