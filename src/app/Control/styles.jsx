import styled from "styled-components";

export const Container = styled.main`
display: flex;
flex-direction: column;
width: 100vw;
padding: 0 4rem;


.nav-filter{
    display: flex;
    gap: 2rem;
    align-items: end;
    justify-content: center;
    font-size: small ;
    border: 2px solid #dfe6f1;
    border-radius: .35rem;
    padding: 1.2rem;
    margin-bottom: 1.5rem;

    #category-select label {
    font-size: .75rem;
    letter-spacing: .0225rem;
    }
    #selected-value{
        font-size: .795rem;
    }


.filter{
    border: none;
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .7rem .5rem;
    width: 10rem;
    margin-top: .5rem; 
    
}
.name-filter{
    display: flex;
    gap: 3px;
    margin-right: 2rem;
    align-items: end;
}
.button{
    border-radius: .35rem;
    padding: 0 .5rem ; 
    margin-top: 0; 
    border: none;
    background-color:#dfe6f1;
    height: 2.38rem;
    transition-duration: .4s;
    &:hover{
        padding: 0 1.5rem ; 
    svg{
    scale:1.2 ;
    }
    }
}
}
.div-tax{
    width: 5vw;
    padding: 0 1.4rem;
    translate: -3.2rem -.3rem;
}


`
export const NavControl = styled.span`
    display: flex;
    justify-content: space-between;
    margin: 1rem 2.3rem 1rem 1.6rem;
    font-size: small;
.container{
    display: flex;
    flex-direction: column;
    gap: .1rem;
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
    flex-direction: column;
    align-items: center;
    gap: 5px;
    div{
        display: flex;
        gap: 5px;
        justify-content: center;
        button{
            border: none;
            color: #fff;
            background-color: #e63946;
            padding: 9px 20px;
            border-radius: 5px;
            margin: 5px;
            box-shadow: 4px 4px 0 #d90429;
            transition: transform 0.1s, box-shadow 0.1s ;
        &:active{
            transform: translate(4px,4px);
            box-shadow: 0 0 0 #d90429;
        }
        }

    }
    span{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
   .header{
        font-size:.6rem;
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
padding: calc((4em - (1em * 1.5) - (0.125em * 2) - 0.375em) / 2) calc(1em * 1.5);
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size:.8rem;

`

export const TableContainer = styled.div`

`
export const Filter = styled.select`

`

export const SearchButton = styled.button`
background: none;
    color: rgb(25, 118, 210);
    border: none;
    font-size: 1rem;
    margin: 0 1rem 0.6rem 2rem;
    padding: 0 1rem;
    border-radius: 0.5rem;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.75;
    letter-spacing: 0.02857em;
    text-transform: uppercase;

&:hover{
        text-decoration: none;
    background-color: rgba(25, 118, 210, 0.04);
}

`
export const NothingHere = styled.div`
width: 100%;
display: flex;
font-size: 1.4rem;
margin: 5rem 0 13.3rem 0;
justify-content: center;
align-items: center;
flex-direction: column;
img{
    height: 20rem;
    translate: 5% 0;
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


export const PageUpdate = styled.div`
margin-top: 0.6rem ;
background-color: #3485f5;
border-radius: 10px ;
padding: .6rem .8rem;
height: 2.5rem;
text-align: center;
color: #fff;
cursor: pointer;
gap: .5rem;
display: flex;
&:hover{
background-color: #1f5fba;
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
    .icon-up{
        transform: rotate(180deg);
        display:${props => props.open ? "block" : "none"} ;
    }
    
    .icon-down{
        display:${props => props.open ? "none" : "block"} ;
    }
`

export const NumberContainer = styled.div`
display: flex;
justify-content: space-between;
font-size: small;
margin: 1rem 1rem 1rem 1.6rem;

align-items: center;
div{
    display: flex;
    align-items: center;
    gap: .5rem;
}
.mid{
    translate: -30px 0;
}
`

export const InputTake = styled.select`
width: 5rem;
border: 0.125em solid #222; ;
box-shadow: 0 0.375em 0 #222;
width: 3rem;
height: 2rem;
border-radius: .5rem;
font-size:.8rem;
`