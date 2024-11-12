import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import businessRules from '../../app/utils/Rules/options.jsx';
import URI from '../../app/utils/utils.jsx';
import { Select, SureModal } from '../../components/source.jsx';
import { useUser } from '../../hooks/userContext.jsx';
import { Input, OptionsGroup } from './styles.jsx';
// import { SureModal } from '../source.jsx';

export function CustomFieldTable(props) {
    const { row, index } = props;
    const { changeField, setBody } = useUser()


    const { types } = businessRules

    // 

    const updateField = async (value) => {
        const body = {
            id: row.id,
            field: value.field,
            value: value.field === "label" ? value.value : types[value.value] === undefined ? value.value : types[value.value]
        }
        setBody(body)

        changeField()
    }
    const fnArray = [
        updateField
    ]

    const arr = [
        { name: "Texto" },
        { name: "Número" },
        { name: "Data" },
        { name: "Seleção única" },
        { name: "Multi-Select" }
    ]

    const [optionsDelete, setOptionsDelete] = useState({
        id: "",
        data: ""
    })

    const queryClient = useQueryClient()

    const sendData = async () => {
        const response = await toast.promise(
            URI.put("http://localhost:7070/campos-personalizados", { updateOptionType: optionsDelete }),
            {
                pending: 'Conferindo os dados',
                success: 'Deletado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
        return response.data
    }


    const createCustomFIeld = useMutation({
        mutationFn: () => sendData(),
        onSuccess: () => {
            queryClient.invalidateQueries(["custom"])
        }
    })


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <Input
                        type="number"
                        defaultValue={index + 1}
                        style={{ width: "2rem" }}
                        onBlur={(e) => {
                            e.target.value !== row.order &&
                                updateField({ field: "order", value: e.target.value })
                        }
                        }

                    />

                </TableCell>
                <TableCell component="th" scope="row">
                    <Input
                        type="text"
                        defaultValue={row?.label}
                        onBlur={(e) => {
                            e.target.value !== row.label && e.target.value !== "" &&
                                updateField({ field: "label", value: e.target.value })
                        }
                        }

                    />
                </TableCell>
                <TableCell align="center">

                    <Select
                        label={row.type}
                        option={arr}
                        width="10rem"
                        field="type"
                        fn={fnArray}
                    />

                </TableCell>
                <TableCell align="center">
                    <Select
                        label={row.required}
                        option={[
                            { name: "Sim" },
                            { name: "Não" },
                        ]}
                        field="required"
                        width="6rem"
                        fn={fnArray}
                    />


                </TableCell>
                <TableCell align="center">
                    <OptionsGroup
                    >

                        {
                            row?.options &&
                            row?.options.map((res, index) => (
                                <span
                                    className='options-group'
                                    key={index}
                                    onClick={() => {

                                        setOptionsDelete({ id: row.id, data: row?.options.filter(r => r !== res) })
                                        createCustomFIeld.mutateAsync()
                                    }}
                                >
                                    <p >{res}</p>
                                </span>
                            ))
                        }
                    </OptionsGroup>
                </TableCell>
                <TableCell align="center">
                    <SureModal
                        data={row?.id}
                        name={row?.label}
                        url="/campos-personalizados" />

                </TableCell >

            </TableRow>

        </React.Fragment>
    );
}

CustomFieldTable.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        order: PropTypes.number.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        options: PropTypes.array.isRequired,

    }).isRequired,
    index: PropTypes.number


};



