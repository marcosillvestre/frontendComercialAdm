import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useOrders } from "../../../hooks/orders/ordersContext.hook";
import { Container } from "./styles";


export const DatePickerOrders = (parameters) => {
    const { setInitialDate, setEndDate, setFilteringInitialDate, setFilteringEndDate } = useOrders()
    const [selectedDate, setSelectedDate] = React.useState(null);


    const handleDate = (date) => {
        setSelectedDate(date)

        if (parameters.text === 'Data inicial') {
            setInitialDate(date)
            setEndDate(null)
            return
        }
        setEndDate(date)
    }


    const handleFilters = (date) => {
        setSelectedDate(date)

        if (parameters.text === 'Data inicial') {
            setFilteringInitialDate(date)
            setFilteringEndDate(null)
            return
        }
        setFilteringEndDate(date)
    }

    return (
        <Container>

            <DatePicker
                selected={selectedDate}
                classname='form-field'
                id="date"
                dateFormat="dd/MM/yyyy"
                placeholderText={parameters.text}
                onChange={(date) => parameters?.where === "moreFilters" ?
                    handleFilters(date) : handleDate(date)}
                autoComplete="off"
            />

        </Container>
    );
};
