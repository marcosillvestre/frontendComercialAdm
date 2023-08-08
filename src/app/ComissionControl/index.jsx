// import { useState } from 'react'
import Header from '../../components/header'
import { useUser } from '../../hooks/userContext'
import { Container } from './styles'


function ComissionControll() {
    // const [seller, setSeller] = useState([])
    const { userData } = useUser()

    // useEffect(() => {
    //     if (seller.length === 0) {

    //         users.map(res => {
    //             if (res.role === 'comercial' || res.role === 'gerencia') {
    //                 setSeller(r => [...r, res])
    //             }
    //         })

    //     }

    // }, [seller.length, users])





    return (
        <>
            <Header data={userData} />
            <Container>

                <table>
                    <thead>

                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Quantidade de vendas</th>

                        </tr>
                    </thead>
                    {/* <tbody>
                        {seller && seller.map(res => (
                            <tr key={res.name}>
                                <td>{res.name}</td>
                                <td>{res.email}</td>
                                <td>{res.id}</td>
                            </tr>
                        ))}

                    </tbody> */}
                </table>
            </Container>
        </>
    )
}


export default ComissionControll