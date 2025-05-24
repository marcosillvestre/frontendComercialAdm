


import { paths } from '../../constants/paths.js'
import { Container, Links, MainBox } from './styles.jsx'

export const Settings = () => {


    return (
        <Container>
            <header>
                <h3>Configurações</h3>
            </header>

            <MainBox>


                <Links to={paths.users.path}>
                    Convidar usuários
                </Links>

                <Links to={paths.configCustomFields.path}>
                    Campos personalizados
                </Links>


                <Links to={paths.campaign.path}>
                    Campanhas
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
                    Réguas de cobrança
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
