import axios from 'axios';

const api = axios.create(
    {
        baseURL: 'http://localhost:1234'
    });

class DevRequisition
{
    constructor(){}

    async saveDev(dev,git_user) 
    {
       const response = await api.post(`/devs/${git_user}`,dev);
       console.log(response);
       return response;
    }
    async listDev() 
    {
       return await api.get(`/devs/`);
    }

}

export default DevRequisition;