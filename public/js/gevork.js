function bytesToSize(bytes, precision)
{  
    var kilobyte = 1024;
    var megabyte = kilobyte * 1024;
    var gigabyte = megabyte * 1024;
    var terabyte = gigabyte * 1024;
   
    if ((bytes >= 0) && (bytes < kilobyte)) {
        return bytes + ' B';
 
    } else if ((bytes >= kilobyte) && (bytes < megabyte)) {
        return (bytes / kilobyte).toFixed(precision) + ' KB';
 
    } else if ((bytes >= megabyte) && (bytes < gigabyte)) {
        return (bytes / megabyte).toFixed(precision) + ' MB';
 
    } else if ((bytes >= gigabyte) && (bytes < terabyte)) {
        return (bytes / gigabyte).toFixed(precision) + ' GB';
 
    } else if (bytes >= terabyte) {
        return (bytes / terabyte).toFixed(precision) + ' TB';
 
    } else {
        return bytes + ' B';
    }
}





function get_html_translation_table (table, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: Philip Peterson
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: noname
    // +   bugfixed by: Alex
    // +   bugfixed by: Marco
    // +   bugfixed by: madipta
    // +   improved by: KELAN
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Frank Forte
    // +   bugfixed by: T.Wild
    // +      input by: Ratheous
    // %          note: It has been decided that we're not going to add global
    // %          note: dependencies to php.js, meaning the constants are not
    // %          note: real constants, but strings instead. Integers are also supported if someone
    // %          note: chooses to create the constants themselves.
    // *     example 1: get_html_translation_table('HTML_SPECIALCHARS');
    // *     returns 1: {'"': '&quot;', '&': '&amp;', '<': '&lt;', '>': '&gt;'}
    var entities = {},
        hash_map = {},
        decimal;
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return hash_map;
}

function utf8_decode (str_data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Norman "zEh" Fuchs
    // +   bugfixed by: hitwork
    // +   bugfixed by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // *     example 1: utf8_decode('Kevin van Zonneveld');
    // *     returns 1: 'Kevin van Zonneveld'
    var tmp_arr = [],
        i = 0,
        ac = 0,
        c1 = 0,
        c2 = 0,
        c3 = 0;

    str_data += '';

    while (i < str_data.length) {
        c1 = str_data.charCodeAt(i);
        if (c1 < 128) {
            tmp_arr[ac++] = String.fromCharCode(c1);
            i++;
        } else if (c1 > 191 && c1 < 224) {
            c2 = str_data.charCodeAt(i + 1);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
            i += 2;
        } else {
            c2 = str_data.charCodeAt(i + 1);
            c3 = str_data.charCodeAt(i + 2);
            tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }

    return tmp_arr.join('');
}
function htmlentities (string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: nobbler
    // +    tweaked by: Jack
    // +   bugfixed by: Onno Marsman
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +   improved by: Rafał Kukawski (http://blog.kukawski.pl)
    // +   improved by: Dj (http://phpjs.org/functions/htmlentities:425#comment_134018)
    // -    depends on: get_html_translation_table
    // *     example 1: htmlentities('Kevin & van Zonneveld');
    // *     returns 1: 'Kevin &amp; van Zonneveld'
    // *     example 2: htmlentities("foo'bar","ENT_QUOTES");
    // *     returns 2: 'foo&#039;bar'
    var hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style),
        symbol = '';
    string = string == null ? '' : string + '';

    if (!hash_map) {
        return false;
    }
    
    if (quote_style && quote_style === 'ENT_QUOTES') {
        hash_map["'"] = '&#039;';
    }
    
    if (!!double_encode || double_encode == null) {
        for (symbol in hash_map) {
            if (hash_map.hasOwnProperty(symbol)) {
                string = string.split(symbol).join(hash_map[symbol]);
            }
        }
    } else {
        string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function (ignore, text, entity) {
            for (symbol in hash_map) {
                if (hash_map.hasOwnProperty(symbol)) {
                    text = text.split(symbol).join(hash_map[symbol]);
                }
            }
            
            return text + entity;
        });
    }

    return string;
}
function html_entity_decode (string, quote_style) {
    // http://kevin.vanzonneveld.net
    // +   original by: john (http://www.jd-tech.net)
    // +      input by: ger
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   improved by: marc andreu
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Ratheous
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Nick Kolosov (http://sammy.ru)
    // +   bugfixed by: Fox
    // -    depends on: get_html_translation_table
    // *     example 1: html_entity_decode('Kevin &amp; van Zonneveld');
    // *     returns 1: 'Kevin & van Zonneveld'
    // *     example 2: html_entity_decode('&amp;lt;');
    // *     returns 2: '&lt;'
    var hash_map = {},
        symbol = '',
        tmp_str = '',
        entity = '';
    tmp_str = string.toString();

    if (false === (hash_map = this.get_html_translation_table('HTML_ENTITIES', quote_style))) {
        return false;
    }

    // fix &amp; problem
    // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
    delete(hash_map['&']);
    hash_map['&'] = '&amp;';

    for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
    }
    tmp_str = tmp_str.split('&#039;').join("'");

    return tmp_str;
}



