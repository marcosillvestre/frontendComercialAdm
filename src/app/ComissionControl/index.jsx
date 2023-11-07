import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import LoadingSpin from "react-loading-spin";
import { useLocation } from 'react-router-dom';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import PositionedMenu from '../../components/filteringMenu';
import MiniDrawer from '../../components/sideBar';
import { useUser } from '../../hooks/userContext';
import URI from '../utils/utils';
import { ButtonLink, Checked, Container, ContainerTable, Icon, ListOpt, NavBar, Options, SelectButton, Tax } from './styles';

function ComissionControll() {
    const { sellers, unity, headers, selectedInitialDate, selectedEndDate, mutation, setLabel, label, cell } = useUser()

    const [yearGraph, setYearGraph] = React.useState([])

    const status = [
        { name: "Pendente" },
        { name: "Não aprovado" },
        { name: "Pré-aprovado" },
        { name: "Aprovado" },
        { name: "Comissionado" },
    ]
    const courses = [
        { name: "Inglês" },
        { name: "Tecnologia" },
        { name: "Espanhol" }
    ]
    const { data, isPending, } = mutation


    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)

    const [label2, setLabel2] = React.useState("PTB")
    const [label3, setLabel3] = React.useState("Pendente")
    const [label4, setLabel4] = React.useState("Pendente")
    const [label5, setLabel5] = React.useState("PTB")
    const [label6, setLabel6] = React.useState("")


    const url = useLocation()


    const filterCell = () => {
        mutation.mutate()
    }

    React.useEffect(() => {
        filterCell()
    }, [label])


    const periods = [
        { name: "Selecione", },
        { name: "Últimos 7 dias", },
        { name: "Este mês", },
        { name: "Mês passado", },
        { name: "Mês retrasado", },
        { name: "Este ano", },
        { name: "Período personalizado", customizable: true, },
    ]

    //metricas para o grafico
    // curso: true,
    // tipoMatricula: true,
    // unidade: true,
    // owner: true

    const graphType = [
        { name: "curso", label: "Curso" },
        { name: "tipoMatricula", label: "Status da comissão" },
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



    if (url.pathname === '/controle-comissional') {
        return (
            <>
                <MiniDrawer />

                <Container>

                    <header>
                        <nav>
                            <div id="category-select">
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
                                                <span className="label" onClick={() => setLabel(period?.name)}>
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
                            <h3 >Relatório base de consultores </h3>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Consultor</th>
                                        <th>Vendas</th>

                                        <th>
                                            <select name="" id="" onChange={(e) => setLabel2(e.target.value)}>
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
                                            <select name="" id="" onChange={(e) => setLabel3(e.target.value)}>
                                                {

                                                    status.map(res => (
                                                        <option value={res.name} key={res.name}>
                                                            {res.name}
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
                                                    {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['owner'].includes(res.name) && data['unidade'].includes(label2)).length}
                                                </td>
                                                <td>
                                                    {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['owner'].includes(res.name) && data['unidade'].includes(label2) && data['tipoMatricula'].includes(label3)).length}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h3 >Relatório base de unidades </h3>
                            <table >
                                <thead>
                                    <tr>
                                        <th>Unidades</th>
                                        <th>Vendas</th>

                                        <th>
                                            <select name="" id="" onChange={(e) => setLabel4(e.target.value)}>
                                                {

                                                    status.map(res => (
                                                        <option value={res.name} key={res.name}>
                                                            {res.name}
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
                                                    {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(res.name) && data['tipoMatricula'].includes(label4)).length}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <h3 > Base de conversão de matrículas </h3>
                            <table >
                                <thead>
                                    <tr>
                                        <th>
                                            <select name="" id="" onChange={(e) => setLabel5(e.target.value)}>
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
                                            status.map(res => (
                                                <th key={res.name}>{res.name}</th>

                                            ))
                                        }

                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr >
                                            <td >
                                                {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(label5) && data['tipoMatricula'].includes("Pendente")).length}

                                            </td>
                                            <td>
                                                {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(label5) && data['tipoMatricula'].includes("Não aprovado")).length}
                                            </td>

                                            <td>
                                                {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(label5) && data['tipoMatricula'].includes("Pré-aprovado")).length}
                                            </td>
                                            <td>
                                                {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(label5) && data['tipoMatricula'].includes("Aprovado")).length}
                                            </td>
                                            <td>
                                                {isPending ? <p>Carregando..</p> : data !== undefined && data.deals.filter(data => data['unidade'].includes(label5) && data['tipoMatricula'].includes("Comissionado")).length}

                                            </td>
                                        </tr>

                                    }
                                </tbody>
                            </table>

                        </div>

                        <div className='cell-relatory'>
                            <h3> Lista completa</h3>
                            <table>
                                {
                                    isPending ? <LoadingSpin
                                        duration="4s"
                                        width="15px"
                                        timingFunction="ease-in-out"
                                        direction="alternate"
                                        size="60px"
                                        primaryColor="#1976d2"
                                        secondaryColor="#333"
                                        numberOfRotationsInAnimation={3}
                                    />
                                        :
                                        <>
                                            <thead>
                                                <tr>
                                                    <th>Nome do Responsável</th>
                                                    <th>Nome do Aluno</th>
                                                    <th>Curso</th>
                                                    <th>Status do comissionamento</th>
                                                    <th>Consultor</th>
                                                    <th>Unidade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {

                                                    data ? data.deals !== undefined &&
                                                        cell?.map(res => (
                                                            <tr key={res?.name}>
                                                                <td>
                                                                    {res?.name}
                                                                </td>
                                                                <td>
                                                                    {res?.aluno}
                                                                </td>
                                                                <td>
                                                                    {res?.curso}
                                                                </td>
                                                                <td>
                                                                    {res?.tipoMatricula}
                                                                </td>
                                                                <td>
                                                                    {res?.owner}
                                                                </td>
                                                                <td>
                                                                    {res?.unidade}
                                                                </td>
                                                            </tr>

                                                        )) : <tr>
                                                        <td>  Nada aqui ainda</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </>
                                }
                            </table>
                        </div>

                    </ContainerTable>

                </Container>

            </>
        )
    }

    if (url.pathname === '/controle-comissional/grafico') {
        return (
            <>
                <MiniDrawer />
                <Container>


                    <header>
                        <nav>


                            <div id="category-select">
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

                            <div id="category-select">
                                <label htmlFor=""> Parametros:</label>

                                <SelectButton open={label6 !== '' ? false : true} parameters={true} onClick={() => setOpen2(!open2)}>
                                    {/* <p id="selected-value"> {valueGraph.length === 0 && "Selecione"}</p>
                                    <p id="selected-value"> {valueGraph.length === 1 && valueGraph[0]},{valueGraph[1]},{valueGraph[2]}</p>
                                    <p id="selected-value"> {valueGraph[0]},{valueGraph[1]},{valueGraph[2]}</p>
                                    <p id="selected-value"> {valueGraph[0]},{valueGraph[1]},{valueGraph[2]}</p> */}
                                    {valueGraph.map(res => (
                                        <span key={res} onClick={() => setValueGraph(valueGraph.filter(data => data !== res))} >
                                            <p>
                                                {res}
                                            </p>
                                        </span>
                                    ))}
                                    <Icon id="chevrons" open={param === true && open2}>
                                        <i className='icon-up' > <KeyboardArrowDownIcon /></i>
                                        <i className='icon-down'> <KeyboardArrowDownIcon /></i>
                                    </Icon>
                                </SelectButton>


                                <ListOpt open={param === true && open2} parameters={true}>

                                    {
                                        label6 === 'Curso' &&
                                        courses?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleGraphic("value", period?.name)}>

                                                    <p>{period?.name}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Unidade' &&
                                        unity?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleGraphic("value", period?.name)}>

                                                    <p>{period?.name}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Status da comissão' &&
                                        status?.map(period => (
                                            <Options className="option" key={period?.name} >
                                                <span className="label" onClick={() => handleGraphic("value", period?.name)}>

                                                    <p>{period?.name}</p>
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

                        <>
                            <BarChart width={1320} height={250} data={yearGraph}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="fn.parameter1" fill="#8884d8" />
                                <Bar dataKey="fn.parameter2" fill="#82ca9d" />
                                <Bar dataKey="fn.parameter3" fill="#3a56df" />
                            </BarChart>

                            <LineChart width={1320} height={300} data={yearGraph}>
                                <Tooltip />
                                <Line type="monotone" dataKey="fn.parameter1" stroke="#8884d8" />
                                <Line type="monotone" dataKey="fn.parameter2" fill="#82ca9d" />
                                <Line type="monotone" dataKey="fn.parameter3" fill="#3a56df" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>

                            <ComposedChart width={1230} height={400} data={yearGraph}>
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
                        </>

                    }



                </Container>
            </>

        )
    }
}
export default ComissionControll