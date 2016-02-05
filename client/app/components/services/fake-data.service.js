(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('FakeData', FakeData);

    FakeData.$inject = ['DEFAULTS'];

    /* @ngInject */
    function FakeData(DEFAULTS) {
        var self = this;
        self.genFakeMap = genFakeMap;
        self.genFakePosts = genFakePosts;

        ////////////////
        function genFakeMap (requiredArg1, requiredArg2, options) {
            options = typeof options === 'undefined' ? {} : options;
            // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
            return DEFAULTS.map;
        };

        function genFakePosts(options) {
            options = typeof options === 'undefined' ? {} : options;
            options.count = typeof options.count === 'undefined' ? 10 : options.count;
            var posts = fakePostData();
            var count = Math.min(options.count, posts.length);
            posts = posts.slice(0, count);
            var categories = Object.keys(fakeCategories());
            var thumbnails = fakeThumbnails();
            for (var i = 0; i < posts.length; i++) {
                posts[i].latitude = 23.973875 + 2 * (0.5 - Math.random());
                posts[i].longitude = 120.982024 + 2 * (0.5 - Math.random());
                posts[i].create_time = pickRandomDate();
                if(Math.random() > 0.2){
                    posts[i].category = _.sample(categories);
                }
                if(Math.random() > 0.5){
                    posts[i].thumbnail = _.sample(thumbnails);
                }
            };
            // console.log(posts);
            return posts;
        }

        // function genFakeIconObjects (options) {
        //     options = typeof options === 'undefined' ? {} : options;
        //     // options.optionArg = typeof options.optionArg === 'undefined' ? defaultValue : options.optionArg;
        //     return {
        //         'food': {
        //             url: 'http://food.icon.url'
        //         },
        //         'cloth': {
        //             url: 'http://cloth.icon.url'
        //         },
        //         'house': {
        //             url: 'http://house.icon.url'
        //         },
        //         'transport': {
        //             url: 'http://transport.icon.url'
        //         }
        //     };
        // };

        function fakeCategories () {
            return {
                sweat: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                },
                cry: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                },
                love: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                },
                startle: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                },
                fire: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                },
            };
        }

        function fakePostData() {
            return [
                {"id": 1, "title": "mi. Duis risus odio, auctor vitae, aliquet nec,"},
                {"id": 2, "title": "gravida non, sollicitudin a, malesuada id,"},
                {"id": 3, "title": "porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc"},
                {"id": 4, "title": "dolor elit, pellentesque a, facilisis non, bibendum sed,"},
                {"id": 5, "title": "Sed dictum."},
                {"id": 6, "title": "penatibus et magnis dis"},
                {"id": 7, "title": "vel quam"},
                {"id": 8, "title": "libero mauris, aliquam eu, accumsan"},
                {"id": 9, "title": "cursus in, hendrerit consectetuer, cursus et,"},
                {"id": 10, "title": "eget laoreet posuere, enim nisl elementum purus, accumsan interdum"},
                {"id": 11, "title": "malesuada fames ac turpis egestas."},
                {"id": 12, "title": "mattis velit justo nec ante. Maecenas mi felis, adipiscing"},
                {"id": 13, "title": "Nulla eu neque pellentesque"},
                {"id": 14, "title": "vel arcu eu odio tristique pharetra."},
                {"id": 15, "title": "egestas. Duis ac arcu. Nunc mauris. Morbi non"},
                {"id": 16, "title": "vitae,"},
                {"id": 17, "title": "eget, volutpat"},
                {"id": 18, "title": "justo eu arcu. Morbi sit amet massa. Quisque"},
                {"id": 19, "title": "sit amet, consectetuer adipiscing elit. Etiam laoreet, libero"},
                {"id": 20, "title": "lectus pede et risus. Quisque libero lacus,"},
                {"id": 21, "title": "ut, molestie in, tempus eu, ligula. Aenean euismod mauris eu"},
                {"id": 22, "title": "nulla"},
                {"id": 23, "title": "vitae, sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum"},
                {"id": 24, "title": "faucibus lectus, a sollicitudin orci sem eget massa."},
                {"id": 25, "title": "dictum magna."},
                {"id": 26, "title": "Suspendisse aliquet, sem ut"},
                {"id": 27, "title": "morbi tristique senectus et"},
                {"id": 28, "title": "nec tempus scelerisque, lorem"},
                {"id": 29, "title": "nec tempus scelerisque,"},
                {"id": 30, "title": "dictum ultricies ligula. Nullam enim. Sed nulla"},
                {"id": 31, "title": "imperdiet nec, leo."},
                {"id": 32, "title": "Mauris"},
                {"id": 33, "title": "elit elit"},
                {"id": 34, "title": "malesuada malesuada. Integer id magna"},
                {"id": 35, "title": "Donec tempor, est ac mattis semper, dui"},
                {"id": 36, "title": "at risus. Nunc"},
                {"id": 37, "title": "nec luctus"},
                {"id": 38, "title": "primis in faucibus orci luctus et ultrices posuere cubilia Curae;"},
                {"id": 39, "title": "imperdiet dictum magna. Ut tincidunt"},
                {"id": 40, "title": "et pede. Nunc sed orci lobortis augue scelerisque"},
                {"id": 41, "title": "natoque penatibus et magnis dis parturient"},
                {"id": 42, "title": "a, dui. Cras pellentesque."},
                {"id": 43, "title": "justo"},
                {"id": 44, "title": "urna, nec"},
                {"id": 45, "title": "sagittis semper."},
                {"id": 46, "title": "magna. Praesent interdum ligula eu enim. Etiam"},
                {"id": 47, "title": "libero"},
                {"id": 48, "title": "laoreet,"},
                {"id": 49, "title": "enim mi tempor lorem,"},
                {"id": 50, "title": "lorem tristique aliquet. Phasellus fermentum convallis ligula."},
                {"id": 51, "title": "amet luctus vulputate,"},
                {"id": 52, "title": "lobortis. Class aptent taciti sociosqu ad"},
                {"id": 53, "title": "dis parturient montes, nascetur"},
                {"id": 54, "title": "Fusce feugiat. Lorem"},
                {"id": 55, "title": "enim. Mauris quis turpis vitae purus gravida sagittis. Duis gravida."},
                {"id": 56, "title": "lorem, luctus ut, pellentesque"},
                {"id": 57, "title": "sed consequat auctor,"},
                {"id": 58, "title": "et magnis dis parturient montes,"},
                {"id": 59, "title": "erat vel"},
                {"id": 60, "title": "mollis dui, in"},
                {"id": 61, "title": "vestibulum. Mauris magna. Duis"},
                {"id": 62, "title": "at sem molestie sodales. Mauris blandit enim"},
                {"id": 63, "title": "Nunc sed orci lobortis"},
                {"id": 64, "title": "id enim."},
                {"id": 65, "title": "Sed malesuada augue ut lacus. Nulla tincidunt, neque vitae"},
                {"id": 66, "title": "velit dui,"},
                {"id": 67, "title": "vitae velit egestas"},
                {"id": 68, "title": "fringilla, porttitor vulputate, posuere"},
                {"id": 69, "title": "ante. Maecenas mi felis,"},
                {"id": 70, "title": "sit amet lorem"},
                {"id": 71, "title": "Ut"},
                {"id": 72, "title": "diam. Proin dolor. Nulla"},
                {"id": 73, "title": "Phasellus vitae mauris sit amet lorem semper"},
                {"id": 74, "title": "tempus, lorem fringilla ornare placerat,"},
                {"id": 75, "title": "quis lectus."},
                {"id": 76, "title": "varius. Nam porttitor scelerisque neque. Nullam nisl."},
                {"id": 77, "title": "tortor at risus. Nunc ac sem ut dolor dapibus gravida."},
                {"id": 78, "title": "sodales purus, in molestie tortor nibh sit amet orci. Ut"},
                {"id": 79, "title": "non enim commodo hendrerit. Donec"},
                {"id": 80, "title": "orci sem eget massa. Suspendisse eleifend."},
                {"id": 81, "title": "auctor ullamcorper, nisl arcu"},
                {"id": 82, "title": "ligula elit, pretium et, rutrum non, hendrerit id, ante. Nunc"},
                {"id": 83, "title": "dictum eleifend, nunc risus varius orci, in consequat enim diam"},
                {"id": 84, "title": "Nunc mauris. Morbi non sapien molestie"},
                {"id": 85, "title": "purus. Maecenas libero"},
                {"id": 86, "title": "lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi."},
                {"id": 87, "title": "lectus rutrum"},
                {"id": 88, "title": "massa. Suspendisse eleifend. Cras sed leo. Cras vehicula aliquet"},
                {"id": 89, "title": "Duis dignissim tempor"},
                {"id": 90, "title": "posuere cubilia Curae;"},
                {"id": 91, "title": "erat. Sed nunc est, mollis non, cursus non, egestas a,"},
                {"id": 92, "title": "amet orci. Ut sagittis lobortis"},
                {"id": 93, "title": "et ipsum cursus vestibulum."},
                {"id": 94, "title": "sed sem egestas blandit. Nam nulla magna, malesuada"},
                {"id": 95, "title": "sapien molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam"},
                {"id": 96, "title": "turpis. Nulla aliquet."},
                {"id": 97, "title": "commodo auctor"},
                {"id": 98, "title": "risus. Donec nibh enim, gravida sit amet, dapibus id,"},
                {"id": 99, "title": "tempor diam dictum"},
                {"id": 100, "title": "eget, volutpat ornare, facilisis eget, ipsum. Donec sollicitudin adipiscing ligula."}
            ];
        }

        function fakeThumbnails () {
            return [
                'http://orig15.deviantart.net/e5f7/f/2011/133/1/2/female_cockatail_by_mana_l-d3g8p4i.jpg',
                'https://s-media-cache-ak0.pinimg.com/736x/d0/81/27/d0812729279f317934e1f6607fea02b7.jpg',
                'http://i.imgur.com/pF5IDtF.gif',
                'http://i.imgur.com/10o5PVn.jpg',
                'http://c.share.photo.xuite.net/paling/1c293bb/19749972/1113796711_o.jpg',
                'http://c.share.photo.xuite.net/paling/1c29380/19749972/1113692204_o.jpg',
                'http://c.share.photo.xuite.net/paling/1c29336/19749972/1113694946_o.jpg',
            ];
        }


        function pickRandomDate () {
            if(!self.datePresets){
                var dateObj = new Date();
                self.datePresets = [0];
                // a year ago
                dateObj.setFullYear(dateObj.getFullYear()-1);
                self.datePresets.push(dateObj.getTime());
                // a month ago
                dateObj.setTime(Date.now());
                dateObj.setMonth(dateObj.getMonth()-1);
                self.datePresets.push(dateObj.getTime());
                // a week ago
                dateObj.setTime(Date.now());
                dateObj.setDate(dateObj.getDate()-7);
                self.datePresets.push(dateObj.getTime());
                // today
                dateObj.setTime(Date.now());
                dateObj.setHours(0, 0, 0, 0);
                self.datePresets.push(dateObj.getTime());  
            }

            var start = _.sample(self.datePresets);
            var offset = Math.floor(Math.random() * (Date.now() - start));
            return start + offset;
        }
    }
})();