function base64_encode (data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Bayron Guevara
    // +   improved by: Thunder.m
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Rafał Kukawski (http://kukawski.pl)
    // -    depends on: utf8_encode
    // *     example 1: base64_encode('Kevin van Zonneveld');
    // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['atob'] == 'function') {
    //    return atob(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        enc = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data = this.utf8_encode(data + '');

    do { // pack three octets into four hexets
        o1 = data.charCodeAt(i++);
        o2 = data.charCodeAt(i++);
        o3 = data.charCodeAt(i++);

        bits = o1 << 16 | o2 << 8 | o3;

        h1 = bits >> 18 & 0x3f;
        h2 = bits >> 12 & 0x3f;
        h3 = bits >> 6 & 0x3f;
        h4 = bits & 0x3f;

        // use hexets to index into b64, and append result to encoded string
        tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
    } while (i < data.length);

    enc = tmp_arr.join('');
    
    var r = data.length % 3;
    
    return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);

}
function base64_decode (data) {
    // http://kevin.vanzonneveld.net
    // +   original by: Tyler Akins (http://rumkin.com)
    // +   improved by: Thunder.m
    // +      input by: Aman Gupta
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +   bugfixed by: Pellentesque Malesuada
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // -    depends on: utf8_decode
    // *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
    // *     returns 1: 'Kevin van Zonneveld'
    // mozilla has this native
    // - but breaks in 2.0.0.12!
    //if (typeof this.window['btoa'] == 'function') {
    //    return btoa(data);
    //}
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
        ac = 0,
        dec = "",
        tmp_arr = [];

    if (!data) {
        return data;
    }

    data += '';

    do { // unpack four hexets into three octets using index points in b64
        h1 = b64.indexOf(data.charAt(i++));
        h2 = b64.indexOf(data.charAt(i++));
        h3 = b64.indexOf(data.charAt(i++));
        h4 = b64.indexOf(data.charAt(i++));

        bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

        o1 = bits >> 16 & 0xff;
        o2 = bits >> 8 & 0xff;
        o3 = bits & 0xff;

        if (h3 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1);
        } else if (h4 == 64) {
            tmp_arr[ac++] = String.fromCharCode(o1, o2);
        } else {
            tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
        }
    } while (i < data.length);

    dec = tmp_arr.join('');
    dec = this.utf8_decode(dec);

    return dec;
}

