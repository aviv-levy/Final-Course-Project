import { User } from "./Interfaces";

const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$')
// eslint-disable-next-line
const validPhone = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$")
// eslint-disable-next-line
const validImageUrl = new RegExp("^https?:\/\/.+\.(?:png|jpe?g)$")
const validPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;


export function isRegisterUserValid(user: User, setError: Function): boolean {
    const errArray: string[] = [];
    isTextValid(user.firstname) ? errArray[0] = 'First Name must have 2 or more letters' : errArray[0] = '';
    isTextValid(user.lastname) ? errArray[1] = 'Last Name must have 2 or more letters' : errArray[1] = '';
    isEmailValid(user.email) ? errArray[2] = 'Email is not valid' : errArray[2] = '';
    isPhoneValid(user.phone) ? errArray[3] = 'Phone is not valid' : errArray[3] = ''
    isPasswordValid(user.password) ? errArray[4] = 'Password is not valid' : errArray[4] = ''

    setError(errArray);

    if (errArray.find(err => err !== '') !== undefined)//Find if there is a validation error
        return false;

    return true;
}


export function isEmailValid(email: string): boolean {
    if (!validEmail.test(email))
        return true;

    return false;
}

export function isPasswordValid(password: string): boolean {
    if (!validPassword.test(password))
        return true;

    return false;
}

export function isPhoneValid(phone: string): boolean {
    if (!validPhone.test(phone))
        return true;

    return false;
}

export function isTextValid(text: string): boolean {
    if (!text || text.length < 2)
        return true;

    return false;
}

export function isImageValid(url: string): boolean {
    if (!validImageUrl.test(url))
        return true;

    return false;
}
export function isHouseNumberValid(houseNum: number): boolean {
    if (!houseNum || houseNum < 1)
        return true;

    return false;
}

export function isZipValid(zip: number): boolean {
    if (zip.toString().length !== 7)
        return true;

    return false;
}