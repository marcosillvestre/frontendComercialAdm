import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import PropTypes from 'prop-types';
import React from 'react';
import { toast } from 'react-toastify';
// import businessRules from '../../app/utils/Rules/options.jsx';
import URI from '../../../app/utils/utils.jsx';
import { Select, SureModal } from '../../source.jsx';
import { OptionsGroup } from './styles.jsx';

export function CustomFieldTable(props) {
    const { row, index } = props;


    // const { types } = businessRules


    const updateField = async (value) => {

        createCustomFIeld.mutateAsync({ id: row.id, category: value })
    }
    const fnArray = [
        updateField
    ]


    const categories = [
        { name: "StatusMatricula" },
        { name: "Observacoes" },
        { name: "Contrato" },
        { name: "Financeiro" },
        { name: "InformacoesAlunoEResponsavel" },
        { name: "Pedagogico" },
        { name: "Outros" },
    ]



    const queryClient = useQueryClient()

    const sendData = async (body) => {
        const response = await toast.promise(
            URI.put("/campos-personalizados", body),
            {
                pending: 'Conferindo os dados',
                success: 'Editado com sucesso',
                error: 'Alguma coisa deu errado'
            }
        )
        return response.data
    }


    const createCustomFIeld = useMutation({
        mutationFn: (e) => sendData(e),
        onSuccess: () => {
            queryClient.invalidateQueries(["custom"])
        }
    })


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell align="center">
                    {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                    {row?.name}
                </TableCell>
                <TableCell align="center">
                    {row.type}

                </TableCell>
                <TableCell align="center">
                    {row.required ? "Sim" : "Não"}

                </TableCell>
                <TableCell align="center">

                    <Select
                        label={row.category}
                        option={categories}
                        width="13rem"
                        field="type"
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
                        name={row?.name}
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
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        options: PropTypes.array.isRequired,

    }).isRequired,
    index: PropTypes.number


};



