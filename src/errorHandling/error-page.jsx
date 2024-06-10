import { useRouteError } from "react-router-dom";
import errorImage from '../assets/error.svg';
import { Container } from "./styles";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <Container id="error-page">
            <div>

                <h1>Oops!</h1>
                <p>Desculpe, um erro inesperado ocorreu.</p>
                <p>
                    <i>{error.statusText || error.message}</i>
                </p>
                <img src={errorImage} alt="Error image" />
            </div>
        </Container>
    );
}