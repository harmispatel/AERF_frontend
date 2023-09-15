export default function Authentication() {
    const auth = localStorage.getItem('accessToken')
    if(auth) {
        return true;
    } 
    return false;
}