import { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import axios from 'axios';
const Container = styled.div`
padding: 20px;
display:flex;
flex-wrap: wrap;
justify-content: space-between;
`

const Products = ({categorie, filters, sort}) => {
    const [products,setProducts] = useState([])
    const [filteredProducts,setFilteredProducts] = useState([])
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const response = await axios.get(categorie
                    ? `http://localhost:4000/products?category=${categorie}`
                    : "http://localhost:4000/products" )
                setProducts(response.data)
            }catch(err){
                console.log(err)
            }
            
        }
        getProducts()
    },[categorie])
    useEffect(()=>{
            categorie &&
             setFilteredProducts(
                products.filter((item)=>
                     Object.entries(filters).every(([key,value])=>
                item[key].includes(value)
                )
            )
        )
    },[products,categorie,filters])
    
    useEffect(()=>{
        if (sort === "newest"){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>a.createdAt - b.createdAt)
                
                )
        }else if (sort === "asc"){
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>a.price - b.price)
                
                )
        }else{
            setFilteredProducts((prev)=>
                [...prev].sort((a,b)=>b.price - a.price)
                
                )
        }
    },[sort])

    return (
        <Container>
            {categorie ? 
            filteredProducts.map((item)=> <Product item={item} key={item._id}/>)
            : products
            .slice(0,8)
            .map((item)=> <Product item={item} key={item._id}/>)
        }   

        </Container>
    )
}

export default Products
