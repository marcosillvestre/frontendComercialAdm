import styled from 'styled-components'


export const Container = styled.section`
font: 20px 'Open Sans', sans-serif;
border: 1px solid #222;
padding: 5rem;

table,
tr,
td {
border: 1px solid #000;
border-collapse: collapse;
border-spacing: 0;
}
tr,
td {
padding: 0 10px;
}
table {
margin: 5px auto;
width: 100%;
}
.sign {
display: flex;
gap: 2rem;
margin: 4rem auto;
width: 100%;
justify-content: space-around;
}
.sign-marker {
/* width: 100%; */
border-top: 1px solid #222;
margin: 0 10rem;
}
.field-sign {
padding: 1rem;
}
`