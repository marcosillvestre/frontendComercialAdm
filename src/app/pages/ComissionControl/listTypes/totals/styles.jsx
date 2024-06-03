import styled from "styled-components";

export const Container = styled.div`
    overflow-y: scroll;
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