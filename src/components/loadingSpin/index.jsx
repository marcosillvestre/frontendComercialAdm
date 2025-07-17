import LoadingSpin from 'react-loading-spin';
import { Container } from './styles.jsx';


export const Loading = () => {
    return (
        <Container>
            <LoadingSpin
                duration="4s"
                width="15px"
                timingFunction="ease-in-out"
                direction="alternate"
                size="60px"
                primaryColor="#1976d2"
                secondaryColor="#333"
                numberOfRotationsInAnimation={3}
            />

        </Container>
    )
}
