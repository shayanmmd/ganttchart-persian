import { numbersConversion } from './constats'

export function calculateProgress(totalStartDate, totalEndDate, totalProgress, selectedStartDate, selectedEndDate) {

    const totalStartMs = totalStartDate.valueOf();
    const totalEndMs = totalEndDate.valueOf();
    const selectedStartMs = selectedStartDate.valueOf();
    const selectedEndMs = selectedEndDate.valueOf();

    const totalMs = totalEndMs - totalStartMs;

    const progressMs = ((totalProgress / 100) * totalMs) + totalStartMs;

    if (selectedStartMs < totalStartMs && selectedEndMs > totalEndMs) {
        return totalProgress;
    }

    if (selectedStartMs > progressMs) {
        return 0;
    }

    if (selectedEndMs > progressMs) {
        const progressInSelectedAreaMs = progressMs - selectedStartMs;

        let totalSelectedMs;

        if (selectedEndMs > totalEndMs)
            totalSelectedMs = totalEndMs - selectedStartMs;
        else
            totalSelectedMs = selectedEndMs - selectedStartMs;

        return (progressInSelectedAreaMs / totalSelectedMs) * 100;

    }

    if (selectedEndMs < progressMs) {
        return 100;
    }
}

export function convertToEnglishDateNumbers(text) {
    let result = '';
    for (const alphabet of text) {
        if (alphabet === '/') {
            result += '/';
            continue;
        }
        result += numbersConversion[alphabet];
    }
    return result;;
}

export function calculatePosition(startDate, endDate, bigDuration, estimatedStartDate, estimatedEndDate) {
    const msDay = 24 * 60 * 60 * 1000;

    if (bigDuration == null)
        return null;

    let right;
    let left;

    if (estimatedStartDate > startDate && estimatedStartDate < endDate) {
        right = Math.floor((((estimatedStartDate - startDate) / msDay) / (bigDuration)) * 100) + '%';
    } else if (estimatedStartDate < startDate) {
        right = '0%';
    }
    else {
        return null;
    }

    if (estimatedEndDate < endDate && estimatedEndDate > startDate) {
        left = Math.floor((((endDate - estimatedEndDate) / msDay) / (bigDuration)) * 100) + '%';
    } else if (estimatedEndDate > endDate) {
        left = '0%';
    }
    else {
        return null;
    }

    return [right, left];
}