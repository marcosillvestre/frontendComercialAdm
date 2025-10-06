import PropTypes from 'prop-types';
import noData from '../../assets/noData.svg';
import { Container, Image } from './styles';



export const EmptyData = ({ width }) => {
    return (
        <Container>
            <Image
                style={{
                    width: width
                }}
                src={noData}
            />

        </Container>
    )
}

EmptyData.propTypes = {
    width: PropTypes.string.isRequired,
};