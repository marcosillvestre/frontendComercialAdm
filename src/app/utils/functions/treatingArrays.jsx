


export function gatheringArrays(keysArray, dataArray) {
    const nomesExistentes = new Set(); // pra evitar duplicatas
    const resultado = [];

    for (const chave of keysArray) {
        const encontrado = dataArray.find(obj => obj.name === chave);

        if (encontrado) {
            if (!nomesExistentes.has(encontrado.name)) {
                resultado.push(encontrado);
                nomesExistentes.add(encontrado.name);
            }
        } else {
            if (!nomesExistentes.has(chave)) {
                resultado.push({
                    name: chave,
                    type: 'text'
                });
                nomesExistentes.add(chave);
            }
        }
    }

    return resultado;
}