export function isFreeTrialExpired(userRegistrationDate) {
    const currentDate = new Date();
    const differenceInMs = currentDate - userRegistrationDate;
    // Convert 48 hours to milliseconds
    const hours48InMs = 48 * 60 * 60 * 1000;
    return differenceInMs >= hours48InMs
}