import { SureSendContract } from '../../../../components/popUps/sureSendContract';
import { useOrders } from '../../../../hooks/orders/ordersContext.hook.jsx';
import { useUser } from '../../../../hooks/userContext.jsx';
import { paths } from '../../../constants/paths.js';
import { senderImpressContract } from '../../../utils/functions/makePdfs.jsx';
import { ButtonContainer, Container, Links } from './styles.jsx';


const aw = "https://ik.imagekit.io/khqnnhktw/assets/copy.svg?updatedAt=1707937900692"

const Invoice = () => {

    const { orders: data, recibo, setCheckData } = useOrders()
    const { userData } = useUser()


    if (!data) window.location.href = paths.orders.path

    const date = new Date().toLocaleDateString()

    const cropIds = (id) => {
        if (!id || typeof id !== "string") return ""; // Garante que `id` seja válido
        return id.slice(-12); // Retorna os últimos 12 caracteres
    };

    const nameCreatorForPdf = () => {
        const ids = data && data.map((r, index) => {
            let croppedId = cropIds(r.id)

            return index < data.length ? croppedId.concat("_") : croppedId
        })

        return `reciboMd-${data[0].name}+${cropIds(data.id)}_`.concat(ids).replace(/,/g, '');
    }

    const pdfName = data.length > 0 && nameCreatorForPdf()


    return (

        <Container>
            <div className='buttons-container'>
                <ButtonContainer
                    className="defaultButton"
                >
                    <Links
                        to="/pedidos"
                        onClick={() => setCheckData([])}
                    >
                        Voltar
                    </Links>
                </ButtonContainer>

                <div>

                    <ButtonContainer
                        className="defaultButton"

                        able={true}
                        onClick={() => senderImpressContract(pdfName, recibo)}
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
                            data && data[0]?.unity === 'PTB' ?
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
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data && data.map((res, index) => (
                                    <tr key={index}>
                                        <td>{res.book}</td>
                                        <td>Sim</td>
                                        <td>{new Date(res.created_at).toLocaleDateString('pt-BR')}</td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>



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
                            <h3>{data[0]?.name}</h3>
                        </div>
                    </div>

                </>

                <div className='separation' />

                <>
                    <header>
                        <img src={aw} alt="" />
                        {
                            data && data[0]?.unity === 'PTB' ?
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
                            </tr>
                        </thead>

                        <tbody>
                            {
                                data && data.map((res, index) => (
                                    <tr key={index}>
                                        <td>{res.book}</td>
                                        <td>Sim</td>
                                        <td>{new Date(res.created_at).toLocaleDateString('pt-BR')}</td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>



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
                            <h3>{data[0]?.name}</h3>
                        </div>
                    </div>

                </>

            </div>


        </Container>


    )
}

export default Invoice