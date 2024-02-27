import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { CloserClick, PositionedMenu } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';
import { ButtonLink, ChartsContainer, Checked, Container, ContainerTable, Icon, ListOpt, NavBar, Options, SelectButton, Tax } from './styles';


import rules from '../../utils/Rules/options.jsx';
import { Conversion, Sellers, Totals, Unity } from './listTypes';

export function ComissionControll() {

    const { comissionStatusOpt, coursesOpt } = rules

    const { sellers, unity, headers, selectedInitialDate, selectedEndDate, mutation, setLabel, label, cell } = useUser()

    const [yearGraph, setYearGraph] = React.useState([])



    const { data, isPending, } = mutation

    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)

    const [relatoryUnity, setRelatoryUnity] = React.useState("Todas")
    const [statusRelatory, setStatusRelatory] = React.useState("Todas")

    const [secondRelatory, setSecondRelatory] = React.useState("Todas")

    const [thirdRelatory, setThirdRelatory] = React.useState("Todas")
    const [label6, setLabel6] = React.useState("")


    const url = useLocation()

    const filterCell = () => {
        mutation.mutate()
    }

    React.useEffect(() => {
        label !== "Selecione" && filterCell()
    }, [label])


    const periods = [
        { name: "Últimos 7 dias", },
        { name: "Este mês", },
        { name: "Mês passado", },
        { name: "Mês retrasado", },
        { name: "Este ano", },
        { name: "Período personalizado", customizable: true, },
    ]

    const graphType = [
        { name: "curso", label: "Curso" },
        { name: "tipoMatricula", label: "Comissionamento" },
        { name: "unidade", label: "Unidade" },
        { name: "owner", label: "Consultor" }
    ]

    const [param, setParam] = React.useState(false)
    const [type, setType] = React.useState('')
    const [valueGraph, setValueGraph] = React.useState([])


    async function push(type, value) {
        const body = {
            "typeGraphic": {
                "type": type,
                "value": value
            }
        }
        await URI.post('/grafico', body, { headers })
            .then(res => {
                setYearGraph(res.data.data)
            }).catch(err => (err))
    }


    const handleGraphic = (type, value, label) => {
        if (type === 'type') {
            setParam(true)
            setLabel6(label)
            setType(value)
            setValueGraph([])
            setOpen1(!open1)
        }
        if (type === 'value') {
            const exist = valueGraph.filter(res => res === value).length
            if (exist === 0) {
                valueGraph.length <= 2 ? setValueGraph(values => [...values, value]) : alert("Só é possivel configurar 3 paramêtros por vez")
            }
            if (exist > 0) {
                setValueGraph(valueGraph.filter(res => res !== value))
            }
        }
    }

    React.useEffect(() => {
        valueGraph.length > 0 && push(type, valueGraph)

    }, [type, valueGraph])



    const [list, setCompleteList] = React.useState("All")

    const handleInput = (name) => {
        setOpen1(!open1)
        setLabel(name)
    }

    if (url.pathname === '/controle-comissional') {
        return (
            <>
                <CloserClick
                    open={open1}
                    fn={setOpen1} opacity={.01}
                />
                <Container>
                    <header>
                        <nav>
                            <div >
                                <label htmlFor=""> Período personalizado:</label>

                                <SelectButton id="select-button" onClick={() => setOpen1(!open1)}>
                                    <p id="selected-value"> {label}</p>

                                    <Icon id="chevrons" open={open1}>
                                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                                    </Icon>
                                </SelectButton>

                                {
                                    selectedInitialDate !== null || selectedEndDate !== null &&
                                    `${new Date(selectedInitialDate).toLocaleDateString()}~${new Date(selectedEndDate).toLocaleDateString()}`
                                }

                                <ListOpt open={open1}>

                                    {
                                        periods?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleInput(period?.name)}>
                                                    {
                                                        period.customizable === undefined ? <p>{period?.name}</p> :
                                                            <PositionedMenu name={period?.name} />
                                                    }

                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                </ListOpt>
                            </div>

                        </nav>

                        <NavBar>
                            <p>Vizualização em </p>
                            <ButtonLink open={url.pathname === '/controle-comissional'}><a href='/controle-comissional' >Lista</a></ButtonLink> ou
                            <ButtonLink open={url.pathname === '/controle-comissional/grafico'}><a href='/controle-comissional/grafico'>Gráfico</a> </ButtonLink>
                        </NavBar>
                        <Tax>
                            {
                                isPending ? <p>Carregando...</p> :
                                    data?.total
                            }
                        </Tax>

                    </header>

                    <ContainerTable>

                        <div className='seller-relatory'>

                            <div style={{ display: "flex", gap: "20px" }}>
                                <input disabled={data === undefined} type="radio" name='radio' onClick={() => setCompleteList(data ? "Sellers" : "")} />
                                <h3 >Relatório base de consultores </h3>
                            </div>

                            <table >
                                <thead>
                                    <tr>
                                        <th>Consultor</th>
                                        <th>Vendas</th>

                                        <th>
                                            <select name="" id="" onChange={(e) => setRelatoryUnity(e.target.value)}>
                                                <option value="Todas">Todas</option>
                                                {
                                                    unity.map(res => (
                                                        <option value={res.name} key={res.name}>
                                                            {res.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </th>
                                        <th>
                                            <select name="" id="" onChange={(e) => setStatusRelatory(e.target.value)}>
                                                <option value="Todas">Todas</option>

                                                {

                                                    comissionStatusOpt.map(res => (
                                                        <option value={res} key={res}>
                                                            {res}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        sellers && sellers.map(res => (
                                            <tr key={res.name}>
                                                <td >
                                                    {res.name}
                                                </td>
                                                <td>
                                                    {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['owner'].includes(res.name)).length}
                                                </td>

                                                <td >
                                                    {isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        relatoryUnity !== 'Todas' ?
                                                            data.deals.filter(data => data['owner'].includes(res.name) && data['unidade'].includes(relatoryUnity)).length :
                                                            data.deals.filter(data => data['owner'].includes(res.name)).length
                                                        : ""
                                                    }
                                                </td>
                                                <td>

                                                    {
                                                        isPending ? <p>Carregando..</p> : data !== undefined ?
                                                            statusRelatory !== 'Todas' && relatoryUnity === 'Todas' &&
                                                            data.deals.filter(data => data['owner'].includes(res.name) && data['tipoMatricula'].includes(statusRelatory)).length
                                                            : ""
                                                    }
                                                    {
                                                        isPending ? <p>Carregando..</p> : data !== undefined ?
                                                            statusRelatory === 'Todas' && relatoryUnity === 'Todas' &&
                                                            data.deals.filter(data => data['owner'].includes(res.name)).length
                                                            : ""
                                                    }
                                                    {
                                                        isPending ? <p>Carregando..</p> : data !== undefined ?
                                                            statusRelatory === 'Todas' && relatoryUnity !== 'Todas' &&
                                                            data.deals.filter(data => data['owner'].includes(res.name) && data['unidade'].includes(relatoryUnity)).length
                                                            : ""
                                                    }
                                                    {
                                                        isPending ? <p>Carregando..</p> : data !== undefined ?
                                                            statusRelatory !== 'Todas' && relatoryUnity !== 'Todas' &&
                                                            data.deals.filter(data => data['owner'].includes(res.name) && data['unidade'].includes(relatoryUnity) && data['tipoMatricula'].includes(statusRelatory)).length
                                                            : ""
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>


                            <div style={{ display: "flex", gap: "20px" }}>
                                <input disabled={data === undefined} type="radio" name='radio' onClick={() => setCompleteList(data ? "Unity" : "")} />
                                <h3 >Relatório base de unidades </h3>
                            </div>

                            <table >
                                <thead>
                                    <tr>
                                        <th>Unidades</th>
                                        <th>Vendas</th>

                                        <th>
                                            <select name="" id="" onChange={(e) => setSecondRelatory(e.target.value)}>
                                                <option value="Todas">Todas</option>
                                                {

                                                    comissionStatusOpt.map(res => (
                                                        <option value={res} key={res}>
                                                            {res}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        unity && unity.map(res => (
                                            <tr key={res.name}>
                                                <td >
                                                    {res.name}
                                                </td>
                                                <td>
                                                    {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(res.name)).length}
                                                </td>

                                                <td>
                                                    {

                                                        isPending ? <p>Carregando..</p> : data !== undefined ?
                                                            secondRelatory !== "Todas" ?
                                                                data.deals.filter(data => data['unidade'].includes(res.name) && data['tipoMatricula'].includes(secondRelatory)).length :
                                                                data.deals.filter(data => data['unidade'].includes(res.name)).length
                                                            : ""
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>


                            <div style={{ display: "flex", gap: "20px" }}>
                                <input disabled={data === undefined} type="radio" name='radio' onClick={() => setCompleteList(data ? "Conversion" : "")} />
                                <h3 > Base de conversão de matrículas </h3>
                            </div>

                            <table >
                                <thead>
                                    <tr>
                                        <th>
                                            <select name="" id="" onChange={(e) => setThirdRelatory(e.target.value)}>
                                                <option value="Todas">Todas</option>
                                                {
                                                    unity.map(res => (
                                                        <option value={res.name} key={res.name}>
                                                            {res.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </th>
                                    </tr>
                                    <tr>
                                        {
                                            comissionStatusOpt.map(res => (
                                                <th key={res}>{res}</th>
                                            ))
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr >
                                            <td >
                                                {
                                                    isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        thirdRelatory !== "Todas" ?
                                                            data.deals.filter(data => data['unidade'].includes(thirdRelatory) && data['tipoMatricula'].includes("Pendente")).length :
                                                            data.deals.filter(data => data['tipoMatricula'].includes("Pendente")).length
                                                        : ""
                                                }

                                            </td>
                                            <td>
                                                {
                                                    isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        thirdRelatory !== "Todas" ?
                                                            data.deals.filter(data => data['unidade'].includes(thirdRelatory) && data['tipoMatricula'].includes("Não aprovado")).length :
                                                            data.deals.filter(data => data['tipoMatricula'].includes("Não aprovado")).length
                                                        : ""
                                                }
                                            </td>

                                            <td>
                                                {
                                                    isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        thirdRelatory !== "Todas" ?
                                                            data.deals.filter(data => data['unidade'].includes(thirdRelatory) && data['tipoMatricula'].includes("Pré-aprovado")).length :
                                                            data.deals.filter(data => data['tipoMatricula'].includes("Pré-aprovado")).length
                                                        : ""
                                                }
                                            </td>
                                            <td>
                                                {
                                                    isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        thirdRelatory !== "Todas" ?
                                                            data.deals.filter(data => data['unidade'].includes(thirdRelatory) && data['tipoMatricula'].includes("Aprovado")).length :
                                                            data.deals.filter(data => data['tipoMatricula'].includes("Aprovado")).length
                                                        : ""
                                                }
                                            </td>
                                            <td>
                                                {
                                                    isPending ? <p>Carregando..</p> : data !== undefined ?
                                                        thirdRelatory !== "Todas" ?
                                                            data.deals.filter(data => data['unidade'].includes(thirdRelatory) && data['tipoMatricula'].includes("Comissionado")).length :
                                                            data.deals.filter(data => data['tipoMatricula'].includes("Comissionado")).length
                                                        : ""
                                                }
                                            </td>
                                        </tr>


                                    }
                                </tbody>
                            </table>

                        </div>

                        <div className='cell-relatory'>
                            <div style={{ display: "flex", gap: "20px", justifyContent: "center" }}>

                                <input disabled={data === undefined} checked={list === "All"} type="radio" name='radio' onClick={() => setCompleteList("All")} />
                                <h3> Lista completa</h3>
                            </div>
                            {
                                list === "All" &&
                                <Totals pending={isPending} data={data?.deals} />
                            }
                            {
                                list === "Sellers" &&
                                <Sellers pending={isPending} data={data?.deals} filter1={{ key: "tipoMatricula", value: statusRelatory }} filter2={{ key: "unidade", value: relatoryUnity }} />
                            }
                            {
                                list === "Unity" &&
                                <Unity pending={isPending} data={data?.deals} filter1={{ key: 'tipoMatricula', value: secondRelatory }} />
                            }

                            {
                                list === "Conversion" &&
                                <Conversion pending={isPending} data={data?.deals} cell={cell} filter1={{ key: "unidade", value: thirdRelatory }} />
                            }



                        </div>

                    </ContainerTable>

                </Container>

            </>
        )
    }

    if (url.pathname === '/controle-comissional/grafico') {
        return (
            <>
                <CloserClick
                    open={open1}
                    fn={setOpen1} opacity={.01}
                />
                <CloserClick
                    open={open2}
                    fn={setOpen2} opacity={.01}
                />
                <Container>
                    <header className='page-header'>
                        <nav>

                            <div >
                                <label htmlFor=""> Gráfico:</label>

                                <SelectButton id="select-button" onClick={() => setOpen1(!open1)}>
                                    <p id="selected-value"> {label6 === '' ? "Selecione" : label6}</p>
                                    <Icon id="chevrons" open={open1}>
                                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                                    </Icon>
                                </SelectButton>


                                <ListOpt open={open1}>

                                    {
                                        graphType?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleGraphic("type", period?.name, period?.label)}>

                                                    <p>{period?.label}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>

                                            </Options>
                                        ))
                                    }
                                </ListOpt>
                            </div>

                            <div >
                                <label htmlFor=""> Parâmetros:</label>

                                <SelectButton
                                    open={label6 !== '' ? false : true}
                                    parameters={true} onClick={() => setOpen2(!open2)}>

                                    <div className='container-parameters'>
                                        {valueGraph.map(res => (
                                            <span key={res} onClick={() =>
                                                setValueGraph(valueGraph.filter(data => data !== res))} >
                                                <p>
                                                    {res}
                                                </p>
                                            </span>
                                        ))}
                                    </div>

                                    <Icon id="chevrons" open={open2}>
                                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                                    </Icon>
                                </SelectButton>


                                <ListOpt open={param === true && open2} parameters={true}>

                                    {
                                        label6 === 'Curso' &&
                                        coursesOpt?.map(period => (
                                            <Options className="option" key={period} >
                                                <span className="label"
                                                    onClick={() =>
                                                        handleGraphic("value", period)}
                                                >

                                                    <p>{period}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Unidade' &&
                                        unity?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label"
                                                    onClick={() =>
                                                        handleGraphic("value", period?.name)}
                                                >

                                                    <p>{period?.name}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Comissionamento' &&
                                        comissionStatusOpt?.map(period => (
                                            <Options className="option" key={period} >
                                                <span className="label"
                                                    onClick={() =>
                                                        handleGraphic("value", period)}
                                                >

                                                    <p>{period}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Consultor' &&
                                        sellers?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleGraphic("value", period?.name)}>

                                                    <p>{period?.name}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }

                                </ListOpt>
                            </div>

                        </nav>

                        <NavBar>
                            <p>Vizualização em</p>
                            <ButtonLink open={url.pathname === '/controle-comissional'}><a href='/controle-comissional' >Lista</a></ButtonLink> ou
                            <ButtonLink open={url.pathname === '/controle-comissional/grafico'}><a href='/controle-comissional/grafico'>Gráfico</a> </ButtonLink>
                        </NavBar>

                    </header>



                    {

                        <ChartsContainer>
                            <BarChart width={600} height={400} data={yearGraph}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="fn.parameter1" fill="#8884d8" />
                                <Bar dataKey="fn.parameter2" fill="#82ca9d" />
                                <Bar dataKey="fn.parameter3" fill="#3a56df" />
                            </BarChart>

                            <span className='subtitle' >

                                <h2>Legenda</h2>
                                {valueGraph[0] && <div><p>{valueGraph[0]}</p>  <hr style={{ backgroundColor: "#8884d8" }}></hr></div>}
                                {valueGraph[1] && <div><p>{valueGraph[1]}</p>  <hr style={{ backgroundColor: "#82ca9d" }}></hr></div>}
                                {valueGraph[2] && <div><p>{valueGraph[2]}</p>  <hr style={{ backgroundColor: "#3a56df" }}></hr></div>}
                            </span>

                            <LineChart width={600} height={400} data={yearGraph}>
                                <Tooltip />
                                <Line type="monotone" dataKey="fn.parameter1" stroke="#8884d8" />
                                <Line type="monotone" dataKey="fn.parameter2" fill="#82ca9d" />
                                <Line type="monotone" dataKey="fn.parameter3" fill="#3a56df" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>

                            <ComposedChart width={600} height={400} data={yearGraph}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <CartesianGrid stroke="#f5f5f5" />
                                <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
                                <Bar dataKey="fn.parameter1" barSize={20} fill="#413ea0" />
                                <Line type="bump" dataKey="fn.parameter2" stroke="#82ca9d" />
                                <Line type="basisOpen" dataKey="fn.parameter3" stroke="#3a56df" />
                            </ComposedChart>


                        </ChartsContainer>

                    }



                </Container>
            </>

        )
    }
}