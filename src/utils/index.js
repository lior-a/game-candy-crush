
/**
 * 
 * @returns string - string of date dd/mm/yyyy hh:mm
 */
export const getDateString = () => {
    const gameStartDate = new Date();
    const date = `${gameStartDate.getDate()}/${gameStartDate.getMonth()+1}/${gameStartDate.getFullYear()} ${gameStartDate.getHours()}:${gameStartDate.getMinutes()}`;
    return date;
}

export const debounce = (fnc, delay) => {
    let time;

    return function toBeExecuted(...args) {
        const later = () => {
            clearTimeout(time);
            fnc(...args);
        };

        clearTimeout(time);
        time = setTimeout(later, delay);
    };
};