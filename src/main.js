//Axios
import axios from 'axios';

class Api {
    static async getUserInfo(username){
        try {
        const response = await axios.get(`https://api.github.com/users/${username}`);
        }catch(err){
            console.warn('Erro na API');
        } 
        console.log(response);
    }
}

Api.getUserInfo('Werner12f01');