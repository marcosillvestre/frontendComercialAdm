import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../hooks/userContext";
import { Container } from "./styles";


export const DatePickers = (parameters) => {
    const { setSelectedEndDate, setSelectedInitialDate,
        //  setTypeFilter, typeFilter
    } = useUser()
    const [selectedDate, setSelectedDate] = React.useState(null);


    const handleDate = (date) => {
        setSelectedDate(date)
        parameters.text === 'Data inicial' ? setSelectedInitialDate(date) : setSelectedEndDate(date)
    }

    return (
        <Container>

            <DatePicker
                selected={selectedDate}
                classname='form-field'
                id="date"
                dateFormat="dd/MM/yyyy"
                placeholderText={parameters.text}
                onChange={(date) => handleDate(date)}
                autoComplete="off"
            />

        </Container>
    );
};
