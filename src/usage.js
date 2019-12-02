/**
 * Function for listening for getting the current electric bill information from a response
 * 
 * @param { EventEmitter } page 
 * @return { Promise<Object> }
 */
const getCurrentUsage = (page) => new Promise((resolve, reject) => {
    /**
     * Function for handling the response events.
     * 
     * Normally, I wouldn't put a function in another function
     * However I needed a way to remove the 'response' listener and handler from
     * The page - and I am too tired to figure out a better way :shrug:
     * 
     * @async
     * @param { object } response 
     * @return { void }
     */
    const responseHandler = async (response) => {
        if(response.url().includes('EnergyTracker') && response.status() == 200) {
            // Stop listening for data
            page.removeListener('response', responseHandler);
            const info = await response.json();
            if(Object.keys(info).length > 0) {
                const details = info.Details;
                return resolve({
                    currentUsage: details.BillToDateAmount,
                    currentCycleDay: details.BillingCycleDay,
                    numberOfBillingDays: details.NumberOfBillingDays,
                    projectedAmount: details.ProjectedAmount,
                    maxProjectedAmount: details.MaxProjectedAmount
                });
            }
            return reject(new Error('Did not find any data in the response'));
        };
    }
    // Listen for responses
    page.on('response', responseHandler);
});

module.exports = {
    getCurrentUsage
}