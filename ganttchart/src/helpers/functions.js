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