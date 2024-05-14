
import settings from '../../../assets/settings.svg'
import team from '../../../assets/team.svg'
import unity from '../../../assets/unity.svg'

import { paths } from '../../constants/paths.js'
import { Container, MainBox } from './styles.jsx'
export const Settings = () => {

    return (
        <Container>
            <header>
                <h1>Configurações</h1>
            </header>

            <MainBox>
                <div className='boxes'>
                    <p>
                        Crie novos campos personalizados
                    </p>
                    <img src={settings} alt="" />
                    <a href={paths.configCustomFields}>
                        Novo campo
                    </a>
                </div>

                <div className='boxes'>
                    <p>
                        Convide toda a sua equipe
                        a fazer parte do time
                    </p>
                    <img src={team} alt="" />
                    <a href={paths.configRegister}>
                        Convidar usuários
                    </a>
                </div>

                <div className='boxes'>
                    <p>
                        Cadastre todas as unidades da sua operação
                    </p>
                    <img src={unity} alt="" />
                    <a href={paths.configRegister}>
                        Nova unidade
                    </a>
                </div>



            </MainBox>


        </Container>
    )
}