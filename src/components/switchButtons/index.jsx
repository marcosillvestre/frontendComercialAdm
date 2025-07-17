import PropTypes from 'prop-types';
import { Buttons, Container } from './styles.jsx';

export const SwitchButtons = ({ data }) => {
    const { options, optionActive, fn } = data;


    return (
        <Container>
            {
                options.length > 0 &&
                options.map((res, index) => (
                    <Buttons
                        active={res === optionActive}
                        key={index}
                        onClick={() => fn(res)}
                    >
                        {res}
                    </Buttons>

                ))
            }
        </Container>
    )
}


SwitchButtons.propTypes = {
    data: PropTypes.shape({
        options: PropTypes.array.isRequired,
        optionActive: PropTypes.string.isRequired,
        fn: PropTypes.node,

    }).isRequired,
};