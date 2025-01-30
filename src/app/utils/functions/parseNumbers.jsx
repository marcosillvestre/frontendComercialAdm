export const parseNumber = (number) => {

    if (typeof number === 'string') {

        const parsed = number.includes(",") ?
            parseFloat(number.replace(",", ".")) :
            parseInt(number)

        return parsed
    }

    if (number === '' || number === undefined) return 0

}
