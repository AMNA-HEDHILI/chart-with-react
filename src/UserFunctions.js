import axios from 'axios';

const USER_API_BASE_URL = "http://localhost";

class UserFunctions {

    
    get_dash1(){
        return axios
        .get(USER_API_BASE_URL + '/dash1' )
        .catch(err => {
            
            alert("please repeat ! ");
            console.log(err)
        
        })
    }

    get_Gender(){
        return axios
        .get(USER_API_BASE_URL + '/piechartG' )
        .catch(err => {
            
            alert("please repeat ! ");
            console.log(err)
        
        })
    }
    get_Product_Line(){
        return axios
        .get(USER_API_BASE_URL + '/piechartP' )
        .catch(err => {
            
            alert("please repeat ! ");
            console.log(err)
        
        })
    }
}
export default new UserFunctions()