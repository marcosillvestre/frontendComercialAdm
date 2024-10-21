import { SureSendContract } from '../../../../components/popUps/sureSendContract';
import { useOrders } from '../../../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { paths } from '../../../constants/paths.js';
import { senderImpressContract } from '../../../utils/functions/makePdfs.jsx';
import { ButtonContainer, Container, Links } from './styles.jsx';


const aw = "https://ik.imagekit.io/khqnnhktw/assets/copy.svg?updatedAt=1707937900692"
const Invoice = () => {

    const { orders: data, recibo } = useOrders()
    const { userData } = useUser()

    if (!data) window.location.href = paths.orders.path

    const date = new Date().toLocaleDateString()

    return (

        <Container>
            <div className='buttons-container'>
                <ButtonContainer
                    className="defaultButton"
                >
                    <Links
                        to="/pedidos"
                    >
                        Voltar
                    </Links>
                </ButtonContainer>

                <div>

                    <ButtonContainer
                        className="defaultButton"

                        able={true}
                        onClick={() => senderImpressContract(`reciboMd-${data.orders[0].nome}+${data.code}`, recibo)}
                    >
                        Gerar PDf

                    </ButtonContainer>


                    <ButtonContainer
                        className="defaultButton"
                        able={true}
                    >
                        <SureSendContract
                            data={"Enviar Online"}
                            text={"Enviar o recibo via Autentique para o cliente"}
                        />
                    </ButtonContainer>
                </div>
            </div>


            <div className="recibo" ref={recibo}>
                <>
                    <header>
                        <img src={aw} alt="" />
                        {
                            data && data.unity === 'PTB' ?
                                <p>AMERICAN WAY - C.N.P.J. 18.953.641/0001-26 </p>
                                :
                                <p>AMERICAN WAY - C.N.P.J. 42.387.487/0001-57 </p>
                        }
                    </header>
                    <div className='received'>
                        <p>Recebi de American Way:</p>
                        <p>Data de Impressão: {date}</p>
                    </div>
                    <table className='prods'>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Ent.</th>
                                <th>Data de pagamento</th>
                                <th>Valor Unitário</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data && data.orders.map((res, index) => (
                                    <tr key={index}>
                                        <td>{res.materialDidatico}</td>
                                        <td>Sim</td>
                                        <td>{res.data}</td>
                                        <td>{res.valor}</td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>



                    <h3>Valor Total: R$ {data.orders.length > 0 && data.orders.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)}</h3>
                    <hr />

                    <div className="assinaturas">
                        <p>Assinaturas:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                        <div className="names">
                            <h3>{userData.name}</h3>
                            <h3>{data.orders[0].nome}</h3>
                        </div>
                    </div>

                </>

                <div className='separation' />

                <>
                    <header>
                        <img src={aw} alt="" />
                        {
                            data && data.unity === 'PTB' ?
                                <p>AMERICAN WAY - C.N.P.J. 18.953.641/0001-26 </p>
                                :
                                <p>AMERICAN WAY - C.N.P.J. 42.387.487/0001-57 </p>
                        }
                    </header>
                    <div className='received'>
                        <p>Recebi de American Way:</p>
                        <p>Data de Impressão: {date}</p>
                    </div>
                    <table className='prods'>
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Ent.</th>
                                <th>Data de pagamento</th>
                                <th>Valor Unitário</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data && data.orders.map((res, index) => (
                                    <tr key={index}>
                                        <td>{res.materialDidatico}</td>
                                        <td>Sim</td>
                                        <td>{res.data}</td>
                                        <td>{res.valor}</td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>



                    <h3>Valor Total: R$ {data.orders.length > 0 && data.orders.reduce((acc, curr) => acc + curr.valor, 0).toFixed(2)}</h3>
                    <hr />

                    <div className="assinaturas">
                        <p>Assinaturas:</p>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                        </table>
                        <div className="names">
                            <h3>{userData.name}</h3>
                            <h3>{data.orders[0].nome}</h3>
                        </div>
                    </div>

                </>

            </div>


        </Container>


    )
}

export default Invoice