import { Alert } from "react-native";

export const validateName = (name: string): boolean => {
    if (!name || name.length < 2) return false;
    return true;
}

export const validateEmail = (email: string): boolean => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return false;
    }
    return true;
}

export const validatePassword = (password: string): boolean => {
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (!password || !password.length || !password.match(passw)) {
        return false
    }
    return true
}

export const validateEmailPassword = (email: string, password: string) => {
    if (!validateEmail(email)) {
        Alert.alert("Please provide a valid email address")
        return false
    }

    if (!validatePassword(password)) {
        Alert.alert("Please provide a valid password")
        return false
    }

    return true
}

export const validateMealDetails = (title: string, calories: string) => {
    if (!validateName(title)) {
        Alert.alert("Please enter a valid meal name")

        return false
    }

    if (isNaN(Number(calories)) || Number(calories) < 0) {
        Alert.alert("Please enter a valid number for your calorie count")

        return false
    }

    return true
}


export const formatDate = (date: any) => {
    return date.toDate()
}

export const getDate = (date: Date) => {
    date = formatDate(date)

    function padTo2Digits(num: number) {
        return num.toString().padStart(2, '0');
    }

    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
    ].join('-');
}


export const getDayOnly = (date: Date) => {
    let month = date.getUTCMonth() + 1; //months from 1-12
    let day = date.getUTCDate();
    let year = date.getUTCFullYear();

    return year + "-" + month + "-" + day;
}