


import { paths } from '../../constants/paths.js'
import { Container, Links, MainBox } from './styles.jsx'

export const Settings = () => {


    return (
        <Container>
            <header>
                <h3>Configurações</h3>
            </header>

            <MainBox>

                <p>equipe</p>
                <Links
                    className='defaultButton'
                    to={paths.users.path}>
                    Convidar usuários
                </Links>

                <p>matrículas</p>
                <Links
                    className='defaultButton'
                    to={paths.configCustomFields.path}>
                    Campos personalizados
                </Links>

                <p>produtos e serviços</p>
                <Links
                    className='defaultButton'
                    to={paths.products.path} >
                    Produtos
                </Links>

                <Links
                    className='defaultButton'
                    to={paths.services.path} >
                    Serviços
                </Links>

                <p>externo</p>
                <Links
                    className='defaultButton'
                    to={paths.campaign.path}>
                    Campanhas
                </Links>

                <Links
                    className='defaultButton'
                    to={paths.supliers.path} >
                    Fornecedores
                </Links>

                <Links
                    className='defaultButton'
                    to={paths.billingRule.path} >
                    Réguas de cobrança
                </Links>


            </MainBox>


        </Container>
    )
}
