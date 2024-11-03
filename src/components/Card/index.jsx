import { useEffect, useState } from "react";
import CardFooter from "../CardFooter";
import CardHeader from "../CardHeader";
import Product from "../Product";
import data from "../../data";

const Card = () => {
    const [card, setCard] = useState(data);

    const [total, setTotal] = useState({
        price: card.reduce((prev, curr) => {
            return prev + curr.priceTotal
        }, 0), 
        count: card.reduce((prev, curr) => {
            return prev + curr.count
        }, 0)
    })

    useEffect(() => {
        setTotal({
            price: card.reduce((prev, curr) => {
                return prev + curr.priceTotal
            }, 0), 
            count: card.reduce((prev, curr) => {
                return prev + curr.count
            }, 0)
        })
    }, [card])

    const deleteProduct = (id) => {
        setCard((card) => {
            return card.filter((product) => {
                return id !== product.id
            })
        });
    }

    const increase = (id) => {
        setCard((card) => {
            return card.map((product) => {
                if(product.id === id) {
                    return {
                        ...product,
                        count: ++product.count,
                        priceTotal: product.count * product.price
                    };
                }
                return product
            })
        })
    }

    const decrease = (id) => {
        setCard((card) => {
            return card.map((product) => {
                if(product.id === id) {
                    
                    const newCount = product.count - 1 > 1 ? --product.count : 1

                    return {
                        ...product,
                        count: newCount,
                        priceTotal: newCount * product.price
                    };
                }
                return product
            })
        })
    }

    const changeValue = (id, value) => {
        setCard((card) => {
            return card.map((product) => {
                if(product.id === id) {
                    return {
                        ...product,
                        count: value,
                        priceTotal: value * product.price
                    }
                }
                return product
            })
        })
    }

    const products = card.map((product) => {
        return <Product product = {product} 
        key={product.id} 
        deleteProduct = {deleteProduct} 
        increase={increase} 
        decrease={decrease}
        changeValue={changeValue}
        />
    })

    return (             
    <section className="cart">

        <CardHeader />

        {products}

        <CardFooter total={total}/>

    </section> 
    );
}
 
export default Card;