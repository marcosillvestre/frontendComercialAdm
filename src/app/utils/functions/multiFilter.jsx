
function agruparFiltros(filtros) {
    return filtros.reduce((agrupados, filtro) => {
        if (!agrupados[filtro.key]) {
            agrupados[filtro.key] = [];
        }
        agrupados[filtro.key].push(filtro.value);
        return agrupados;
    }, {});
}

export const filtrarArray = (array, filtros, arrayPadrao) => {
    if (filtros.length === 0) {
        return arrayPadrao;
    }

    const filtrosAgrupados = agruparFiltros(filtros);

    console.log(filtrosAgrupados)

    return array.filter(item => {
        return Object.keys(filtrosAgrupados).every(key => {
            return filtrosAgrupados[key].includes(item[key]);
        });
    });
}

