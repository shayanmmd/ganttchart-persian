export function calculateProgress(totalStartDate, totalEndDate, totalProgress, selectedStartDate, selectedEndDate) {

    const totalStartMs = totalStartDate.valueOf();
    const totalEndMs = totalEndDate.valueOf();
    const selectedStartMs = selectedStartDate.valueOf();
    const selectedEndMs = selectedEndDate.valueOf();

    const totalMs = totalEndMs - totalStartMs;

    // const overlapStartMs = Math.max(totalStartMs, selectedStartMs);
    // const overlapEndMs = Math.min(totalEndMs, selectedEndMs);

    const progressMs = ((totalProgress / 100) * totalMs) + totalStartMs;

    // const overlapMs = Math.max(0, overlapEndMs - overlapStartMs);

    // const overlapPercentageOfTotal = (overlapMs / totalMs) * 100;


    if (selectedStartMs < totalStartMs && selectedEndMs > totalEndMs) {
        return totalProgress;
    }

    if (selectedStartMs > progressMs) {
        return 0;
    }

    if (selectedEndMs > progressMs) {
        console.log('hi');

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