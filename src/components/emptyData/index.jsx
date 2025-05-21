import noData from '../../assets/noData.svg'
import { Container, Image } from './styles'



export const EmptyData = () => {
    return (
        <Container>
            <h3>Sem dados</h3>
            <Image
                src={noData}
            />

        </Container>
    )
}
