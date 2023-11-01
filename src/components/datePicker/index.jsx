import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../hooks/userContext";
import { Container } from "./styles";


const DatePickers = (parameters) => {
    const { setSelectedEndDate, setSelectedInitialDate, setTypeFilter, typeFilter } = useUser()
    const [selectedDate, setSelectedDate] = React.useState(null);


    const handleDate = (date) => {
        setSelectedDate(date)
        console.log(date)
        console.log(parameters)
        parameters.text === 'Data inicial' ? setSelectedInitialDate(date) : setSelectedEndDate(date)

        console.log(typeFilter)

        if (parameters.text === 'Data inicial') {
            let data = typeFilter?.filter(res => res.key === parameters.text)

            data.length < 1 && typeFilter?.length <= 2 ?
                setTypeFilter([...typeFilter, { "key": "data inicial", "value": date }]) :
                alert("Erro ao aplicar o filtro dinâmico")
        }

        // if (parameters.text !== 'Data inicial') {
        //     let data = typeFilter?.filter(res => res.key === parameters.text)

        //     data.length < 1 && typeFilter?.length <= 2 ?
        //         setTypeFilter([...typeFilter, { "key": "data final", "value": date }]) :
        //         alert("Erro ao aplicar o filtro dinâmico")

        // }
        // parameters.text === 'Data inicial' ? setTypeFilter([...typeFilter, { "key": "data inicial", "value": date }]) : setTypeFilter([...typeFilter, { "key": "data final", "value": date }])
    }

    return (
        <Container>

            <DatePicker
                selected={selectedDate}
                classname='form-field'
                id="date"
                dateFormat="dd/MM/yyyy"
                placeholderText={parameters.text}
                onChange={(date) => handleDate(date)} />

        </Container>
    );
};

export default DatePickers