import './ConfirmActions.scss';

import React from 'react';
import Popup from "reactjs-popup";

const ConfirmActions = ({showPopup, setshowPopup, popupText, option }) => {

    return (
        <Popup
            open={showPopup}
            modal
            nested
            className="confirm-popup"
            
            contentStyle={{
                borderRadius: "15px",
                padding: "20px",
                backgroundColor: 'white',
                border: "none",
                fontWeight: "bold",
                minWidth: "330px",
                maxWidth: "400px",
                boxShadow: "0px 0px 15px 0px rgba(0,0,0,0.2)",
            }}

            closeOnDocumentClick={false}
        >
            {(close) => (
                <div className="confirm-popup-content">
                    <div className="confirm-popup-header">
                        <h2>Tem certeza?</h2>
                    </div>
                    <div className="confirm-popup-body">
                        <p>{popupText}</p>
                    </div>
                    <div className="button-container">
                        <button className="button" onClick={() => {option(true);setshowPopup(false);}}>Confirmar</button>
                        <button className="button" onClick={() => {option(false);setshowPopup(false);}}>Cancelar</button>
                    </div>
                </div>
            )}
        </Popup>
    );
}

export default ConfirmActions;