import { useLayoutEffect, useState } from 'react';
import { Area, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { CloserClick, Select } from '../../../components/source.jsx';
import { useUser } from '../../../hooks/userContext';
import URI from '../../utils/utils';
import { ButtonLink, ChartsContainer, Container, ContainerTable, Header, NavBar, SelectButton, Tax, Wrapper } from './styles';


import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
gsap.registerPlugin(Flip)

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

    const [yearGraph, setYearGraph] = useState([])

    // const { data, isPending } = comissionQuery

    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)


    const [view, setView] = useState('list')

    const [relatory, setRelatory] = useState([])
    const [type, setType] = useState([])
    const [sellersRelatories, setSellersRelatories] = useState([])
    const [unities, setUnitiesRelatories] = useState([])




    const handleFilter = (key, value) => {
        if (value === 'Tudo') return setType(type.filter(res => res.key !== key))
        setType([...type, { key, value }])
    }

    useLayoutEffect(() => {

        function filtrarArray(array, filtros, arrayPadrao) {
            if (filtros.length === 0) {
                return arrayPadrao;
            }


            return array.filter(item => {
                return filtros.every(filtro => item[filtro.key] === filtro.value);
            });
        }
        if (comissionQuery.status === 'success') {

            const resultado = filtrarArray(comissionQuery.data.deals, type, comissionQuery.data.deals);
            setRelatory(resultado)


            const data = resultado.reduce((contador, item) => {
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
    }, [comissionQuery.data, comissionQuery.status, type])

    // const graphType = [
    //     { name: "curso", label: "Curso" },
    //     { name: "tipoMatricula", label: "Comissionamento" },
    //     { name: "unidade", label: "Unidade" },
    //     { name: "owner", label: "Consultor" }
    // ]



    const [valueGraph, setValueGraph] = useState([])


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
            // setType(value)
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




    const [list, setList] = useState('')
    console.log(list)

    const handleInput = (name) => {
        setOpen1(!open1)
        setLabel(name)
    }

    const realData = relatory.length > 0 ? relatory : comissionQuery.data && comissionQuery.data.deals

    const cards = document.querySelectorAll(".grid-cards")
    cards?.forEach((card, idx) => {
        card.addEventListener("click", () => {
            const state = Flip.getState(cards)

            const isActive = card.classList.contains("active")

            cards.forEach((other, otherIdx) => {
                other.classList.remove("active")
                other.classList.remove("inactive")
                if (!isActive && idx !== otherIdx) {
                    other.classList.add("inactive")
                }
            })
            if (!isActive && list !== '') card.classList.add("active");

            Flip.from(state, {
                duration: 1,
                ease: 'expo.out',
                absolute: true
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
                            {
                                unityQuery.status === 'success' &&
                                <Select
                                    label={'Tudo'}
                                    option={[{ name: "Tudo" }, ...unityQuery.data]}
                                    where="create"
                                    field='unidade'
                                    width="10rem"
                                    fn={[handleFilter]}
                                />
                            }
                        </label>
                        <label htmlFor="">
                            <p>Usuário responsável</p>
                            {
                                UsersQuery.status === 'success' &&
                                <Select
                                    label={'Tudo'}
                                    option={[{ name: "Tudo" }, ...UsersQuery.data]}
                                    where="create"
                                    field='owner'
                                    width="10rem"
                                    fn={[handleFilter]}
                                />
                            }
                        </label>
                        <label htmlFor="">
                            <p>Status</p>

                            <Select
                                label={'Tudo'}
                                option={[{ name: "Tudo" }, ...comissionStatusOpt]}
                                where="create"
                                field='tipoMatricula'
                                width="10rem"
                                fn={[handleFilter]}
                            />
                        </label>

                        <Tax>
                            {
                                comissionQuery.isPending ? <p>Carregando...</p> :
                                    comissionQuery.data?.total
                            }
                        </Tax>

                    </nav>

                </Header>

                <NavBar>
                    <span>
                        <p>Visualização em </p>
                        <div>
                            <ButtonLink open={view === 'list' && true} onClick={() => setView("list")}>Lista</ButtonLink> ou
                            <ButtonLink open={view === 'graphic' && true} onClick={() => setView("graphic")}>Dashboard </ButtonLink>
                        </div>
                    </span>


                    <div className='subtitle'>
                        <span className='container'>
                            <p>Vendedores</p>
                            <hr />
                            {sellersRelatories.map(res => (
                                <div key={res.owner} className='wrapper-container'>
                                    <SelectButton
                                        className='paragraph'
                                        onClick={() => setList(res.owner)}
                                        open={list === res.owner}
                                    >
                                        {res.owner}
                                    </SelectButton>
                                </div>
                            ))}
                        </span>
                    </div>
                    <Wrapper>

                        {
                            unityQuery.data && realData &&
                            unityQuery.data.map(res => (
                                <div
                                    className='grid-cards subtitle'
                                    key={res.name}
                                >
                                    <p className=''>
                                        {res.name}
                                    </p>
                                    <hr />
                                    <p className='count'>
                                        {realData.map((r, idx) => (
                                            r.unidade === res.name && r.owner === list &&
                                            <p key={idx}>{r.name}</p>
                                        ))
                                            // .length
                                        }
                                    </p>
                                </div>
                            ))
                        }
                    </Wrapper>
                </NavBar>

                {view === 'list' ?
                    <ContainerTable >
                        {
                            comissionQuery.isPending ?
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
                                        pending={comissionQuery.isPending}
                                        data={realData}
                                    />

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