function updateLocation(lat,lon,radius){
    
    var greenIcon = L.icon({
  	    iconUrl: '/public/leaflet/images/locate_icon.png',
  	    shadowUrl: null,

  	    iconSize:     [24, 24], // size of the icon
  	    shadowSize:   null, // size of the shadow
  	    iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
  	    shadowAnchor: null,  // the same for the shadow
  	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  	});                     
                 if(markerSet<1){
                	 
                
     zoomNow=15;
                    
                              location2 = new L.LatLng(lat,lon); // geographical point (longitude and latitude)
                           
                              
                              
                              
                              
                              
                              
                              
                              
                             // ,,,
                              
//                              var p1 = new L.Point(43.477, 41.336),
//							    p2 = new L.Point(44.512,41.927),
//							    myBbox = new L.Bounds(p1, p2);
//                              
//                              
//                              
//                              
//                              
//                              if(myBbox.contains(location2)!=true){
//                            	  
//                            	  
//                            	  
//                            	  
//                            	  alert("MHM..You are outside of our expected map area. ");
//                              }
//                              
                              
                              
                              map.setView(location2, zoomNow);
                             
                                                                
                                         marker = new L.Marker(location2,{icon:greenIcon});
                                               map.addLayer(marker);
                                              
                                     
                                       circle = new L.Circle(location2, radius);
                                               map.addLayer(circle); 
                  markerSet=1; 
                  
                  
                 }        
                 else if(markerSet>0){
           
                	 map.removeLayer(marker);
                
                  zoomNow=map.getZoom()
                      lat=lat+0.0003;
                              location2 = new L.LatLng(lat,lon); // geographical point (longitude and latitude)
                             map.setView(location2, zoomNow);
                                                                  
                                                    
                                                                
                            
                                                             
                                      marker = new L.Marker(location2,{icon:greenIcon});
                                        
                                              marker.addTo(map);
                                              
                                     map.removeLayer(circle);
                                           circle = new L.Circle(location2, radius);
                                              
                       
                                           
                                          circle.addTo(map); 
                                               
                                          
                                       
                                             
                 
                 }                   
                 get_pois();              
                
                                       }
    function show_gps_error(){
$("#locate").hide();
                                                  
                                                  $("#stopLocateMe").show();
               $("#gpsError").show();
            
            
            }
                                       
   

