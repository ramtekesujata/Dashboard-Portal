import axios from "axios";
import { LOGIN_URL, REGISTER_URL} from "../urls";

export const doSignIn = (signinData : any) => {
    // console.log(signinData)
    return fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(signinData)
    })
    .then(res => {
        // console.log(res);
        return res.json();
    })
    .catch(err => console.log(err))
}

// Register API Method
export const doSignUp = (signupData : any) => {
    // console.log(signupData)
    return fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify(signupData)
    })
    .then(res => {
        // console.log(res);
        return res.json();
    })
    .catch(err => console.log(err))
}

export const Rapid_fetcher = (url:string,method?:string,args?:any) => {
  if(method==="POST")
  {
    let formData = new FormData();
    Object.keys(args).forEach(key => {
      formData.append(String(key), String(args[key]));
    })
    return axios.post(
      url,
      formData,
      {
        headers: {
            "Authorization": "Token " + localStorage.getItem("Token"),
            "Content-type": "multipart/form-data",
        },                    
      }
      )
      .then((res:any) => {
        // console.log(`Success of query response`, res.data);
          let finalData : any =  Object.keys(res.data).map((key) => res.data[key])
          return JSON.parse(finalData)
          // return res.data;
      })
      .catch((err:any) => console.log(err))
  }
  else
  {
    return fetch(`${url}`, {
          method: "GET",
          headers: {
              Authorization: "Token " + localStorage.getItem("Token"),
              'Content-Type':'application/json'
          }
      })
      .then(res => {
          return res.json();
      })
      .catch(err => console.log(err))
  }
}

export const getData = (url:string,setter:Function,method?:string,args?:any) => {
  if(method==="POST")
  {
    Rapid_fetcher(url,method,args)
      .then((res:any) => {
        res.message ? console.log(res.message) : setter(res)
      })
      .catch((err:any) => {
        setter(undefined)
        // console.log('Event Graph Error: ', err)
      })
  }
  else
  {
    Rapid_fetcher(url)
      .then((res:any) => {
        res.message ? console.log(res.message) : setter(res)
      })
      .catch((err:any) => {
        setter(undefined)
        // console.log('Event Graph Error: ', err)
      })
  }
  }