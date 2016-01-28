(function() {
    'use strict';

    var ZOOM_LEVELS = {
        STREET: 15,
        TAIWAN: 7
    };

    angular
    .module('spirit99')
    .constant('ZOOM_LEVELS', zoomLevelsProvider())
    .constant('DEFAULTS', defaultsProvider());

    function zoomLevelsProvider () {
        return ZOOM_LEVELS;
    }

    function defaultsProvider() {
        return {
            userCtrls: {
                selectedSidenav: 'channel-list'
            },
            map: {
                center: { latitude: 23.973875, longitude: 120.982024 },
                zoom: ZOOM_LEVELS.TAIWAN,
                bounds: {
                    southwest: {latitude: 0, longitude: 0},
                    northeast: {latitude: 0, longitude: 0}
                }
            },
            channels: {
                'nuclear-waste': {
                    portalUrl: 'http://localhost:3000/nuclear-waste/portal/',
                    id: 'nuclear-waste',
                    title: '核廢料掩埋場',
                    description: '創造非核家園',
                    introUrl: 'http://www.google.com',
                    logoUrl: 'https://yt3.ggpht.com/-Gd9lF_AqQPk/AAAAAAAAAAI/AAAAAAAAAAA/afbtVZjs18E/s88-c-k-no/photo.jpg',
                    categories: {
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
                        }
                    }
                },
                
                'localooxx': {
                    portalUrl: 'http://localhost:3000/localooxx/portal/',
                    id: 'localooxx',
                    title: '呆呆要不要借醬油',
                    description: '要不要要不不要要不要要要要不要要不要ㄚ呆呆',
                    introUrl: 'http://www.google.com',
                    logoUrl: 'https://www.evansville.edu/residencelife/images/greenLogo.png'
                },

                'birdy-go-home': {
                    portalUrl: 'http://localhost:3000/birdy-go-home/portal/',
                    id: 'birdy-go-home',
                    title: '小小鳥兒要回家',
                    description: '幫助在外流浪的鳥兒回到鳥奴身邊',
                    introUrl: 'http://www.google.com',
                    logoUrl: 'http://www.mrspeaker.net/images/wafty-icon.png'
                }                
            },

            'iconObject': {
                url: 'http://icons.iconarchive.com/icons/icons-land/vista-map-markers/256/Map-Marker-Flag-3-Right-Chartreuse-icon.png',
                scaledSize: {
                    width: 32,
                    height: 32
                }
            }

        };
    }

})();