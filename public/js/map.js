mapboxgl.accessToken = mapToken;

    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style : 'mapbox://styles/mapbox/streets-v12',  //Style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });

        const marker1 = new mapboxgl.Marker({color:'red'})
        .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
        .setPopup(new mapboxgl.Popup({offset: 20})
        .setHTML(
            `<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`
        ))
        .addTo(map);
        
    // map.on('load', () => {
    //     // Load an image from an external URL.
    //     map.loadImage(
    //         '<i class="fa-regular fa-compass"></i>',
    //         (error, image) => {
    //             if (error) throw error;

    //             // Add the image to the map style.
    //             map.addImage('cat', image);

    //             // Add a data source containing one point feature.
    //             map.addSource('point', {
    //                 'type': 'geojson',
    //                 'data': {
    //                     'type': 'FeatureCollection',
    //                     'features': [
    //                         {
    //                             'type': 'Feature',
    //                             'geometry': {
    //                                 'type': 'Point',
    //                                 'coordinates': listing.geometry.coordinates
    //                             }
    //                         }
    //                     ]
    //                 }
    //             });

    //             // Add a layer to use the image to represent the data.
    //             map.addLayer({
    //                 'id': 'points',
    //                 'type': 'symbol',
    //                 'source': 'point', // reference the data source
    //                 'layout': {
    //                     'icon-image': 'cat', // reference the image
    //                     'icon-size': 0.25
    //                 }
    //             })
    //         }
    //     );
    // });

