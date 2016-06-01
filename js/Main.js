		  var map;
		  var geojsonlayer;
		  
		function init() {
      	 map= L.map('map');
      	  
      	 //add a tile layer to add to our map, in this case it's the 'standard' OpenStreetMap.org tile 
      	 L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
            maxZoom: 18
         }).addTo(map);

         map.attributionControl.setPrefix(''); // Don't show the 'Powered by Leaflet' text. Attribution 
         var garissa = new L.LatLng(0.10, 40.3); // geographical point (longitude and latitude)
         map.setView(garissa, 13);
		  // add waterpans geojson
		
		 $.ajax({
            type: "POST",
            url: 'water_pans.geojson',
            dataType: 'json',
            success: function (response) {
                    geojsonLayer = L.geoJson(response)
			
			   L.geoJson(response, {
			        onEachFeature: onEachFeature,
					pointToLayer: function (feature,latlng) { 
					              switch (feature.properties.Remarks_St) {
                                      case 'Ditto': return new L.CircleMarker(latlng, {
                                             radius: 5,
                                             fillColor: "#ff0000",
                                             color: "#00ff00",
                                             weight: 1,
                                             opacity: 1,
                                             fillOpacity: 0.4
                                                            });
									 case null: return new L.CircleMarker(latlng, {
                                             radius: 5,
                                             fillColor: "#ff0000",
                                             color: "#00ff00",
                                             weight: 1,
                                             opacity: 1,
                                             fillOpacity: 0.4
                                                            });
													
                                     default: 
                                       return new L.CircleMarker(latlng, {
                                             radius: 5,
                                             fillColor: "#0000ff",
                                             color: "#000",
                                             weight: 1,
                                             opacity: 1,
                                             fillOpacity: 0.4
                                                            });

							
                                   }
                          
                   }
					
               }).addTo(map);
             map.fitBounds(geojsonLayer.getBounds());
    }
});
	
	//add boreholes
		 $.ajax({
            type: "POST",
            url: 'boreholes.geojson',
            dataType: 'json',
            success: function (response) {
                    geojsonLayer = L.geoJson(response)
			
			   L.geoJson(response, {
			        onEachFeature: onEachFeature2,
					pointToLayer: function (feature,latlng) { 
					              switch (feature.properties.Status) {
                                      case 'Operational': return new L.CircleMarker(latlng, {
                                             radius: 7,
                                             fillColor: "#0000ff",
                                             color: "#00ff00",
                                             weight: 1,
                                             opacity: 1,
                                             fillOpacity: 0.7
                                                            });
									 													
                                     default: 
                                       return new L.CircleMarker(latlng, {
                                             radius: 7,
                                             fillColor: "#808080",
                                             color: "#808080",
                                             weight: 1,
                                             opacity: 1,
                                             fillOpacity: 0.7
                                                            });

							
                                   }
                          
                   }
					
               }).addTo(map);
             map.fitBounds(geojsonLayer.getBounds());
    }
});

	
 }
	  
	  
	  
	  
	  function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
       if (feature.properties && feature.properties.Ward) {
        layer.bindPopup("<p><strong>Type:</strong>Water Pan<br\><strong>Project Name :</strong>"+feature.properties.Project_Na +"<br\><strong>Ward :</strong>"+feature.properties.Ward+"<br\><strong>Remarks :</strong>"+feature.properties.Remarks_St+"</p>");
		
		
    }
}

function onEachFeature2(feature, layer) {
    // does this feature have a property named popupContent?
       if (feature.properties && feature.properties.Ward) {
        layer.bindPopup("<p> <strong>Type:</strong>Borehole<br\><strong>Project Name :</strong>"+feature.properties.Project_Na +"<br\><strong>Ward :</strong>"+feature.properties.Ward+"<br\><strong>Remarks :</strong>"
		+feature.properties.Status+"<br\><strong>Population :</strong>"+feature.properties.Population+
		"<br\><strong>Contact Person :</strong>"+feature.properties.WUA_Commit+
		"</p>");
		
		
    }
}
