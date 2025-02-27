import styled from 'styled-components'



export const File = styled.main`
display: flex;
flex-direction: column;
align-items: center;
gap: 1rem;
#container1{
    border: 1px solid;
    padding: 1rem 3rem;
}
button{
width: 30%;

}
`
export const Container = styled.section`
font: var(--fsMid) 'Open Sans', sans-serif;
text-align: justify;
padding: 3rem 5rem;
min-height: 90dvh;
display: flex;
align-items: center;
/* border: 1px solid; */
div{
    width: 100%;
}
section,
tr,
td {
page-break-before: always;
border: 1px solid #000;
border-spacing: 0;
}
tr,td, section {
    border-radius: .2rem;
    padding: .3rem;
}
.headers{
    text-align: center;
    /* font-size: var(--fs); */
    /* margin: 2rem auto; */
}
.bolder{
    font-weight: bold;
}
section{
    margin: 1rem auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
table {
margin: 5px auto;
width: 100%;
}
.contrast{
    background-color: #e7e7e7;
}
.sign {
display: flex;
margin: 2em auto;
gap: 2rem;
width: 100%;
justify-content: space-around;
}
.sign-marker {
width: 50%;
border-top: 1px solid #222;
margin: 2rem 0;
text-align: center;
}
.field-sign {
padding: 1rem;
}
.editable{
    padding: 3px;
    border: 1px solid #222;
}
`