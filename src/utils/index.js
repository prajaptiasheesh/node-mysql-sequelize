const isUserLoggedIn = ()=>{
    let user = localStorage.getItem("user");
    return !user ? false : true;
}

const parseJson = (json)=>{
    try{
        let result = JSON.parse(json);
        return result; 
    }catch(err){
        return false;
    }
}

export {
    isUserLoggedIn,
    parseJson
}