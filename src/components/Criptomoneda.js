import React from 'react';

const Cristomoneda = ({criptomoneda}) => {
    
    const {Name, FullName} = criptomoneda.CoinInfo;

    return ( 
        <option value={Name}>{FullName} </option>
     );
}
 
export default Cristomoneda;