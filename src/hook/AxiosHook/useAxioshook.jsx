import axios from "axios";

const axiosHook = axios.create({
    baseURL:"http://localhost:9000/api",
});
function useAxioshook(){
    return axiosHook
}
export default useAxioshook