function str_replace (search, replace, subject, count) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Gabriel Paderni
    // +   improved by: Philip Peterson
    // +   improved by: Simon Willison (http://simonwillison.net)
    // +    revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // +   bugfixed by: Anton Ongson
    // +      input by: Onno Marsman
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    tweaked by: Onno Marsman
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   input by: Oleg Eremeev
    // +   improved by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Oleg Eremeev
    // %          note 1: The count parameter must be passed as a string in order
    // %          note 1:  to find a global variable in which the result will be given
    // *     example 1: str_replace(' ', '.', 'Kevin van Zonneveld');
    // *     returns 1: 'Kevin.van.Zonneveld'
    // *     example 2: str_replace(['{name}', 'l'], ['hello', 'm'], '{name}, lars');
    // *     returns 2: 'hemmo, mars'
    var i = 0,
        j = 0,
        temp = '',
        repl = '',
        sl = 0,
        fl = 0,
        f = [].concat(search),
        r = [].concat(replace),
        s = subject,
        ra = Object.prototype.toString.call(r) === '[object Array]',
        sa = Object.prototype.toString.call(s) === '[object Array]';
    s = [].concat(s);
    if (count) {
        this.window[count] = 0;
    }

    for (i = 0, sl = s.length; i < sl; i++) {
        if (s[i] === '') {
            continue;
        }
        for (j = 0, fl = f.length; j < fl; j++) {
            temp = s[i] + '';
            repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
            s[i] = (temp).split(f[j]).join(repl);
            if (count && s[i] !== temp) {
                this.window[count] += (temp.length - s[i].length) / f[j].length;
            }
        }
    }
    return sa ? s : s[0];
}            
function htmlspecialchars (string, quote_style, charset, double_encode) {
    // http://kevin.vanzonneveld.net
    // +   original by: Mirek Slugen
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Nathan
    // +   bugfixed by: Arno
    // +    revised by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // +      input by: Ratheous
    // +      input by: Mailfaker (http://www.weedem.fr/)
    // +      reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +      input by: felix
    // +    bugfixed by: Brett Zamir (http://brett-zamir.me)
    // %        note 1: charset argument not supported
    // *     example 1: htmlspecialchars("<a href='test'>Test</a>", 'ENT_QUOTES');
    // *     returns 1: '&lt;a href=&#039;test&#039;&gt;Test&lt;/a&gt;'
    // *     example 2: htmlspecialchars("ab\"c'd", ['ENT_NOQUOTES', 'ENT_QUOTES']);
    // *     returns 2: 'ab"c&#039;d'
    // *     example 3: htmlspecialchars("my "&entity;" is still here", null, null, false);
    // *     returns 3: 'my &quot;&entity;&quot; is still here'
    var optTemp = 0,
        i = 0,
        noquotes = false;
    if (typeof quote_style === 'undefined' || quote_style === null) {
        quote_style = 2;
    }
    string = string.toString();
    if (double_encode !== false) { // Put this first to avoid double-encoding
        string = string.replace(/&/g, '&amp;');
    }
    string = string.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    var OPTS = {
        'ENT_NOQUOTES': 0,
        'ENT_HTML_QUOTE_SINGLE': 1,
        'ENT_HTML_QUOTE_DOUBLE': 2,
        'ENT_COMPAT': 2,
        'ENT_QUOTES': 3,
        'ENT_IGNORE': 4
    };
    if (quote_style === 0) {
        noquotes = true;
    }
    if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
        quote_style = [].concat(quote_style);
        for (i = 0; i < quote_style.length; i++) {
            // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
            if (OPTS[quote_style[i]] === 0) {
                noquotes = true;
            }
            else if (OPTS[quote_style[i]]) {
                optTemp = optTemp | OPTS[quote_style[i]];
            }
        }
        quote_style = optTemp;
    }
    if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
        string = string.replace(/'/g, '&#039;');
    }
    if (!noquotes) {
        string = string.replace(/"/g, '&quot;');
    }

    return string;
}
function stripslashes (str) {
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ates Goral (http://magnetiq.com)
    // +      fixed by: Mick@el
    // +   improved by: marrtins
    // +   bugfixed by: Onno Marsman
    // +   improved by: rezna
    // +   input by: Rick Waldron
    // +   reimplemented by: Brett Zamir (http://brett-zamir.me)
    // +   input by: Brant Messenger (http://www.brantmessenger.com/)
    // +   bugfixed by: Brett Zamir (http://brett-zamir.me)
    // *     example 1: stripslashes('Kevin\'s code');
    // *     returns 1: "Kevin's code"
    // *     example 2: stripslashes('Kevin\\\'s code');
    // *     returns 2: "Kevin\'s code"
    return (str + '').replace(/\\(.?)/g, function (s, n1) {
        switch (n1) {
        case '\\':
            return '\\';
        case '0':
            return '\u0000';
        case '':
            return '';
        default:
            return n1;
        }
    });
}
function strip_tags (input, allowed) {
    // http://kevin.vanzonneveld.net
    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Luke Godfrey
    // +      input by: Pul
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // +      input by: Alex
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Marc Palau
    // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +      input by: Brett Zamir (http://brett-zamir.me)
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Eric Nagel
    // +      input by: Bobby Drake
    // +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Tomasz Wesolowski
    // +      input by: Evertjan Garretsen
    // +    revised by: Rafał Kukawski (http://blog.kukawski.pl/)
    // *     example 1: strip_tags('<p>Kevin</p> <br /><b>van</b> <i>Zonneveld</i>', '<i><b>');
    // *     returns 1: 'Kevin <b>van</b> <i>Zonneveld</i>'
    // *     example 2: strip_tags('<p>Kevin <img src="someimage.png" onmouseover="someFunction()">van <i>Zonneveld</i></p>', '<p>');
    // *     returns 2: '<p>Kevin van Zonneveld</p>'
    // *     example 3: strip_tags("<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>", "<a>");
    // *     returns 3: '<a href='http://kevin.vanzonneveld.net'>Kevin van Zonneveld</a>'
    // *     example 4: strip_tags('1 < 5 5 > 1');
    // *     returns 4: '1 < 5 5 > 1'
    // *     example 5: strip_tags('1 <br/> 1');
    // *     returns 5: '1  1'
    // *     example 6: strip_tags('1 <br/> 1', '<br>');
    // *     returns 6: '1  1'
    // *     example 7: strip_tags('1 <br/> 1', '<br><br/>');
    // *     returns 7: '1 <br/> 1'
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
        commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
        return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
}
function jDecode(str) {
    return $("<div/>").html(str).text();
}

function getJsondata($str){
return htmlspecialchars(stripslashes($str));
}

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}

