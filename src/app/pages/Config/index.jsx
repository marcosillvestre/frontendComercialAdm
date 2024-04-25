
import settings from '../../../assets/settings.svg'
import team from '../../../assets/team.svg'
import { paths } from '../../constants/paths.js'
import { Container, MainBox } from './styles.jsx'
export const Settings = () => {

    return (
        <Container>
            <header>
                <p>Configurações</p>
            </header>

            <MainBox>
                <div className='boxes'>
                    <p>
                        Crie campos personalizados
                        de acordo com a sua necessidade.
                    </p>
                    <img src={settings} alt="" />
                    <a href={paths.configCustomFields}>
                        Criar campos personalizados
                    </a>
                </div>

                <div className='boxes'>
                    <p>
                        Convide o resto da sua equipe
                        a fazer parte do nosso time.
                    </p>
                    <img src={team} alt="" />
                    <a href={paths.configRegister}>
                        Convidar usuários
                    </a>
                </div>

            </MainBox>


        </Container>
    )
}
