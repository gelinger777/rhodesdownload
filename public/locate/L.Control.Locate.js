L.Control.Locate = L.Control.extend({
    options: {
        position: 'bottomleft',
        drawCircle: true,
        follow: false,  // follow with zoom and pan the user's location
        // range circle
        circleStyle: {
                color: '#136AEC',
                fillColor: '#136AEC',
                fillOpacity: 0.15,
                weight: 2,
                opacity: 0.5
            },
        // inner marker
        markerStyle: {
            color: '#136AEC',
            fillColor: '#2A93EE',
            fillOpacity: 0.7,
            weight: 2,
            opacity: 0.9,
            radius: 4
        },
        debug: false
    },

    onAdd: function (map) {
        var className = 'leaflet-control-locate',
            classNames = className + " leaflet-control",
            container = L.DomUtil.create('div', className);

        var self = this;
        var _map = map;
        this._layer = new L.LayerGroup();
        this._layer.addTo(_map);
        this._event = undefined;
        this._locateOptions = {
            'setView': false,
            'watch': true
        };
        this._locateOnNextLocationFound = true;
        this._atLocation = false;
        this._active = false;

        var wrapper = L.DomUtil.create('div', className + "-wrap", container);
        var link = L.DomUtil.create('a', className, wrapper);
        link.href = '#';
        link.title = 'Show me where I am';

        var _log = function(data) {
            if (self.options.debug) {
                console.log(data);
            }
        };

        
        
        var locateMeCheck=1;
        L.DomEvent
            .on(link, 'click', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.preventDefault)
            .on(link, 'click', function() {
              
            	
            	 if(locateMeCheck>0){
            	
            	locateMe();
            	
            	
            	
            	locateMeCheck=0;
            	 }
            	 else{
            		 
            		 
            		 delocateMe();
            		 locateMeCheck=1;
            	 }
          

            })
            .on(link, 'dblclick', function(){
            	
            	
            	
            	
            	alert("dabl clicked");
            }
            );

        var onLocationFound = function (e) {
            _log('onLocationFound');

            if (self._event &&
                (self._event.latlng.lat != e.latlng.lat ||
                 self._event.latlng.lon != e.latlng.lon)) {
                _log('location has changed');
                self._atLocation = false;
            }

            self._event = e;

            if (!self._active) {
                return;
            }

            if (self.options.follow) {
                self._locateOnNextLocationFound = true;
            }

            visualizeLocation();
        };

        var visualizeLocation = function() {
           locateMe();
            if (!self._container)
                return;
            self._container.className = classNames + " active";
        };

        var removeVisualization = function() {
            self._container.className = classNames;
            self._active = false;

       delocateMe();
        };

        var onLocationError = function (err) {
            _log('onLocationError');

            // ignore timeout error if the location is watched
            if (err.code==3 && this.options.locateOptions.watch) {
                return;
            }

            map.stopLocate();
            removeVisualization();
            alert(err.message);
        };

        map.on('movestart', function() {
            self._atLocation = false;
        });

        // event hooks
        map.on('locationfound', onLocationFound, self);
        map.on('locationerror', onLocationError, self);

        if (this.options.autoLocate) {
            map.locate(self._locateOptions);
        }

        return container;
    }
});

L.Map.addInitHook(function () {
    if (this.options.locateControl) {
        this.locateControl = L.control.locate();
        this.addControl(this.locateControl);
    }
});

L.control.locate = function (options) {
    return new L.Control.Locate(options);
};