function update_progress(percent,target){
	


var span = "<span style=\"width: "+parseInt(percent)+"%\"></span>";

$('#'+target).html(span);
return false;



}


function check_poi_updates(){
	





$.ajax({
timeout:2000,                                                                
dataType:"jsonp", 
                                            url:'http://maps.georates.net/pois/tbilisiMap/version.php',
                                                                 error: function(e){
                                                                              $('#errorDiv').show();
                                                                              
                                                                           },
                                                                     
                                                                                
                                             success: function(data) { 
                                                                       $('#errorDiv').hide();
                                                                     $('#pois_version_server').html(data.poi_version);
                                                                     
                                                        local_version=$('#pois_version').html();
                                                                     
                                                                     $("#versioning").show();
                                                                     if(local_version==data.poi_version){
                                                                    	 
                                                                     
                                                                    $("#status").html('You have the latest version of pois,and no update is necessary.');
                                                                     }
                                                                     else{
                                                                    	 
                                                                       $("#status").html('There is new version of POIs available for downloading. ');
                                                                      $("#update_button").show();                                                                    
                                                                     
                                                                     }
                                                                     
                                                                     
                                                                                },
});

}


function check_map_updates(){
	





$.ajax({
timeout:3000,                                                                
dataType:"jsonp", 
                                            url:'http://maps.georates.net/maps/tbilisiMap/version.php',
                                                                 error: function(e){
                                                                              $('#errorDiv').show();
                                                                              
                                                                           },
                                                                     
                                                                                
                                             success: function(data) { 
                                                                       $('#errorDiv').hide();
                                                                     $('#map_version_server').html(data.map_version);
                                                                     
                                                        local_version=$('#map_version').html();
                                                                     
                                                                     $("#versioning").show();
                                                                     if(local_version==data.poi_version &&   1>1){
                                                                    	 
                                                                     
                                                                    $("#status").html('You have the latest version of pois,and no update is necessary.');
                                                                     }
                                                                     else{
                                                                    	 
                                                                       $("#status").html('There is new version of POIs available for downloading. ');
                                                                       
                                                                       
                                                                       
                                                                  
                                                                   var url = $('#update_map_url').attr('href');
                                                                           $('#update_map_url').attr('href', url + '?map_version='+data.map_version+'&map_file='+data.map_file+'&map_size='+data.map_size);


                                                                      $("#update_button").show();                                                                    
                                                                     
                                                                     }
                                                                     
                                                                     
                                                                                },
});

}

