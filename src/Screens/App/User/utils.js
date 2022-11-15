import { formatDate, getDate, getDayOnly } from "../../../Config";

export const calcDayCalories = (allMeals) => {

    let map = {}
    let val = '';

    for (let i = 0; i < allMeals.length; i++) {

        val = getDate(allMeals[i].date).toString()

        if (val in map) map[val] += Number(allMeals[i].calories)
        else map[val] = Number(allMeals[i].calories)
    }

    return map;
}

export const filterByDate = (allMeals, minDate, maxDate) => {
    let newArr = []
    minDate = minDate ? minDate : new Date(-8640000000000000)

    for (let i = 0; i < allMeals.length; i++) {

        val = formatDate(allMeals[i].date)
        if (val <= maxDate && val >= minDate) newArr.push(allMeals[i])
    }

    return newArr;
}