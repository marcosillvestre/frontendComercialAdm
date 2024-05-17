import React, { useState } from 'react';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { CloserClick, Select } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';
import { ButtonLink, ChartsContainer, Container, ContainerTable, Header, NavBar, Tax } from './styles';


import LoadingSpin from 'react-loading-spin';
import { useUnities } from '../../../hooks/unities/unitiesContext.hook.jsx';
import { useUsers } from '../../../hooks/users/usersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Totals } from './listTypes';

export function ComissionControll() {

    const { predeterminedPeriods, comissionStatusOpt, coursesOpt } = businessRules


    const { headers, selectedInitialDate,
        selectedEndDate, comissionQuery, setLabel, label, cell,
    } = useUser()

    const { UsersQuery } = useUsers()

    const { unityQuery } = useUnities()




    const [yearGraph, setYearGraph] = React.useState([])




    const { data, isPending } = comissionQuery


    const [open1, setOpen1] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)

    const [relatoryUnity, setRelatoryUnity] = React.useState("Todas")
    const [statusRelatory, setStatusRelatory] = React.useState("Todas")

    const [secondRelatory, setSecondRelatory] = React.useState("Todas")

    const [thirdRelatory, setThirdRelatory] = React.useState("Todas")
    const [label6, setLabel6] = React.useState("")


    const [view, setView] = useState('list')





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

                <Header>

                    <nav>
                        <label htmlFor="">
                            <p>
                                Período personalizado:
                            </p>
                            <Select
                                label={businessRules.predeterminedPeriods[0].name}
                                option={predeterminedPeriods}
                                width="10rem"
                                fn={[handleInput]}
                            />
                            <p style={{ textAlign: "center" }}>
                                {
                                    selectedInitialDate &&
                                    `${selectedInitialDate !== null ? new Date(selectedInitialDate).toLocaleDateString() : ""} ~ ${selectedEndDate !== null ? new Date(selectedEndDate).toLocaleDateString() : ""}`
                                }
                            </p>
                        </label>

                        <label htmlFor="">
                            <p>Unidade</p>

                            <Select
                                label={'Tudo'}
                                option={unityQuery.data && [{ name: "Tudo" }, ...unityQuery.data]}
                                width="10rem"
                                fn={[]}
                            />
                        </label>
                        <label htmlFor="">
                            <p>Usuário responsável</p>
                            <Select
                                label={'Tudo'}
                                option={UsersQuery.data && [{ name: "Tudo" }, ...UsersQuery.data]}
                                width="10rem"
                                fn={[]}
                            />
                        </label>
                        <label htmlFor="">
                            <p>Status</p>

                            <Select
                                label={'Tudo'}
                                option={[{ name: "Tudo" }, ...comissionStatusOpt]}
                                width="10rem"
                                fn={[]}
                            />
                        </label>

                    </nav>

                    {/* <nav>
                            <div >
                                <label htmlFor=""> Gráfico:</label>

                                <SelectButton id="select-button" onClick={() => setOpen1(!open1)}>
                                    <p id="selected-value"> {label6 === '' ? "Selecione" : label6}</p>
                                    <Icon id="chevrons" open={open1}>
                                        <i className='icon' > <KeyboardArrowDownIcon /></i>
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
                                        <i className='icon' > <KeyboardArrowDownIcon /></i>
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
                                        label6 === 'Comissionamento' &&
                                        comissionStatusOpt?.map(period => (
                                            <Options className="option" key={period.name} >
                                                <span className="label"
                                                    onClick={() =>
                                                        handleGraphic("value", period.name)}
                                                >

                                                    <p>{period.name}</p>
                                                </span>
                                                <Checked className='icon-right'><DoneIcon /></Checked>
                                            </Options>
                                        ))
                                    }
                                    {
                                        label6 === 'Consultor' &&
                                        UsersQuery.data && UsersQuery.data?.map(period => (
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
                     */}    

                    <Tax>
                        {
                            isPending ? <p>Carregando...</p> :
                                data?.total
                        }
                    </Tax>

                </Header>

                <NavBar>
                    <p>Visualização em </p>
                    <div>
                        <ButtonLink open={view === 'list' && true} onClick={() => setView("list")}>Lista</ButtonLink> ou
                        <ButtonLink open={view === 'graphic' && true} onClick={() => setView("graphic")}>Dashboard </ButtonLink>
                    </div>
                </NavBar>

                {view === 'list' ?
                    <ContainerTable >
                        {
                            isPending ?
                                <LoadingSpin
                                    duration="4s"
                                    width="15px"
                                    timingFunction="ease-in-out"
                                    direction="alternate"
                                    size="60px"
                                    primaryColor="#1976d2"
                                    secondaryColor="#333"
                                    numberOfRotationsInAnimation={3}
                                /> :

                                <div className='cell-relatory'>

                                    <Totals pending={isPending} data={data?.deals} />

                                </div>

                        }
                    </ContainerTable>
                    :


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