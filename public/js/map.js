mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style : 'mapbox://styles/mapbox/streets-v12',  //Style URL
        center: [78.4772, 17.4065], // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
