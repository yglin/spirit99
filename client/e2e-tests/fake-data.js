'use strict';

exports.channels = channels();

function channels () {
    return {
        'nuclear-waste': {
            'portal-url': 'http://localhost:3000/nuclear-waste/portal/',
            id: 'nuclear-waste',
            title: '核廢料掩埋場',
            description: '創造非核家園',
            'intro-url': 'http://www.google.com',
            'logo-url': 'https://yt3.ggpht.com/-Gd9lF_AqQPk/AAAAAAAAAAI/AAAAAAAAAAA/afbtVZjs18E/s88-c-k-no/photo.jpg',
            'post-url': 'http://localhost:3000/nuclear-waste/post/',
            categories: {
                sweat: {
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                    }
                },
                cry: {
                    title: '哭哭',
                    icon: {
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                    }
                },
                love: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                },
                startle: {
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                },
                fire: {
                    title: '龜藍波火',
                    icon: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                }
            }
        },
        
        'localooxx': {
            'portal-url': 'http://localhost:3000/localooxx/portal/',
            id: 'localooxx',
            title: '呆呆要不要借醬油',
            description: '要不要要不不要要不要要要要不要要不要ㄚ呆呆',
            'intro-url': 'http://www.google.com',
            'logo-url': 'https://www.evansville.edu/residencelife/images/greenLogo.png',
            'post-url': 'http://localhost:3000/localooxx/post/',
        },

        'birdy-go-home': {
            'portal-url': 'http://localhost:3000/birdy-go-home/portal/',
            id: 'birdy-go-home',
            title: '小小鳥兒要回家',
            description: '幫助在外流浪的鳥兒回到鳥奴身邊',
            'intro-url': 'http://www.google.com',
            'logo-url': 'http://www.mrspeaker.net/images/wafty-icon.png',
            'post-url': 'http://localhost:3000/birdy-go-home/post/',
        }                
    };
}
