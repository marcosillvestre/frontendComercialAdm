import React from "react";
import LoadingSpin from "react-loading-spin";
import { Container } from './styles';

const Sellers = (data) => {
    const [dataFiltered, setDataFiltered] = React.useState([])


    React.useEffect(() => {

        const filteringData = (fil1, fil2) => {
            if (fil1.value === 'Todas' && fil2.value === 'Todas') {
                setDataFiltered(data.data)
            }

            let arr = [fil1, fil2]
            let notAll = arr.filter(res => res.value !== "Todas")

            notAll.length === 1 && setDataFiltered(data.data.filter(res =>
                res[notAll[0].key].includes(notAll[0].value)))

            notAll.length === 2 && setDataFiltered(data.data.filter(res =>
                res[notAll[0].key].includes(notAll[0].value) && res[notAll[1].key].includes(notAll[1].value)))

        }

        filteringData(data.filter1, data.filter2)

    }, [data.filter1, data.filter2, data.data])

    return (


        <Container>
            <table>
                {
                    data.pending ? <LoadingSpin
                        duration="4s"
                        width="15px"
                        timingFunction="ease-in-out"
                        direction="alternate"
                        size="60px"
                        primaryColor="#1976d2"
                        secondaryColor="#333"
                        numberOfRotationsInAnimation={3}
                    />
                        :
                        <>
                            <thead>
                                <tr>
                                    <th>Nome do Responsável</th>
                                    <th>Nome do Aluno</th>
                                    <th>Curso</th>
                                    <th>Status do comissionamento</th>
                                    <th>Consultor</th>
                                    <th>Unidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.data === undefined ? <tr>
                                        <td>Selecione um período </td>
                                    </tr> :

                                        data &&
                                            data.data.length < 1 ? <tr>
                                            <td>Nada por aqui </td>
                                        </tr> :
                                            dataFiltered.length < 1 ?
                                                <td>Nada por aqui </td>
                                                :
                                                dataFiltered?.map(res => (
                                                    <tr key={res?.name}>
                                                        <td>
                                                            {res?.name}
                                                        </td>
                                                        <td>
                                                            {res?.aluno}
                                                        </td>
                                                        <td>
                                                            {res?.curso}
                                                        </td>
                                                        <td>
                                                            {res?.tipoMatricula}
                                                        </td>
                                                        <td>
                                                            {res?.owner}
                                                        </td>
                                                        <td>
                                                            {res?.unidade}
                                                        </td>
                                                    </tr>

                                                ))

                                }
                            </tbody>
                        </>

                }
            </table>
        </Container>
    )
}

export default Sellers