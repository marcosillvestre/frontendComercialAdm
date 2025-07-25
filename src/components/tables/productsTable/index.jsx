import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import { useProduct } from '../../../hooks/products/productsContext.hook';
import { MultiFiltersProducts } from '../../arrayFilters/multiFilters.products';
import { SwitchButtons } from '../../switchButtons';
import { Categorie } from './categorie';
import { Kits } from './kit';
import { Products } from './product';
import { ContainerTable } from './styles';


export function ProductsTable() {

    const { view, setView } = useProduct();

    const tables = {
        "produtos": <Products />,
        "kits": <Kits />,
        "categorias": <Categorie />,
    }

    //consertae esse miltifilter

    return (
        <>
            <MultiFiltersProducts />
            <ContainerTable component={Paper}>

                <div className='table_tag'>

                    <h3>Lista de {view}</h3>

                    <div>
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
                    </div>


                </div>

                {tables[view]}

            </ContainerTable>
        </>

    );
}

ProductsTable.propTypes = {
    data: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    total: PropTypes.number.isRequired

}