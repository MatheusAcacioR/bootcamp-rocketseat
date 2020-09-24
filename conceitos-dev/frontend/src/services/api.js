// importando o axios
import axios from 'axios';

// instanciando o axios e chamando o endereço de origem do backend
const api = axios.create({
    baseURL: 'http://localhost:3333'
});

// exportando o axios
export default api;