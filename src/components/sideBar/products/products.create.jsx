

import { useProduct } from '../../../hooks/products/productsContext.hook.jsx';
import { SwitchButtons } from '../../switchButtons/index.jsx';
import { Category } from './category/index.jsx';
import { Kits } from './kit/index.jsx';
import { Prod } from './prod/index.jsx';
import { Container } from './styles.jsx';


export const ProductsSidebar = () => {
    const { view, setView } = useProduct();


    const sidebars = {
        produtos: <Prod />,
        kits: <Kits />,
        categorias: <Category />,

    }

    return (

        <Container >
            <span>
                <SwitchButtons
                    data={{
                        fn: setView,
                        options: [
                            "produtos",
                            "kits",
                            "categorias"
                        ],
                        optionActive: view,
                    }}
                />
            </span>

            <hr />

            {sidebars[view]}

        </Container>

    )
}

