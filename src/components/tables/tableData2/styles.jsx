import DeleteIcon from '@mui/icons-material/Delete';
import { TableBody, TableCell, TableHead } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import styled from "styled-components";


export const RowTable = styled(TableRow)`

background-color: ${props => props.validated ? "#90d5995a" : ""};

border-left: .2rem solid #4648da;
border-right: .2rem solid #4648da;
font-size: calc(var(--fsLowest) - 2px);

`

export const RowTableCustomFields = styled(TableRow)`
width: 100dvw;
border-left: .2rem solid #e49058;
border-right: .2rem solid #e49058;
font-size: calc(var(--fsLowest) - 2px);

`

export const RowTableSection = styled(TableCell)`
width: 100dvw;
background-color: #ededed;
border-left: .2rem solid #bcffa1;
border-right: .2rem solid #bcffa1;
padding-left: 1rem ;

`

export const Td = styled.td`
display: flex;
justify-content: center;

`

export const BodyTable = styled(TableBody)`

`
export const HeadTable = styled(TableHead)`
font-weight: bold;
height: 3rem;

`
export const DataTable = styled(TableRow)`
border: .1rem solid #16207421;
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
font-size: calc(var(--fsLow) - 2px);

`
export const Button = styled.button`
background: none;
border: none;
margin-left: .5rem;
padding: .7rem;
border-radius: 5px;

&:active{
    opacity: 0.7;
}

`
export const InputsBox = styled.div`

gap: 1rem;
min-height: 10rem;
svg{
    height: 1.4rem;
}
input[type="file"]{
    width: 0;
}


button{
width: 100%;
border: none;
color: #fff;
background-color: #3458f5;
padding: .8rem  ;
border-radius: 5px;
margin: 5px 0;
&:hover{
background-color:#526cdf;

}
&:active{
opacity: .8;

}
}
`


export const FileContainer = styled.span`
cursor: pointer;
background-color: #d6d6d6;
border-radius: 5px;
width: 25rem;
justify-content: space-between;
margin-bottom: 2px;

p{
    text-decoration: underline;
    color: #06115bd8;
    position: relative;
}
&:hover{
    background-color: #cdcdcd;
}

`
export const ChooseArchive = styled.span`
display: flex;
flex-direction: column;
gap: .5rem;
justify-content: center;
align-items: center;

label {
height: min-content;

}
input{
width: 100%;
border: none;
color: #fff;
background-color: #3458f5;
padding: .8rem  ;
border-radius: 5px;
margin: 5px 0;
&:hover{
background-color:#526cdf;

}
&:active{
opacity: .8;

}
}
svg{
    width: 6rem;
    height: 4rem;
    color: rgb(25, 118, 210);
    cursor: pointer;
}
`



export const Text = styled.textarea`
width: 100%;
height: 7.5rem;
padding: .3rem;
min-width: 12rem;

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
width: 7rem;
border-radius: .6rem ;
box-shadow: -2px 3px 4px 0px rgba(0,0,0,0.66);
text-overflow: ellipsis;
`


export const ObservationField = styled.div`
display: grid;
gap: 3px;
small{
    font-size: calc(var(--fsLowest) - 2px);
    line-height: 10px;
}
span{
    display: flex;
    align-items: center;
}
span:nth-child(2n){
    flex-direction: row-reverse;
    div{
        border-radius: 17px 0 17px 17px;
        translate: 5% 0;
    }
}
.item{
    background-color: #2f31b1;
    color: #fff;
    padding: .2rem .5rem;
    border-radius: 0 17px 17px 17px  ;
    width: 70%;
    font-weight: lighter;

    font-size: calc(var(--fsLowest) - 1px);

    h5{
        /* width: 40%; */
    }
}

`