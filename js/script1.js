
    // Create a client instance: Broker, Port, Websocket Path, Client ID
   client = new Paho.MQTT.Client("1broker.mqttdashboard.com", Number(8000),"clientId-muthu")
//client = new Paho.MQTT.Client("broker.hivemq.com", Number(9001), "clientId-muthu")
    // set callback handlers
    client.onConnectionLost = function (responseObject) 
	{
        console.log("Connection Lost: " + responseObject.errorMessage);
	}
	
	 client.onMessageArrived = function (message) 
	 {
        console.log("Message Arrived: " + message.payloadString);
        var pload = message.payloadString;
		var obj = jQuery.parseJSON(pload);
		var temp = obj.temp;
        var co = obj.co;
        var co2 = obj.co2;
		var nh4 = obj.nh4;
		console.log(temp);
        console.log(co);
        console.log(co2);
		console.log(nh4);
        if (temp > 36) {
		
            $("#stemp").html("<label class='label label-danger'>CRITICAL</label>");
        } else
            $("#stemp").html("<label class='label label-success'>NORMAL</label>");
        if (co > 78) {
            $("#sco").html("<label class='label label-danger'>CRITICAL</label>");
        } else
            $("#sco").html("<label class='label label-success'>NORMAL</label>");
		if (co2 > 78) {
            $("#sco2").html("<label class='label label-danger'>CRITICAL</label>");
        } else
            $("#sco2").html("<label class='label label-success'>NORMAL</label>");
        if (nh4 < 45) {
            $("#snh4").html("<label class='label label-danger'>CRITICAL</label>");
        } else
            $("#snh4").html("<label class='label label-success'>NORMAL</label>");

        $("#temp").text(obj.temp);
		$("#co").text(obj.co);
        $("#co2").text(obj.co2);
        $("#nh4").text(obj.nh4);


    }	
		$(document).ready(function () {
        var fired=false;
        $(document).keyup(function(event) {
            if (event.which==37&&!fired) {
                    fired=true;
                    $("#left").mouseup();
                 
            }

            else if (event.which==38&&!fired) {
                
                    fired=true;
                   $("#up").mouseup(); 
            }
			
			else if (event.which==38&&event.which==39&&!fired) {
                
                    fired=true;
                   $("#up").mouseup();
                   $("#right").mouseup();				   
            }

            else if (event.which==39&&!fired) {
                fired=true;
                $("#right").mouseup();
            }

            else if (event.which==40&&!fired) {
                fired=true;
                $("#down").mouseup();
            }
        });
        $(document).keydown(function(event) {
            if (event.which==37&&fired) {
                fired=false;
                $("#left").mousedown(); 
            }
			
			else if (event.which==38&&event.which==39&&!fired) {
                
                    fired=true;
                   $("#up").mouseup();
                   $("#right").mouseup();				   
            }

            else if (event.which==38&&fired) {
                fired=false;
               $("#up").mousedown();
            }

            else if (event.which==39&&fired) {
                fired=false;
                $("#right").mousedown();
            }

            else if (event.which==40&&fired) {
                fired=false;
                $("#down").mousedown();
            }
        });
        function carstop() 
		{
            message = new Paho.MQTT.Message("X");
            message.destinationName = "car";
            client.send(message);
			console.log(message);
		}

        $("#up").mousedown(function () 
		{
            message = new Paho.MQTT.Message("a");
            message.destinationName = "car";
            client.send(message);
			console.log(message);
		});
		
		$("#up").mouseup(function() {
			carstop();
		});
		
		$("#down").mousedown(function () 
		{
            message = new Paho.MQTT.Message("b");
            message.destinationName = "car";
            client.send(message);
			console.log(message);
		});
			
		$("#down").mouseup(function () 
		{
			carstop();
		});

		$("#right").mousedown(function () 
		{
            message = new Paho.MQTT.Message("c");
            message.destinationName = "car";
            client.send(message);
			console.log(message);
		});
		
		$("#right").mouseup(function () 
		{
			carstop();
		});
			
		$("#left").mousedown(function () 
		{
            message = new Paho.MQTT.Message("d");
            message.destinationName = "car";
            client.send(message);
			console.log(message);
		});

		$("#left").mouseup(function () 
		{
			carstop();
		});

		});	
		function onConnect() 
		{
        console.log("Connected!");
        client.subscribe("car_gas");
        }


    client.connect({onSuccess:onConnect});

	
