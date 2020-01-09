import React, {useState, useEffect} from 'react';
import axios from 'axios';

import imagen from './cryptomonedas.png';

import Formulario from './components/Formulario';
import Spinner from './components/Spinner';
import Cotizacion from './components/Cotizacion';


function App() {

  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const cotizarCriptomoneda = async () => {

      // Si no hay moneda no ejecutar
      if(moneda === '') return;

      let url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
      const resultado = await axios.get(url);

      // Mostrar spinner
      setCargando(true);

      // Ocultar spinner despues de 3s y agregar el resultado
      setTimeout(() => {
        setCargando(false);
        console.log(resultado.data.DISPLAY[criptomoneda][moneda]);
        setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }
    cotizarCriptomoneda();
  }, [moneda, criptomoneda]);

  // Mostrar spinner o resultado
  const componente = (cargando) ? <Spinner /> : <Cotizacion resultado={resultado} />;
  
  return (
    <div className="container">
        <div className="row">
            <div className="one-half column">
                <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
            </div>
            <div className="one-half column">
                <h1>Cotiza Criptomonedas al Instante</h1>
                <Formulario 
                  setMoneda={setMoneda}
                  setCriptomoneda={setCriptomoneda}
                />
                {componente}
            </div>
        </div>
    </div>
  );
}

export default App;
