export const validateEP=(email,password)=>
{
  const emailIsValid=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
  const passwordIsValid=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)
  if(!passwordIsValid)
    return "Password is not Valid";
if(!emailIsValid)
    return "Email is not Valid";
return null;


}