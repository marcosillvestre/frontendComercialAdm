import PropTypes from 'prop-types';
import { Container } from './styles';

export const Tag = ({ data }) => {
    const { label, color, title } = data;


    return (
        <Container
            style={{ backgroundColor: color }}
            title={title}
        >
            {label}
        </Container>
    )
}

Tag.propTypes = {
    data: PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string,
        title: PropTypes.string,
    }).isRequired,
};