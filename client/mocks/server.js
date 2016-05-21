module.exports.addMockServer = addMockServer;

function addMockServer (fakeData) {
    mockHttpBackend.$inject = ['$httpBackend'];

    function getParameterByName(name, url) {
        url = url.toLowerCase(); // This is just to avoid case sensitiveness  
        name = name.replace(/[\[\]]/g, "\\$&").toLowerCase();// This is just to avoid case sensitiveness for query parameter name
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function mockHttpBackend ($httpBackend) {
        var channelIDs = Object.keys(fakeData.channels);
        // Mock channels
        for (var key in fakeData.channels) {
            var channel = fakeData.channels[key];
            var portal = channel.portal;
            if(portal['portal-url'] == 'http://highway.to.hell'){
                // Make second channel offline
                $httpBackend.when('GET', portal['portal-url'])
                .respond(404, 'Channel is offline');
            }
            else{
                $httpBackend.when('GET', portal['portal-url'])
                .respond(200, portal);
            }
            var queryUrlRegex = portal['query-url'].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var urlRegex = new RegExp(queryUrlRegex + '.*');
            $httpBackend.when('GET', urlRegex)
            .respond(function (method, url, data, headers, params) {
                var bounds = JSON.parse(getParameterByName('bounds', url));
                // console.error(url);
                // console.error(typeof bounds);
                // console.error(data);
                // console.error(headers);
                // console.error(params);
                var responsePosts = [];
                var southwest = bounds.southwest;
                var northeast = bounds.northeast;
                for (var i = 0; i < channel.posts.length; i++) {
                    if (channel.posts[i].latitude > southwest.latitude
                    && channel.posts[i].latitude < northeast.latitude
                    && channel.posts[i].longitude > southwest.longitude
                    && channel.posts[i].longitude < northeast.longitude) {
                        responsePosts.push(channel.posts[i]);
                    }
                    // responsePosts.push(channel.posts[i]);
                }
                // console.error(responsePosts.length);
                return [200, responsePosts];
            });

        }

        // Mock new channel
        var portal = fakeData.newChannel.portal;
        var posts = fakeData.newChannel.posts;
        $httpBackend.when('GET', portal['portal-url'])
        .respond(200, portal);
        var queryUrlRegex = portal['query-url'].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var urlRegex = new RegExp(queryUrlRegex + '.*');
        $httpBackend.when('GET', urlRegex)
        .respond(200, posts);

        $httpBackend.when('GET', /.*/).passThrough();
    }
    angular.module('mockServer', ['ngMockE2E']).run(mockHttpBackend);
}