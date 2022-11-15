import { formatDate } from '../../../Config'
import { UserMeals } from '../../../Redux/Actions/Firebase/DB'

export const getAllMeals = async (allUsers) => {
    let val, arr = []
    for (let i = 0; i < allUsers.length; i++) {
        val = await UserMeals(allUsers[i].userId)
        arr = [...arr, ...val]
    }
    let counters = await getNumberOfEntries(arr)
    return counters
}

const getNumberOfEntries = async (arr) => {
    //To calculate number of entries in the last week and the week before that, and the avergae num of calories per user
    let map = {}, user;
    //get date of last week
    let lastWeek = weekDec(-7)
    //get date of week before
    let weekBefore = weekDec(-14)
    let lastCounter = 0, beforeCounter = 0, val

    for (let i = 0; i < arr.length; i++) {
        val = formatDate(arr[i].date)
        val.setDate(val.getDate() + 1)
        val.setHours(-22, 0, 0, 0)

        //To filter dates before the week before this week
        if (val > weekBefore) {
            if (val > lastWeek) {
                user = arr[i].userId
                //Calculate the number of calories to get the average
                if (user in map) {
                    let newArr = [map[user][0] + 1, map[user][1] += arr[i].calories]
                    map[user] = newArr
                } else map[user] = [1, arr[i].calories]

                lastCounter++
            }
            else beforeCounter++
        }
    }

    return [lastCounter, beforeCounter, map]
}

const weekDec = (num) => {
    //returns a date decremented by a number
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + num)
    nextweek.setHours(-22, 0, 0, 0)
    return nextweek;
}