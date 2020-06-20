import React from 'react'
import ProductCard from '../Components/ProductCard';

const ShoeContainer = props => {

    const renderShoe = () => {
        const id = parseInt(props.match.params.id, 0)
        return <ProductCard category='shoes' id={id}/>
    }

    return (
        <div>
            {renderShoe()}
        </div>
    )
}

export default ShoeContainer