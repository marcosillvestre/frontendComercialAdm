import styled from "styled-components";




export const Container = styled.section`
padding: 2rem 10rem;
header{
    width: 100%;
    font-weight: bold;
    overflow: hidden;
    margin: 2rem auto;
    display: flex;
    justify-content: space-between;
    /* white-space: nowrap; */
    /* text-overflow: ellipsis; */

    button{
        border: none;
        background-color: #1976d2;
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        font-weight: 500;
        font-size: 0.75rem;
        letter-spacing: 0.02857em;
        text-transform: uppercase;
        min-width: 64px;
        padding: 16px;
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
        height: 3rem;
        &:hover{
        background-color: #1f5fba;
        }
    }
}
`
export const MainBox = styled.main`

display: flex;
justify-content: center;
width: 100%;
table{
    width: 100%;
}
`