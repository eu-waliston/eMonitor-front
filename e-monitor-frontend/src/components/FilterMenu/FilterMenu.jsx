import React, { useState } from "react";
import Popup from "reactjs-popup";

// Icons
import { FaFilter } from "react-icons/fa";
import { set } from "react-hook-form";

const FilterMenu = ({ updateFilters }) => {

    const areas = {
        "Matemática": "Matematica",
        "Artes": "Artes",
        "Português": "Portugues",
        "Inglês": "Ingles",
        "Biologia": "Biologia",
        "História": "Historia",
        "Ed.Física": "Ed.Fisica",
        "Física": "Fisica",
        "Filosofia": "Filosofia",
        "Sociologia": "Sociologia",
        "Química": "Quimica",
        "Geografia": "Geografia",
        "Outros": "Outros"
    };

    const [filters, setFilters] = useState([]);
    const checkBoxRefs = {};

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            const intValue = parseInt(value);
            setFilters([...filters, intValue]);
        } else {
            setFilters(filters.filter((filter) => filter !== value));
        }
    };

    const handleApplyFilters = (close) => {
        updateFilters(filters);
        setFilters([]);
        close();
    };

    const handleClearFilters = () => {
        setFilters([]);
    
        // Percorra as caixas de seleção e defina o atributo checked como false
        const checkboxes = document.querySelectorAll('.area input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };
    

    return (
        <Popup
            trigger={
                <button className="filter--btn" >
                    <FaFilter className="reload-icon" />
                </button>
            }

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

            modal >
            {(close) => (
                <div>
                    <div className="filter-list">
                        <h3>Selecione quais áreas deseja filtrar:</h3>
                        {
                            Object.keys(areas).map((area, index) => (
                                <label className="area" key={index}>
                                    <input
                                        className="area"
                                        type="checkbox"
                                        value={area}
                                        onChange={handleFilterChange}
                                    />
                                    {area}
                                </label>
                            ))
                        }
                    </div>
                    <div className="button-container">
                        <button className="button" onClick={() => handleApplyFilters(close)}>Aplicar</button>
                        <button className="button" onClick={close}>Cancelar</button>
                        <button className="button" onClick={() => handleClearFilters(close)}>Limpar Filtros</button>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default FilterMenu;