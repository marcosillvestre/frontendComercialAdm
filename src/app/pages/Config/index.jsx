
import camp from '../../../assets/campaign.svg'
import products from '../../../assets/pdts.svg'
import pdeserv from '../../../assets/prods.svg'
import team from '../../../assets/team.svg'

import { default as settings } from '../../../assets/unity.svg'

import { paths } from '../../constants/paths.js'
import { Container, Links, MainBox } from './styles.jsx'
export const Settings = () => {


    return (
        <Container>
            <header>
                <h1>Configurações</h1>
            </header>

            <MainBox>

                <div className='boxes'>
                    <p>
                        Convide toda a sua equipe
                        a fazer parte do time
                    </p>
                    <img src={team} alt="" />
                    <Links to={paths.configRegister.path}>
                        Convidar usuários
                    </Links>
                </div>


                <div className='boxes'>
                    <p>
                        Crie novos campos personalizados
                    </p>
                    <img src={settings} alt="" />
                    <Links
                        to={paths.configCustomFields.path}
                    // style={{ pointerEvents: "none" }}
                    >
                        Campos
                    </Links>
                </div>

                <div className='boxes'>
                    <p>
                        Crie novas campanhas
                    </p>
                    <img src={camp} alt="" />
                    <Links
                        to={paths.campaign.path}
                    // style={{ pointerEvents: "none" }}
                    >
                        Campanha
                    </Links>
                </div>


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
                </div> */}

                {/* ///////////////////////// */}

                <div className='boxes'>
                    <p>
                        Controle os seus produtos
                    </p>
                    <img src={pdeserv} alt="" />
                    <Links
                        to={paths.products.path}
                    >
                        Produtos
                    </Links>
                </div>
                <div className='boxes'>
                    <p>
                        Controle os seus serviços
                    </p>
                    <img src={products} alt="" />
                    <Links
                        to={paths.services.path}
                    >
                        Serviços
                    </Links>
                </div>

                {/* <div className='boxes'>
                    <p>
                        Gerencie seus contratos
                    </p>
                    <img src={contract} alt="" />
                    <Links
                        to={paths.configCustomFields.path}
                        style={{ pointerEvents: "none" }}
                    >
                        Em breve..
                    </Links>
                </div> */}







            </MainBox>


        </Container>
    )
}
