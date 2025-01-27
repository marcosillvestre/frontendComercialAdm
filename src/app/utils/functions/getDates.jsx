

export const getDate = async (range) => {

    const now = new Date();


    const LastMonth = () => `${new Date(now.getFullYear(), now.getMonth() - 1, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)}`;
    const TwoMonths = () => `${new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() - 1, 0, 23, 59, 59, 999)}`;
    const ThisMonth = () => `${new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0)}~${new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999)}`;


    // if (custom) {
    //     var { selectedInitialDate, selectedEndDate } = custom
    // }

    // const Custom = () => `${selectedInitialDate}~${selectedEndDate}`;


    const SevenDays = () => {
        const date = new Date()
        date.setDate(date.getDate() - 7)
        return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const All = () => {
        const date = new Date()
        date.setDate(date.getDate() - 10000)
        return `${date.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const ThisYear = () => {
        const date = new Date();
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        return `${firstDayOfYear.toDateString()}~${new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)}`
    }

    const settledPeriod = {
        "Mês passado": await LastMonth(),
        "Mês retrasado": await TwoMonths(),
        "Este mês": await ThisMonth(),
        // "Personalizado": await Custom(),
        "Últimos 7 dias": await SevenDays(),
        "Este ano": await ThisYear(),
        "Todo período": await All(),
    }

    return settledPeriod[range]
}