const fetchHikingRoutes = async (
	position: google.maps.LatLng | google.maps.LatLngLiteral,
) => {
	const url = "http://overpass-api.de/api/interpreter";
	const body = `
  [out:json];
  (way["highway"="footway"](around:1000,${position.lat},${position.lng});
   way["highway"="path"](around:1000,${position.lat},${position.lng});
   way["leisure"="trail"](around:1000,${position.lat},${position.lng}););
  out body;
  >;
`;

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `data=${encodeURIComponent(body)}`,
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}
		const json = await response.json();
		return json;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(String(error));
		}
		return null;
	}
};

export { fetchHikingRoutes };
