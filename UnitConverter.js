var ang_pattern = /^[1-9]([0-9]{1,2})?([- d][0-9]{1,2}([- '][0-9]{1,2})?)?[" ]?$/;
var num_pattern = /^([1-9][0-9]*|0)([\.,][0-9]*)?$/;

function upd(result) {
    $.each(result, function(i, field) { 
		if (i.match(/^btn/)) {		// update button text
			$('.' + i.substr(3)).attr('value', field);
		} else if (i.match(/^plh/)) {	// update placeholder text
			$('.' + i.substr(3)).attr('placeholder', field)
		} else {					// update other html text
			$('#' + i).html(field);
		}
    }); 
}

$(document).ready(function () {
	// get local messages
	var lang = navigator.language.substr(0,2);
	if (! lang.match(/^en/))
		$.getJSON(lang + '.json', upd); 

	$(".dist").focus(function(e){
		$(".dist").css('background-color', '');
		var w = '#' + e.target.id;
		var v = $(w).val();
		$(".dist").val("");
		$(w).val(v);
	});
	
	$(".dist").keypress(function(e) {
		if (e.which == 13) {
			dist_convert();
		}
	});
	// convert value if convert button clicked
	$("#convertdist").click(dist_convert);
	
	// Areas	
	$(".area").focus(function(e){
		$(".area").css('background-color', '');
		var w = '#' + e.target.id;
		var v = $(w).val();
		$(".area").val("");
		$(w).val(v);
	});
		
	$(".area").keypress(function(e) {
		if (e.which == 13) {
			area_convert();
		}
	});
	$("#convertarea").click(area_convert);
	
	//Angles
	$(".angle").focus(function(e){
		$(".angle").css('background-color', '');
		var w = '#' + e.target.id;
		var v = $(w).val();
		$(".angle").val("");
		$(w).val(v);
	});
	$(".angle").keypress(function(e) {
		if (e.which == 13) {
			angle_convert();
		}
	});
	$("#convertangle").click(angle_convert);
});

// distance conversion
function dist_convert() {
	var m, v;
	$(".dist").css('background-color', '');
	// convert input field to meter
	if ($("#meter").val().length) {
		v = $("#meter").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#meter").css('background-color', 'red');
			return;
		}
		m = v * 1.0;
	} else if ($("#fathom").val().length) {
		v = $("#fathom").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#fathom").css('background-color', 'red');
			return;
		}
		m = v * 1.89648384;
	} else if ($("#feet").val().length) {
		v = $("#feet").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#feet").css('background-color', 'red');
			return;
		}
		m = v / 3.2808398950131234;
	} else if ($("#yard").val().length) {
		v = $("#yard").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#yard").css('background-color', 'red');
			return;
		}
		m = v / 1.0936132983377078;
	} else if ($("#mile").val().length) {
		v = $("#mile").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#mile").css('background-color', 'red');
			return;
		}
		m = v / 0.0006213711922373339;
	} else if ($("#nautical").val().length) {
		v = $("#nautical").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#nautical").css('background-color', 'red');
			return;
		}
		m = v / 0.0005399568034557236;
	}
	if (! m) return;
	$("#meter").val(m.toFixed(3));
	// change meter to all others
	$("#fathom").val((m * 0.527291601).toFixed(3));
	$("#feet").val((m * 3.2808398950131234).toFixed(3));
	$("#yard").val((m * 1.0936132983377078).toFixed(3));
	$("#mile").val((m * 0.0006213711922373339).toFixed(5));
	$("#nautical").val((m * 0.0005399568034557236).toFixed(5));
}

function area_convert(){
	$(".area").css('background-color', '');
	//convert imput field to square meter
	var sm, v;
	if ($("#smeter").val().length) {
		v = $("#smeter").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#smeter").css('background-color', 'red');
			return;
		}
		sm = v * 1;
	} else if ($("#sfathom").val().length) {
		v = $("#sfathom").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#sfathom").css('background-color', 'red');
			return;
		}
		sm = v * 3.5966;
	} else if ($("#hectare").val().length) {
		v = $("#hectare").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#hectare").css('background-color', 'red');
			return;
		}
		sm = v * 10000.0;
	} else if ($("#cacre").val().length) {
		v = $("#cacre").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#cacre").css('background-color', 'red');
			return;
		}
		sm = v * 1600.0 * 3.5966;
	} else if ($("#acre").val().length) {
		v = $("#acre").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#acre").css('background-color', 'red');
			return;
		}
		sm = v * 4046.873;
	} else if ($("#sqrft").val().length) {
		v = $("#sqrft").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#sqrft").css('background-color', 'red');
			return;
		}
		sm = v / 10.76391041671;
	}
	if (! sm) return;
	// convert other fields to sq m
	$("#smeter").val(sm.toFixed(3));
	$("#sfathom").val((sm/3.5966).toFixed(5));
	$("#hectare").val((sm/10000.0).toFixed(5));
	$("#cacre").val((sm/1600/3.5966).toFixed(5));
	$("#acre").val((sm/4046.873).toFixed(5));
	$("#sqrft").val((sm*10.76391041671).toFixed(2));
	$("#convertarea").focus();
}
 
 function angle_convert( ) {
	var v, w, w1;
	$(".angle").css('background-color', '');
	//convert input field to radian
	
	if ($("#degree").val().length) {
		v = $("#degree").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#degree").css('background-color', 'red');
			return;
		}
		w = v * 0.017453292519943295769236907684886;
	}
	else if ($("#radian").val().length){
		v = $("#radian").val().replace(',', '.');
		if (! num_pattern.test(v)) {
			$("#radian").css('background-color', 'red');
			return;
		}
		w = v * 1;
	}
	else if ($("#dms").val().length){
		if (! ang_pattern.test($("#dms").val())) {
			$("#dms").css('background-color', 'red');
			return;
		}
		w = ($("#dms").val().split) (new RegExp(/[- ]/));
		w1 = 0;
		if (w.length > 0) w1 = w[0] * 1;
		if (w.length > 1) w1 += w[1] / 60.0
		 if (w.length > 2) w1 += w[2] / 3600.0;
		w = w1 * 0.017453292519943295769236907684886;
	}
	else if ($("#grad").val().length){
		if (! num_pattern.test($("#grad").val())) {
			$("#grad").css('background-color', 'red');
			return;
		}
		w=$("#grad").val() * 0.015707963267948966192313216916398;
	}
	else if ($("#mills").val().length){
		if (! num_pattern.test($("#mills").val())) {
			$("#mills").css('background-color', 'red');
			return;
		}
		w=$("#mills").val() * 4.9087385212340519350978802863742e-4;
	}
	if (! w) return;
	//convert from radian
	$("#radian").val((w).toFixed(5));
	deg = w / 0.017453292519943295769236907684886;
	secall= (deg*3600).toFixed(0);
	sec=secall % 60 + '';
	minall=Math.floor(secall / 60);
	min = minall % 60 + '';
	deg =Math.floor(minall / 60);
	if (sec.length == 1) sec = '0' + sec;
	if (min.length == 1) min = '0' + min;
	dms=deg+'-'+min+'-'+sec;	
	$("#degree").val((w / 0.017453292519943295769236907684886).toFixed(6));
	$("#dms").val(dms);
	$("#grad").val((w / 0.015707963267948966192313216916398).toFixed(5));
	$("#mills").val((w / 4.9087385212340519350978802863742e-4).toFixed(0));
}
