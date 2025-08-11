import Paper from '@mui/material/Paper';
import { useProduct } from '../../../hooks/products/productsContext.hook';
import { MultiFilters } from '../../arrayFilters/multiFilters/index.jsx';
import { SwitchButtons } from '../../switchButtons';
import { Categorie } from './categorie';
import { Kits } from './kit';
import { Products } from './product';
import { ContainerTable } from './styles';


export function ProductsTable() {

    const { view, setView, typeFilter, setTypeFilter, removeFilter } = useProduct();

    const tables = {
        "produtos": <Products />,
        "kits": <Kits />,
        "categorias": <Categorie />,
    }


    return (
        <>
            <MultiFilters
                data={{
                    removeFilter: removeFilter,
                    setType: setTypeFilter,
                    types: typeFilter
                }}
            />
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
