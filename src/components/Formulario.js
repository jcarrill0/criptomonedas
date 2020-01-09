import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Criptomoneda from './Criptomoneda';
import Error from './Error';


const Formulario = ({setMoneda, setCriptomoneda}) => {

    const [criptomonedas, guardarCriptomonedas] = useState([]);
    const [monedaCotizar, setMonedaCotizar] = useState('');
    const [criptoCotizar, setCriptoCotizar] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            // Agregar respuesta en el state
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarAPI();

    }, []);


    // Validar que el usuario llene ambos campos 
    const cotizarMoneda = e => {
        e.preventDefault();

        // Validar que los datos este llenos 
        if(monedaCotizar === '' || criptoCotizar === '') {
            setError(true);
            return;  
        }

        // Pasar al componente principal
        setError(false);
        setMoneda(monedaCotizar);
        setCriptomoneda(criptoCotizar);

    }

    // Mostrar el Error (componente condicional)

    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios"/> : null;

    return ( 
        <form 
            onSubmit={cotizarMoneda}
        >
            {componente} 
            <div className="row">
                <label htmlFor="">Elige tu Moneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setMonedaCotizar(e.target.value)}
                >
                    <option value="">- Elige tu moneda -</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXM">Peso Mexicano</option>
                    <option value="GBO">Libras</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>
            <div className="row">
                <label htmlFor="">Elige tu Criptomoneda</label>
                <select
                    className="u-full-width"
                    onChange={e => setCriptoCotizar(e.target.value)}
                >
                    <option value="">Elige tu Criptomoneda</option>
                    { criptomonedas.map(criptomoneda => (
                        <Criptomoneda 
                            key={criptomoneda.CoinInfo.Id}
                            criptomoneda={criptomoneda}
                        />
                    ))}
                </select>
            </div>
            <input type="submit" className="button-primary u-full-width" value="Calcular" />
        </form>
     );
}
 
export default Formulario;