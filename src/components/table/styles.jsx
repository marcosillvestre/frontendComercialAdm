import DeleteIcon from '@mui/icons-material/Delete';
import { TableBody, TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import styled from "styled-components";


export const RowTable = styled(TableRow)`

background-color: ${props => props.validated ? "" : "#90d5995a"};
background-color: ${props => props.openned && "#f5f5f5"};

border-left: .2rem solid #4648da;
border-right: .2rem solid #4648da;

`

export const Td = styled.td`
display: flex;
justify-content: center;

`

export const BodyTable = styled(TableBody)`
border-left: .1rem solid #16207421;
/* border-right: .1rem solid #16207421; */

`
export const HeadTable = styled(TableHead)`
font-weight: bold;
height: 3rem;

`
export const DataTable = styled(TableRow)`
border-left: .1rem solid #16207421;
border-right: .1rem solid #16207421;
`

export const ButtonChanger = styled.button`
width: 75%;
`
export const Trash = styled(DeleteIcon)`

&:hover{
    color: #5e5e5e;
}
&:active{
    opacity: 0.7;
}
`

export const Select = styled.select`
border: none;
padding: .4rem;
border-radius: .6rem ;
box-shadow: -2px 2px 9px 0px rgba(0,0,0,0.66);
text-overflow: ellipsis;

`
export const Button = styled.button`
background: none;
border: none;
margin-left: .5rem;
padding: .7rem;
border-radius: 20%;

&:hover{
    background:#e0e0e0;
}
&:active{
    opacity: 0.7;
}

`
export const Text = styled.textarea`
min-width: 4rem;
max-width: 15rem;
max-height: 10rem;
padding: .3rem;
box-shadow: -2px 3px 9px 0px rgba(0,0,0,0.66);

`

export const Signs = styled.td`
td{
display: flex;
flex-wrap: wrap;
}
`
export const Input = styled.input`
border: none;
padding: .4rem;
width: 8rem;
border-radius: .6rem ;
box-shadow: -2px 3px 4px 0px rgba(0,0,0,0.66);
text-overflow: ellipsis;
`