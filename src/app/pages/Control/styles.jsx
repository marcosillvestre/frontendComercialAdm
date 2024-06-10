import styled from "styled-components";

export const Container = styled.main`
font-size: var(--fsLowest) ;
display: flex;
flex-direction: column;
padding: 0 4rem;
margin-left: 17px;

.wrapper{
display: flex;
align-items: end;
flex-wrap: wrap;
gap: 1rem;
margin-bottom: 10px;
label{
    min-width: min-content;
}
}
.nav-filter{
    border: 2px solid #dfe6f1;
    border-radius: .35rem;
    padding: 1rem 3rem;
    margin-bottom: 1.5rem;

.button{
    border-radius: .35rem;
    padding: 0 .5rem ; 
    margin-top: 0; 
    border: none;
    background-color:#dfe6f1;
    height: 2.395rem;
    transition-duration: .4s;
    &:hover{
    background-color:#d9d9d9;

    }
}

.flex-group{
    display: flex;
    gap: .2rem;
    flex-wrap: wrap;
}
}

@media(max-width:760px){
margin-left: 34px ;

.nav-filter{
padding: .5rem;
}
.wrapper{
justify-content: center;
label{
width: 100%;
}
}

}
`

export const InputSearch = styled.input`
    border: ${props => props.active ? "1px solid #000000" : "none"};
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .7rem .5rem;
    width: 100%;
    transition: all.7s;
    margin-top: .5rem;
    text-overflow: ellipsis;
    height: var(--boxHei);
    font-size: var(--fsLowest);

`
export const PageUpdate = styled.div`
background-color: #1976d2;

font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;

    font-size: var(--fsLow) ;

letter-spacing: 0.02857em;
text-transform: uppercase;
min-width: 64px;
padding: 10px 16px;
border-radius: 4px;
color: #fff;
cursor: pointer;

&:hover{
background-color: #1f5fba;
}

`

export const NavControl = styled.span`
    display: flex;
    justify-content: space-between;
    margin: 1rem 2.3rem 1rem 1.6rem;
        font-size: var(--fsLow) ;

.container{
    display: grid;
    gap: .3rem;
    align-items: center;
}
`
export const Tabled = styled.span`
  z-index: 1;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color: #ededed;
    padding: 0 .7rem;
    border-radius: .5rem;
    margin-bottom: 3rem ;

    &::-webkit-scrollbar{
        display: none;
    }
    .separation{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: .7rem;
    color: #fff;
        hr{
            border: 1px solid #fff;
            width: 40%;
            height: 0 ;
        }
    }
`

export const Filters = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    div{
        display: flex;
        gap: 5px;
        justify-content: center;
        align-items: center;
        button{
            border: none;
            color: #fff;
            background-color: #e63946;
            font-family: "Roboto","Helvetica","Arial",sans-serif;
            font-weight: 500;
                font-size: var(--fsLow) ;

            letter-spacing: 0.02857em;
            text-transform: uppercase;
            padding: .5rem;
            border-radius: 5px;
            margin: 5px;
        &:hover{
            background-color: #ac4047;
        }
        
        &:active{
            opacity: .8;
        }

        }

    }
    span{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
   .header{
            font-size: var(--fsMid) ;

    }
    .body{
        &::after{
            content:' ✖️';
        }
    }
    }

`


export const Tax = styled.div`
display: flex;
padding: .5rem 1rem;
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
            font-size: var(--fsMid) ;


`

export const TableContainer = styled.div`

`
export const Filter = styled.select`

`

export const NothingHere = styled.div`
width: 100%;
height: min-content;
display: flex;
margin: 5rem 0 13.3rem 0;
justify-content: center;
align-items: center;
flex-direction: column;
img{
    height: 15rem;
    translate: 5% 0;
}

@media(max-width:760px){
    margin: 0 auto;
    img{
        height: 10rem;
    }
}
`



export const ListOpt = styled.ul`
    display:${props => props.open ? "block" : "none"} ;
    margin-top: .25rem ;
    border-radius: .375rem;
    border: 1px solid #ffffff;
    background-color:#dfe6f1;
    color: #222;
    position: absolute;
    z-index: 10;

`
export const Options = styled.li`
        transition: .4s;
        transform-origin: top;
        padding: .75rem;
        width: 100%;
        border-bottom: 2px solid #ffffff;
        display: flex;
        align-items: center;
        gap: .75rem;
        position: relative;
        &:hover{
        background: #b7caeb;
    }
    #radio{
        all: unset;
        position: absolute;
        inset: 0;
    }
    
`



export const Checked = styled.i`
color: red;
margin-left: auto;
display: none;
`


export const SelectButton = styled.div`
    margin-top: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border: none;
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .32rem .5rem;
    width: 10rem;

`
export const Icon = styled.div`
display: flex;
align-items: center;
cursor: pointer;
   .icon{
    transform: ${props => props.open ? "rotate(180deg)" : "rotate(0deg)"};
    transition: all.4s;
    }
`

export const NumberContainer = styled.div`
display: flex;
justify-content: space-between;
margin: 1rem 1rem 1rem 1.6rem;
font-size: var(--fsLow) ;


align-items: center;
.container-select{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

`