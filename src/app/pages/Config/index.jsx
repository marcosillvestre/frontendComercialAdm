


import { paths } from '../../constants/paths.js'
import { Container, Links, MainBox } from './styles.jsx'

export const Settings = () => {


    return (
        <Container>
            <header>
                <h3>Configurações</h3>
            </header>

            <MainBox>


                <Links to={paths.configRegister.path}>
                    Convidar usuários
                </Links>

                <Links to={paths.configCustomFields.path}>
                    Campos
                </Links>


                <Links to={paths.campaign.path}>
                    Campanha
                </Links>

                <Links to={paths.products.path} >
                    Produtos
                </Links>

                <Links to={paths.services.path} >
                    Serviços
                </Links>

                <Links to={paths.supliers.path} >
                    Fornecedores
                </Links>

                <Links to={paths.billingRule.path} >
                    Régua de cobranças
                </Links>



                {/* <div className='boxes'>
                    <p>
                        Cadastre todas as unidades da sua operação
                    </p>
                    <img src={unityUnd} alt="" />
                    <Links
                        to={paths.configRegister.path}
                        style={{ pointerEvents: "none" }}

                    >
                        Unidades
                    </Links>
                 */}

                {/* ///////////////////////// */}


            </MainBox>


        </Container>
    )
}
