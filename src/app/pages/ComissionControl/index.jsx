import { useLayoutEffect, useState } from 'react';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { CloserClick, Select } from '../../../components/source.jsx';
import { useComission } from '../../../hooks/comissions/comissionContext.hook.jsx';
import { useUser } from '../../../hooks/userContext';
import { ChartsContainer, Container, ContainerTable, Header, NavBar, SelectButton, Tax } from './styles';

import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

import LoadingSpin from 'react-loading-spin';
import { useUnities } from '../../../hooks/unities/unitiesContext.hook.jsx';
// import { useUsers } from '../../../hooks/users/usersContext.hook.jsx';
import businessRules from '../../utils/Rules/options.jsx';
import { Totals } from './listTypes';

import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import * as XLSX from 'xlsx';
import excel from '../../../assets/excel.svg';

export function ComissionControll() {
    gsap.registerPlugin(Flip)

    const {
        predeterminedPeriods, comissionStatusOpt,
        // comissionStatusOpt, 
    } = businessRules


    const { selectedInitialDate,
        selectedEndDate, userData
    } = useUser()

    // const { UsersQuery } = useUsers()

    const { unityQuery } = useUnities()

    // const [yearGraph, setYearGraph] = useState([])

    const { comissionSuccess, comissionQuery, comissionPending, setLabel, label } = useComission()

    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)


    const [view, setView] = useState('list')

    const [relatory, setRelatory] = useState([])
    const [list, setList] = useState([])
    const [animation, setAnimation] = useState(false)

    const [sellersRelatories, setSellersRelatories] = useState([])

    useLayoutEffect(() => {

        function agruparFiltros(filtros) {
            return filtros.reduce((agrupados, filtro) => {
                if (!agrupados[filtro.key]) {
                    agrupados[filtro.key] = [];
                }
                agrupados[filtro.key].push(filtro.value);
                return agrupados;
            }, {});
        }

        function filtrarArray(array, filtros, arrayPadrao) {
            if (filtros.length === 0) {
                return arrayPadrao;
            }

            const filtrosAgrupados = agruparFiltros(filtros);

            return array.filter(item => {
                return Object.keys(filtrosAgrupados).every(key => {
                    return filtrosAgrupados[key].includes(item[key]);
                });
            });
        }

        if (comissionSuccess) {

            const resultado = filtrarArray(comissionQuery, list, comissionQuery);
            setRelatory(resultado)


            const data = comissionQuery.reduce((contador, item) => {
                const owner = item.owner;
                if (contador[owner]) {
                    contador[owner]++;

                } else {
                    contador[owner] = 1;
                }
                return contador;
            }, {});


            setSellersRelatories(Object.keys(data).map(owner => ({
                owner: owner,
                count: data[owner]
            })))
        }
    }, [comissionQuery, comissionSuccess,
        list
    ])

    // const graphType = [
    //     { name: "curso", label: "Curso" },
    //     { name: "tipoMatricula", label: "Comissionamento" },
    //     { name: "unidade", label: "Unidade" },
    //     { name: "owner", label: "Consultor" }
    // ]



    // const [valueGraph, setValueGraph] = useState([])


    // async function push(type, value) {
    //     const body = {
    //         "typeGraphic": {
    //             "type": type,
    //             "value": value
    //         }
    //     }
    //     await URI.post('/grafico', body)
    //         .then(res => {
    //             setYearGraph(res.data.data)
    //         }).catch(err => (err))
    // }


    // const handleGraphic = (type, value, label) => {
    //     if (type === 'type') {
    //         // setType(value)
    //         setValueGraph([])
    //         setOpen1(!open1)
    //     }
    //     if (type === 'value') {
    //         const exist = valueGraph.filter(res => res === value).length
    //         if (exist === 0) {
    //             valueGraph.length <= 2 ? setValueGraph(values => [...values, value]) : alert("Só é possivel configurar 3 paramêtros por vez")
    //         }
    //         if (exist > 0) {
    //             setValueGraph(valueGraph.filter(res => res !== value))
    //         }
    //     }
    // }

    const exportToExcel = () => {
        setAnimation(true)
        const worksheet = XLSX.utils.json_to_sheet(comissionQuery);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

        // Buffer to store the generated Excel file
        const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });

        setTimeout(() => {
            toast.success("Planilha criada com sucesso")
            setAnimation(false)
            saveAs(blob, `${label}.xlsx`)
        }, 3600);
    };
    const handleInput = (name) => {
        setOpen1(!open1)
        setLabel(name)
    }


    const buttonsLinks = document.querySelectorAll(".button-link")
    const active = document.querySelector(".active")

    buttonsLinks.forEach((button, idx) => {
        button.addEventListener('click', () => {

            const ac = button.classList.contains('ac')
            if (!ac) {
                button.classList.add('ac')
                buttonsLinks.forEach((other, otherIdx) => {
                    idx !== otherIdx && other.classList.remove('ac')
                })

            }
            const state = Flip.getState(active)
            button.appendChild(active)

            Flip.from(state, {
                duration: 1.5,
                absolute: true,
                ease: 'elastic.out(1,0.5)'
            })

        })
    })




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
                                width="5rem"
                                fn={[handleInput]}
                            />
                            <p style={{ textAlign: "center" }}>
                                {
                                    selectedInitialDate &&
                                    `${selectedInitialDate !== null ? new Date(selectedInitialDate).toLocaleDateString() : ""} ~ ${selectedEndDate !== null ? new Date(selectedEndDate).toLocaleDateString() : ""}`
                                }
                            </p>
                        </label>


                    </nav>
                    <Tax>
                        {
                            comissionPending === false && <p>
                                {comissionQuery.length}
                            </p>
                        }
                    </Tax>

                </Header>

                <NavBar animate={animation}>
                    <span>
                        <p>Visualização em </p>
                        <div className='buttons'>
                            <div
                                open={view === 'list' && true}
                                onClick={() => setView("list")}
                                className='button-link ac'
                            >
                                <p>Lista</p>
                                <div className='active'></div>

                            </div>
                            |
                            <div
                                open={view === 'graphic' && true}
                                onClick={() => setView("graphic")}
                                className='button-link'
                            >
                                <p>Dashboard</p>

                            </div>
                        </div>
                    </span>

                    <div
                        className='buttons generate'
                        onClick={() => exportToExcel()}
                    >
                        Gerar planilha
                        <img src={excel} alt="excel logo" />
                    </div>




                </NavBar>

                {view === 'list' ?
                    <ContainerTable
                        load={comissionPending}
                    >
                        {
                            comissionPending ?
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

                                    <Totals
                                        pending={comissionPending}
                                        data={relatory}
                                        sellected={list}
                                    />

                                    <div className='subtitle'>
                                        {
                                            userData.role !== 'comercial' &&
                                            <span className='container '>
                                                <p>Vendedores</p>
                                                <hr />
                                                <SelectButton
                                                    className='paragraph'
                                                    onClick={() => setList(list.filter(res => res.key !== 'owner'))}
                                                    open={list.filter(res => res.key === 'owner').length === 0}
                                                >
                                                    Todos
                                                </SelectButton>
                                                {sellersRelatories.map(res => (
                                                    <div
                                                        key={res.owner}
                                                        className='wrapper-container'>

                                                        <SelectButton
                                                            className='paragraph'
                                                            onClick={() => list.find(r => r.value === res.owner) ?
                                                                setList(list.filter(r => r.value !== res.owner))
                                                                : setList([...list, { key: "owner", value: res.owner }])}
                                                            open={list && list.some(r => r.value === res.owner)}
                                                        >
                                                            {res.owner}
                                                        </SelectButton>
                                                    </div>
                                                ))}
                                            </span>
                                        }

                                        <span className='container '>
                                            <p>Unidades</p>
                                            <hr />
                                            <SelectButton
                                                className='paragraph'
                                                onClick={() => setList(list.filter(res => res.key !== 'unidade'))}
                                                open={list.filter(res => res.key === 'unidade').length === 0}
                                            >
                                                Todos
                                            </SelectButton>
                                            {unityQuery.data &&
                                                unityQuery.data.map(res => (
                                                    <div
                                                        key={res.id}
                                                        className='wrapper-container'>

                                                        <SelectButton
                                                            className='paragraph'
                                                            onClick={() => list.find(r => r.value === res.name) ?
                                                                setList(list.filter(r => r.value !== res.name))
                                                                : setList([...list, { key: "unidade", value: res.name }])}
                                                            open={list && list.some(r => r.value === res.name)}
                                                        >
                                                            {res.name}
                                                        </SelectButton>
                                                    </div>
                                                ))
                                            }
                                        </span>

                                        <span className='container '>
                                            <p>Status de comissionamento</p>
                                            <hr />
                                            <SelectButton
                                                className='paragraph'
                                                onClick={() => setList(list.filter(res => res.key !== 'tipoMatricula'))}
                                                open={list.filter(res => res.key === 'tipoMatricula').length === 0}
                                            >
                                                Todos
                                            </SelectButton>
                                            {
                                                comissionStatusOpt.map((res, idx) => (
                                                    <div
                                                        key={idx}
                                                        className='wrapper-container'>

                                                        <SelectButton
                                                            className='paragraph'
                                                            onClick={() => list.find(r => r.value === res.name) ?
                                                                setList(list.filter(r => r.value !== res.name))
                                                                : setList([...list, { key: "tipoMatricula", value: res.name }])}
                                                            open={list && list.some(r => r.value === res.name)}
                                                        >
                                                            {res.name}
                                                        </SelectButton>
                                                    </div>
                                                ))
                                            }
                                        </span>


                                        <div className='container'>
                                            Total
                                            <hr />
                                            <p>
                                                {relatory.length}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                        }
                    </ContainerTable>
                    :

                    userData.name === "Marcos" ?
                        <ChartsContainer>
                            <BarChart width={600} height={400}
                            // data={}
                            >
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

                                {/* <h2>Legenda</h2>
                                {valueGraph[0] && <div><p>{valueGraph[0]}</p>  <hr style={{ backgroundColor: "#8884d8" }}></hr></div>}
                                {valueGraph[1] && <div><p>{valueGraph[1]}</p>  <hr style={{ backgroundColor: "#82ca9d" }}></hr></div>}
                                {valueGraph[2] && <div><p>{valueGraph[2]}</p>  <hr style={{ backgroundColor: "#3a56df" }}></hr></div>} */}
                            </span>

                            <LineChart width={600} height={400}
                            // data={yearGraph}
                            >
                                <Tooltip />
                                <Line type="monotone" dataKey="fn.parameter1" stroke="#8884d8" />
                                <Line type="monotone" dataKey="fn.parameter2" fill="#82ca9d" />
                                <Line type="monotone" dataKey="fn.parameter3" fill="#3a56df" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="name" />
                                <YAxis />
                            </LineChart>

                            <ComposedChart width={600} height={400}
                            // data={yearGraph}
                            >
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
                        :
                        <div style={{ width: "100vw", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <p>
                                Em breve..
                            </p>

                            <LoadingSpin
                                duration="4s"
                                width="15px"
                                timingFunction="ease-in-out"
                                direction="alternate"
                                size="60px"
                                primaryColor="#1976d2"
                                secondaryColor="#333"
                                numberOfRotationsInAnimation={3}
                            />
                        </div>
                }

            </Container>

        </>
    )


}