var portalTabs = {
    'portalOverview': ['portal-NetworkHistogram', 'portal-ApplicationPieChart', 'portal-NetworkMap'],
    'portalClients': ['portal-ClientTable'],
    'portalAccessPoints': ['portal-NetworkMap2', 'portal-NodeTable'],
    'portalApplications': ['portal-ApplicationPieChart2', 'portal-ApplicationTable'],
    'portalSiteSurvey': ['portal-SurveyTable']
};
(function() {
	if (typeof cloudtrax !== "undefined") {
		console.log("CloudTrax: already detected cloudtrax variable. Stopping loading.");
		return false;
	}
	var apiUrl;
	cloudtrax = {};
	cloudtrax.text = {};
    var embeds = [
			{
				"id":"portal-ApplicationPieChart",
				"requiredCss":[
					//"/public/css/embed/networkhistogram.css",
					"/public/css/shared/Layer7PieChart.css"
				],
				"requiredJs":[
					"/public/js/shared/highcharts-all.js",
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/Layer7PieChart.js",
					"/public/js/embed/applicationpiechart.js"
				],
				"main":function(config) {
					cloudtrax.embed.applicationpiechart(config);
				}
			},
            {
				"id":"portal-ApplicationPieChart2",
				"requiredCss":[
					//"/public/css/embed/networkhistogram.css",
					"/public/css/shared/Layer7PieChart.css"
				],
				"requiredJs":[
					"/public/js/shared/highcharts-all.js",
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/Layer7PieChart.js",
					"/public/js/embed/applicationpiechart.js"
				],
				"main":function(config) {
					cloudtrax.embed.applicationpiechart(config);
				}
			},
			{
				"id":"portal-ApplicationTable",
				"requiredCss":[
					"/public/css/shared/SortableTable.css",
					"/public/css/shared/Layer7SortableTable.css"
				],
				"requiredJs":[
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/SortableTable.js",
					"/public/js/shared/Layer7SortableTable.js",
					"/public/js/embed/applicationtable.js"
				],
				"main":function(config) {
					cloudtrax.embed.applicationtable(config);
				}
			},
			{
				"id":"portal-NetworkHistogram",
				"requiredCss":[
					//"/public/css/embed/networkhistogram.css",
					"/public/css/shared/NetworkHistogram.css"
				],
				"requiredJs":[
					"/public/js/shared/highcharts-all.js",
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/NetworkHistogram.js",
					"/public/js/embed/networkhistogram.js"
				],
				"main":function(config) {
					cloudtrax.embed.networkhistogram(config);
				}
			},
			{
				"id":"portal-NetworkMap",
				"requiredCss":[
				],
				"requiredJs":[
					"/public/js/embed/networkmap.js"
				],
				"main":function(config) {
					cloudtrax.embed.networkmap(config);
				}
			},
            {
				"id":"portal-NetworkMap2",
				"requiredCss":[
				],
				"requiredJs":[
					"/public/js/embed/networkmap.js"
				],
				"main":function(config) {
					cloudtrax.embed.networkmap(config);
				}
			},
			{
				"id":"portal-NodeTable",
				"requiredCss":[
					//"/public/css/embed/nodetable.css",
					"/public/css/shared/OutageChart.css",
					"/public/css/shared/SpeedChart.css",
					"/public/css/shared/SortableTable.css",
					"/public/css/shared/NodeSortableTable.css"
				],
				"requiredJs":[
					"/public/js/shared/NodeDataAdapter.js",
					"/public/js/shared/SortableTable.js",
					"/public/js/shared/NodeSortableTable.js",
					"/public/js/shared/SpeedChart.js",
					"/public/js/shared/OutageChart.js",
					"/public/js/embed/nodetable.js"
				],
				"main":function(config) {
					cloudtrax.embed.nodetable(config);
				}
			},
			{
				"id":"portal-NodeTableCompact",
				"requiredCss":[
					"/public/css/embed/nodetablecompact.css",
					"/public/css/shared/OutageChart.css",
					"/public/css/shared/SpeedChart.css",
					"/public/css/shared/SortableTable.css",
					"/public/css/shared/NodeSortableTable.css"
				],
				"requiredJs":[
					"/public/js/shared/NodeDataAdapter.js",
					"/public/js/shared/SortableTable.js",
					"/public/js/shared/NodeSortableTable.js",
					"/public/js/shared/SpeedChart.js",
					"/public/js/shared/OutageChart.js",
					"/public/js/embed/nodetable.js"
				],
				"main":function(config) {
					cloudtrax.embed.nodetable(config);
				}
			},
			{
				"id":"portal-ClientTable",
				"requiredCss":[
					//"/public/css/embed/clienttable.css",
					"/public/css/shared/SortableTable.css",
					"/public/css/shared/ClientSortableTable.css"
				],
				"requiredJs":[
					"/public/js/shared/highcharts-all.js",
					"/public/js/shared/ClientDataAdapter.js",
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/ClientHistogram.js",
					"/public/js/shared/SortableTable.js",
					"/public/js/shared/ClientSortableTable.js",
					"/public/js/embed/clienttable.js"
				],
				"main":function(config) {
					cloudtrax.embed.clienttable(config);
				}
			},
			{
				"id":"portal-SurveyTable",
				"requiredCss":[
					//"/public/css/embed/surveytable.css",
					"/public/css/shared/SortableTable.css",
					"/public/css/shared/SurveySortableTable.css"
				],
				"requiredJs":[
					"/public/js/shared/SurveyDataAdapter.js",
					"/public/js/shared/HistoryDataAdapter.js",
					"/public/js/shared/SortableTable.js",
					"/public/js/shared/SurveySortableTable.js",
					"/public/js/embed/surveytable.js"
				],
				"main":function(config) {
					cloudtrax.embed.surveytable(config);
				}
			}
		];
	var main = function() {

		var scriptElement;
		var requiredJs = {};
		var requiredCss = {};
		var totalJs = 0;
		var currentJs = 0;
		var totalCss = 0;
		var currentCss = 0;
		var body = document.getElementsByTagName("body")[0];
		var scripts = document.getElementsByTagName("script");
		var scriptSrc;

		//for (var i = 0; i < scripts.length; i++) {
		//	if (scripts[i].src.indexOf(".cloudtrax.com") >= 0) {
		//		scriptElement = scripts[i];
		//		scriptSrc = scriptElement.src;
		//		break;
		//	}
		//}
        //
		//var paths = scriptSrc.split("/");
		////TODO this is SOOOOOO lame
		//switch (paths[2]) {
		//	case "webdev.cloudtrax.com":
		//		cloudtrax.PATH_RELATIVE = "https://webdev.cloudtrax.com/" + paths[3];
		//		apiUrl = "https://api-dev.cloudtrax.com";
		//		break;
		//	default:
		//		cloudtrax.PATH_RELATIVE = "https://ww1.cloudtrax.com";
		//		apiUrl = "https://api.cloudtrax.com";
		//}

        for (var i = 0; i < scripts.length; i++) {
			if (scripts[i].getAttribute("data-network-id")) {
				scriptElement = scripts[i];
				break;
			}
		}
        cloudtrax.PATH_RELATIVE = "https://ww1.cloudtrax.com";
        apiUrl = "https://api.cloudtrax.com";

		var key = scriptElement.getAttribute("data-key");
		//call this a "token" instead of secret. dont want any confusion over this vs the API
		var secret = scriptElement.getAttribute("data-token");
		//TODO eventually deprecate networkId in v2
		var networkId = scriptElement.getAttribute("data-network-id") || scriptElement.getAttribute("data-networkId");
		var lang = scriptElement.getAttribute("data-lang") || "en";

        cloudtrax.clientConfig = {
            key: key,
            secret: secret,
            networkId: networkId,
            lang: lang
        };

		if (!key) {
			console.warn("CloudTrax embed: \"data-key\" is a required attribute!");
			return;
		}
		if (!secret) {
			console.warn("CloudTrax embed: \"data-token\" is a required attribute!");
			return;
		}
		if (!networkId) {
			console.warn("CloudTrax embed: \"data-network-id\" is a required attribute!");
			return;
		}

		for (var i = 0; i < embeds.length; i++) {
			var js = embeds[i].requiredJs;
			var css = embeds[i].requiredCss;
			var containers = document.getElementsByClassName(embeds[i].id);
			if (containers.length === 0) {
				continue;
			}
			for (var j = 0; j < js.length; j++) {
				requiredJs[js[j]] = true;
			}
			for (var j = 0; j < css.length; j++) {
				requiredCss[css[j]] = true;
			}
		}

		//required css files
		requiredCss["/public/css/embed/index.css"] = true;
		//required js files
		requiredJs["/public/js/shared/helpers.js"] = true;
		requiredJs["/public/js/embed/Api.js"] = true;

		for (var x in requiredCss) {
			var link = document.createElement("link");
			link.type = "text/css";
			link.rel = "stylesheet";
			link.href = cloudtrax.PATH_RELATIVE + x;
			link.onload = function() {
				currentCss++;
				console.log("CloudTrax: css loaded (" + this.href + ")");
			};
			body.appendChild(link);
			totalCss++;
		}
		for (var x in requiredJs) {
			var script = document.createElement("script");
			script.src = cloudtrax.PATH_RELATIVE + x;
			script.onload = function() {
				currentJs++;
				console.log("CloudTrax: js loaded (" + this.src + ")");
			};
			body.appendChild(script);
			totalJs++;
		}
		var interval = setInterval(function() {
			if (currentJs === totalJs && currentCss === totalCss) {
				clearInterval(interval);
                // activateTabs
                $(".network-detail-tabs li").removeClass("disabled");

                cloudtrax.isAllLoaded = true;
                detailLoads["portalOverview"] = cloudtrax.reload(portalTabs['portalOverview']);

			}
		}, 50);
	};

    cloudtrax.reload = function (portalIds) {
        if (!cloudtrax.isAllLoaded) {
            return false;
        }
        var api = cloudtrax.embed.Api();
        api.setBaseUrl(apiUrl);
        api.setKeySecret(cloudtrax.clientConfig.key, cloudtrax.clientConfig.secret);
        var timeRequest = api.retrieveTime(function(response) {
            console.log("CloudTrax: got time (" + response.time + ")");
        });
        var langRequest = cloudtrax.shared.helpers.ajax(
            cloudtrax.PATH_RELATIVE + "/public/locale/" + cloudtrax.clientConfig.lang + ".json",
            "GET",
            null,
            null,
            function(response) {
                console.log("CloudTrax: got language (" + cloudtrax.clientConfig.lang + ")");
            }
        );
        cloudtrax.shared.helpers.waitAll([timeRequest, langRequest], function(responses) {
            var timestamp = new Date(responses[0].time).getTime() / 1000;
            api.setTime(timestamp);
            var lang = responses[1];
            for (var x in lang) {
                if (!cloudtrax.text[x]) {
                    cloudtrax.text[x] = lang[x];
                }
            }
            for (var i = 0; i < embeds.length; i++) {
                if (portalIds.indexOf(embeds[i].id) < 0) {
                    continue;
                }
                var embed = embeds[i];
                var containers = document.getElementsByClassName(embed.id);
                for (var j = 0; j < containers.length; j++) {
                    var container = containers[j];
                    //use the container ones, if present
                    var containerKey = container.getAttribute("data-key") || cloudtrax.clientConfig.key;
                    var containerSecret = container.getAttribute("data-token") || cloudtrax.clientConfig.secret;
                    var containerNetworkId = container.getAttribute("data-network-id") || cloudtrax.clientConfig.networkId;
                    var containerApi = api;

                    //make a different instance if the container has different attributes
                    if (containerKey !== cloudtrax.clientConfig.key || containerSecret !== cloudtrax.clientConfig.secret) {
                        containerApi = cloudtrax.embed.Api();
                        containerApi.setTime(timestamp);
                    }

                    containerApi.setBaseUrl(apiUrl);
                    containerApi.setKeySecret(containerKey, containerSecret);
                    embed.main({
                        "api":containerApi,
                        "container":containers[j],
                        "networkId":containerNetworkId
                    });
                }
            }
        });
        return true;
    };

	window.addEventListener("DOMContentLoaded", main);


})();