function get_pois(){
	 now_zoom=map.getZoom();
    
                       if(show_pois>0 && now_zoom >12 ){                     
                                            
                                            
                                           
                                              now_bounds=map.getBounds();
                                             // alert(now_zoom);
                                             // console.log(now_bounds);
                                            map.removeLayer(marker_group); 
                                                        
                                            var url = "/app/Node/search/?"
                                                                    + "zoom=" + now_zoom
                                                                    + "&tllon=" + now_bounds._northEast.lng
                                                                    + "&tllat=" + now_bounds._northEast.lat
                                                                    + "&brlon=" + now_bounds._southWest.lng
                                                                    + "&brlat=" + now_bounds._southWest.lat;
                                                         
                                                               // GET and process some markers
                                                               $.ajax({
                                                                dataType:"text", 
                                            url:url,
                                                                 error: function(e){
                                                                               alert('Error loading XML document of POIs');
                                                                               console.log(e);
                                                                           },
                                                                     
                                                                                
                                             success: function(data) { 
                                               //removing nasty html div 
                                              // alert($(data).html());
                                            
                                              // console.log(jDecode($(data).html()));
                                            data=data.replace(/<div>/, "").replace(/<\/div>/, "");

                                           
                                               var markers = JSON.parse(data);
                                               
                                               
                                            
                                               marker_group = new L.LayerGroup();    
                                               
                                               
                                                         
                                               
                                               
                                               
                                               ///console.log(markers.markers);
                                               
                                               
                                               $.each(markers.markers, function(i,item) {
                                                 
                                                 


                                              if((item.id) != "undefined" && parseInt(item.id)>0){                     	   
                                            	 
                                                 iconUrl='/public/images/icons/'+item.icon+'.png';
                                            
                                                 if(item.lat>0){
                                                	
                                                  
                                                   
                                                   
                                                   
                                                   
                                                   var LeafIcon = L.Icon.extend({
                                                	      options: {
                                                	        shadowUrl: null,
                                                	        iconSize:     [32, 37],
                                                	        shadowSize:  null,
                                                	        iconAnchor:   [14, 37],
                                                	        shadowAnchor: [4, 62],
                                                	        popupAnchor:  [-3, -32]
                                                	      }
                                                	    });
                                                 
                                                   
                                                   var myIcon = new LeafIcon({iconUrl: iconUrl});

                                                // var littletonMarker = new L.Marker(new L.LatLng(item.lat, item.lon),{icon:myIcon}).bindPopup(item.title+'<br>'+item.popup).addTo(map);
                                                 L.marker([item.lat, item.lon], {icon: myIcon}).bindPopup(item.title+'<br>'+item.popup).addTo(marker_group);

                                                 ///marker_group.addLayer(littletonMarker);
                                                 
                                                 }
                                                 
                                                 }
                                               
                                              
                                               });

                                               map.addLayer(marker_group); 
                                               
                                               
                                             //  console.log("marker_group added");
                                               
                                               
                                               
                                               
                                               
                                               
                                               
                                             }
                                   
                                              });
                                                               
                       }


}


function get_pins(){
	
    
    now_zoom=map.getZoom();
      now_bounds=map.getBounds();
     // alert(now_zoom);
     // console.log(now_bounds);
    map.removeLayer(marker_group); 
                
    var url = "/app/Pin/search/";
                 
                       // GET and process some markers
                       $.ajax({
                        dataType:"text", 
    url:url,
                         error: function(e){
                                       alert('Error loading XML document of POIs');
                                       console.log(e);
                                   },
                             
                                        
     success: function(data) { 
       //removing nasty html div 
      // alert($(data).html());
    
      // console.log(jDecode($(data).html()));
    data=data.replace(/<div>/, "").replace(/<\/div>/, "");

   
       var markers = JSON.parse(data);
       
       
    
       pin_group = new L.LayerGroup();    
       
       
                 
       
       
       
      // console.log(markers.markers);
       
       
       $.each(markers.markers, function(i,item) {
         
       //  console.log(item);


      if((item.pin_id) != "undefined" && parseInt(item.pin_id)>0){                     	   
    	 
         iconUrl='/public/images/icons/some.png';
    
         if(item.lat>0){
        	
          
          // console.log('aaaa');
           
           
           var LeafIcon = L.Icon.extend({
        	      options: {
        	        shadowUrl: null,
        	        iconSize:     [32, 37],
        	        shadowSize:  null,
        	        iconAnchor:   [14, 37],
        	        shadowAnchor: [4, 62],
        	        popupAnchor:  [-3, -32]
        	      }
        	    });
         
           
           var myIcon = new LeafIcon();

        // var littletonMarker = new L.Marker(new L.LatLng(item.lat, item.lon),{icon:myIcon}).bindPopup(item.title+'<br>'+item.popup).addTo(map);
         L.marker([item.lat, item.lon]).bindPopup(item.text,{maxWidth:250}).addTo(pin_group);

         ///marker_group.addLayer(littletonMarker);
         
         }
         
         }
       
      
       });

       map.addLayer(pin_group); 
       
       
      // console.log("marker_group added");
       
       
       
       
       
       
       
     }

      });
	
	
	
}


