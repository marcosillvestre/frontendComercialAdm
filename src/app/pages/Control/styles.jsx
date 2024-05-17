import styled from "styled-components";

export const Container = styled.main`
display: flex;
flex-direction: column;
width: 100vw;
padding: 0 4rem;

@media(max-width:1090px){
    padding: 0 .8rem;
}

.nav-filter{
    display: grid;
    gap:1rem;
    
    .wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    }
    
    font-size: small ;
    border: 2px solid #dfe6f1;
    border-radius: .35rem;
    padding: 1rem 3rem;

    margin-bottom: 1.5rem;

.name-filter{
    display: flex;
    gap: .2rem;
    align-items: end;
}


.button{
    border-radius: .35rem;
    padding: 0 .5rem ; 
    margin-top: 0; 
    border: none;
    background-color:#dfe6f1;
    height: 2.395rem;
    transition-duration: .4s;
    &:hover{
    background-color:#c5ccd7;

    }
}

.flex-group{
    display: flex;
    gap: .2rem;
    flex-wrap: wrap;
}
}
`

export const InputSearch = styled.input`
    border: none;
    background-color:#dfe6f1;
    border-radius: .35rem;
    padding: .7rem .5rem;
    width: ${props => props.active ? "10rem" : "5.3rem"};
    transition: all.9s;
    margin-top: .5rem; 
    text-overflow: ellipsis;

`
export const PageUpdate = styled.div`
background-color: #1976d2;

font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.675rem;
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
        align-items: center;
        button{
            border: none;
            color: #fff;
            background-color: #e63946;

font-family: "Roboto","Helvetica","Arial",sans-serif;
font-weight: 500;
font-size: 0.675rem;
letter-spacing: 0.02857em;
text-transform: uppercase;
min-width: 64px;

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
padding: .5rem 1rem;
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
height: min-content;
display: flex;
font-size: 1.4rem;
margin: 5rem 0 13.3rem 0;
justify-content: center;
align-items: center;
flex-direction: column;
img{
    height: 15rem;
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