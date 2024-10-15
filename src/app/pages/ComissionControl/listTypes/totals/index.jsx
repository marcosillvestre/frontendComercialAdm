import LoadingSpin from "react-loading-spin";
import { Container, TableRow } from "./styles";

export const Totals = (params) => {
    const { pending, data } = params

    console.log(data)
    return (
        <Container>
            <table>
                {
                    pending ? <LoadingSpin
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
                                    <th>Background</th>
                                    <th>Unidade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data &&
                                        data?.length < 1 ? <tr>

                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                        <td> </td>
                                    </tr>
                                        :

                                        data?.map((res, i) => (
                                            <TableRow
                                                key={i}
                                            >
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
                                                    {res?.background}
                                                </td>
                                                <td>
                                                    {res?.unidade}
                                                </td>
                                            </TableRow>

                                        ))

                                }
                            </tbody>
                        </>

                }
            </table>
        </Container>
    )
}

