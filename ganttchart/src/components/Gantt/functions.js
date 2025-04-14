
export function sortArrayByStartDate(array) {

    const sortedArray = [...array].sort((a, b) => {

        const dateA = a.startDate.valueOf();
        const dateB = b.startDate.valueOf();

        return dateA - dateB;
    });

    return sortedArray;
}

export function sortArrayByEndDate(array) {

    const sortedArray = [...array].sort((a, b) => {

        const dateA = a.endDate.valueOf();
        const dateB = b.endDate.valueOf();

        return dateB - dateA;
    });

    return sortedArray;
}