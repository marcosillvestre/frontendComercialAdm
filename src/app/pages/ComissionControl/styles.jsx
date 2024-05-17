import styled from "styled-components";

export const Container = styled.div`
padding: 0 4rem;
nav{
    display: flex;
    gap: 8px;
}
.page-header{
    @media(max-width:1090px){
        flex-wrap: wrap;
        justify-content: center;
    }
}
header{

.filters{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    div{
        display: flex;
        gap: 5px;
        justify-content: center;
    }
    span{
    border: 1px dashed;
    border-radius: 10px;
    padding: 7px;
    cursor: pointer;
    display: grid;
    .header{
        font-size:.6rem;
    }
    .body{

        &::after{
            content:' ✖️';
        }
    }
    }
}
div, label{
    align-items: center;
    gap: .5rem;
}
label{
    flex-direction: column;
}
}
table{
    border-radius: 4px; 
    padding: 20px;
    box-shadow: 1.5px 2px 4px 1.5px rgba(35, 36, 37, 0.3);
    
}

thead, tr, tbody, td {
    text-align: center;
    border: 1px solid;
    padding: 5px 20px;

}

.subtitle{
    margin: 0 1rem;
    box-shadow: 1.5px 2px 4px 1.5px rgba(35, 36, 37, 0.3);
    border-radius: 4px; 
    padding: 20px;
    height: min-content;
    position: sticky;
    top: 18%;

    div{
        width: 10rem;
        display: flex;
        justify-content: space-between;
        gap: 1rem;
        hr{
            height: 1rem;
            width: 5rem;
        }
    }
}

`

export const Header = styled.header`


display: flex;
align-items: center;
width: 100%;
font-size: small ;
border: 2px solid #dfe6f1;
border-radius: .35rem;
padding: 1rem 3rem;

margin-bottom: 1.5rem;
nav{
    width:100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    margin: 0 3rem;
    gap: 1rem;
}
`




export const Tax = styled.div`
display: flex;
padding: 12px;
border: 0.125em solid #1976d2; ;
box-shadow: 0 0.375em 0 #1976d2;
align-items: center;
justify-content: center;
width: 3rem;
height: 2rem;
border-radius: .5rem;
background-color: #fff;
font-size:.8rem;
margin: 0 auto;
`

export const ChartsContainer = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
background-color: #e9e9e9;

`
export const ListOpt = styled.ul`
    display:${props => props.open ? "block" : "none"} ;
    position: absolute;
    z-index: 10;
    margin-top: .3rem ;
    border-radius: .375rem;
    background-color:#dfe6f1;
    max-width: 15rem;


`
export const Options = styled.li`
        transition: .4s;
        transform-origin: top;
        color: #222;
        width: 15rem;
        border-bottom: 1px solid #fafafa;
        height: 2.78rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .75rem;
        cursor: pointer;
        span{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;
        }
        &:hover{
        background: #c4d3e0;

        }
    
`


export const ContainerTable = styled.div`
display: flex;
/* align-items: flex-start;
justify-content: center; */
gap: 2rem;
/* padding: .5rem 1rem; */

.seller-relatory{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: .5rem;
    font-size: small;
    position: sticky;
    top: 110px;
}

.cell-relatory{
    text-align: center;
    font-size: smaller;
    margin: 1rem ;
}


`

export const NavBar = styled.nav`
width: 15rem;
display: flex;
flex-direction: column;
text-align: center;
div{
    display: flex;
    gap: 6px;
    align-items: center;

}

@media(max-width:1090px){
justify-content: center;

}
`

export const ButtonLink = styled.button`
padding: .7rem 0 ;
width: 7rem ;

font-size: 1rem;
border: none;
/* background-color:${props => props.open ? "#3458f5" : "#6d7ccb"} ; */
background-color:#3458f5 ;
color:${props => props.open ? "#fff" : "#222"} ;
border-radius: .4rem;
cursor: pointer;

&:hover{
color:#fff;
background-color:${props => props.open ? "#6d7ccb" : "#7387de"} ;

}
a{
    text-decoration: none;
    color: #222;
    &:visited{
        color: #222;
    
    }
}

`
export const Checked = styled.i`
margin-left: auto;
display: none;
`


export const SelectButton = styled.div`
color: #222;
min-width: 15rem;
height: 2.5rem;

margin-top: .5rem;
display: flex;
padding: 0 1rem 0 1.4rem;
align-items: center;
justify-content: space-between;
border-radius: .375rem;
background-color:${props => props.open ? "#d4d9e4" : "#dfe6f1"} ;

    #selected-value{
    color: #000;
    font-size: .875rem;
    margin-right: 2rem;
    transition-duration: 3s;
    white-space: nowrap;
}
.container-parameters{
display: flex;
    span{
        border: 1px dashed;
        border-radius: 7px;
        padding: 1px 7px;
        white-space: nowrap;
        cursor: pointer;
        p{
            display: flex;
            width: 100%;
            &::after{
                content:'✖️';
                margin-left: 2px;
            }
            &:active{
                padding: 2px 5px;
                
            }
        }
    }
    }
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
