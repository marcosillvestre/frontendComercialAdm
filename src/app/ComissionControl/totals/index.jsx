import LoadingSpin from "react-loading-spin";
import { Container } from "../styles";

const Totals = (data) => {
    console.log(data)
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
                                            data.data?.length < 1 ? <tr>
                                            <td>Nada por aqui </td>
                                        </tr>
                                            :

                                            data.data?.map(res => (
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

export default Totals