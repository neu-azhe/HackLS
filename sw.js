'use strict';

let response;

self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("fetch", async (e) => {
	console.log(e.request.url);
	let url = new URL(e.request.url);
	let urlParams = new URLSearchParams(url.search);
	let size = urlParams.get("size");
	let body = "A".repeat(Number(size));

	if (e.request.headers.get("range") === "bytes=0-") {
		e.respondWith(new Response(body, {status: 206, headers: {
			"Content-Type": "audio/mp4",
			"Content-Range": "bytes 0-1/13337"
		}}));
	} else if (e.request.headers.get("range") === `bytes=${Number(size)}-`) {
		response = await fetch(e.request);
	} else if (e.request.url.includes("/mock.css")) {
		e.respondWith(response.clone());
	}
});