function strlen (string) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   improved by: Sakimori
	  // +      input by: Kirk Strobeck
	  // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +   bugfixed by: Onno Marsman
	  // +    revised by: Brett Zamir (http://brett-zamir.me)
	  // %        note 1: May look like overkill, but in order to be truly faithful to handling all Unicode
	  // %        note 1: characters and to this function in PHP which does not count the number of bytes
	  // %        note 1: but counts the number of characters, something like this is really necessary.
	  // *     example 1: strlen('Kevin van Zonneveld');
	  // *     returns 1: 19
	  // *     example 2: strlen('A\ud87e\udc04Z');
	  // *     returns 2: 3
	  var str = string + '';
	  var i = 0,
	    chr = '',
	    lgth = 0;

	  if (!this.php_js || !this.php_js.ini || !this.php_js.ini['unicode.semantics'] || this.php_js.ini['unicode.semantics'].local_value.toLowerCase() !== 'on') {
	    return string.length;
	  }

	  var getWholeChar = function (str, i) {
	    var code = str.charCodeAt(i);
	    var next = '',
	      prev = '';
	    if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
	      if (str.length <= (i + 1)) {
	        throw 'High surrogate without following low surrogate';
	      }
	      next = str.charCodeAt(i + 1);
	      if (0xDC00 > next || next > 0xDFFF) {
	        throw 'High surrogate without following low surrogate';
	      }
	      return str.charAt(i) + str.charAt(i + 1);
	    } else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
	      if (i === 0) {
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      prev = str.charCodeAt(i - 1);
	      if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
	        throw 'Low surrogate without preceding high surrogate';
	      }
	      return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
	    }
	    return str.charAt(i);
	  };

	  for (i = 0, lgth = 0; i < str.length; i++) {
	    if ((chr = getWholeChar(str, i)) === false) {
	      continue;
	    } // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
	    lgth++;
	  }
	  return lgth;
	}



function count (mixed_var, mode) {
	  // http://kevin.vanzonneveld.net
	  // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	  // +      input by: Waldo Malqui Silva
	  // +   bugfixed by: Soren Hansen
	  // +      input by: merabi
	  // +   improved by: Brett Zamir (http://brett-zamir.me)
	  // +   bugfixed by: Olivier Louvignes (http://mg-crea.com/)
	  // *     example 1: count([[0,0],[0,-4]], 'COUNT_RECURSIVE');
	  // *     returns 1: 6
	  // *     example 2: count({'one' : [1,2,3,4,5]}, 'COUNT_RECURSIVE');
	  // *     returns 2: 6
	  var key, cnt = 0;

	  if (mixed_var === null || typeof mixed_var === 'undefined') {
	    return 0;
	  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
	    return 1;
	  }

	  if (mode === 'COUNT_RECURSIVE') {
	    mode = 1;
	  }
	  if (mode != 1) {
	    mode = 0;
	  }

	  for (key in mixed_var) {
	    if (mixed_var.hasOwnProperty(key)) {
	      cnt++;
	      if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor === Object)) {
	        cnt += this.count(mixed_var[key], 1);
	      }
	    }
	  }

	  return cnt;
	}






//update the size of downloaded file on the page of map download
function downloaded_size(size,map_size){
	
size=parseInt(size);



progress=(size/map_size)*100;
update_progress(progress,'progressBar');

$('#downloaded_size').html(size);
$('#download_ul').listview("refresh");
return false;
}

function download_finished(){
	$('#download_ul').fadeOut();
$('#cancel_download').fadeOut();
$('#progressBar').fadeOut();
$('#download_finished').fadeIn();

}

//function which works when map is downloaded and unpacked


function unpack_finished(){
	$('#download_finished').fadeOut();
	$('#unpack_finished').fadeIn();
	


}



function do_fast_reset(url){
	

$('#preword').fadeOut();
$('#poi_update').fadeIn();

  $.ajax({
    url: url,
    cache: false,
    success: function(html){
   //  console.log('ok');
    }
  });

}

function close_poi_reset(){
	
$('#poi_update').fadeOut();

$('#map_update').fadeIn();

}


function reset_finished(){
	


$('#map_update').fadeOut();
	
$('#finish_update').fadeIn();




}













