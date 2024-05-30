import styled from "styled-components";

export const Container = styled.div`
    overflow-y: scroll;
    box-shadow: 0.2rem 0.2rem 0rem rgba(39,39,39);
    margin-bottom: 20px;
::-webkit-scrollbar{
    display: none;
}
table{
    border-radius: var(--border-radius); 
    padding: 20px;
}

thead, tr, tbody, td {
    text-align: center;
    padding: 5px 20px;
}

`

export const TableRow = styled.tr`

`