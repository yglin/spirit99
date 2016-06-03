/*
* @Author: yglin
* @Date:   2016-05-31 16:38:14
* @Last Modified by:   yglin
* @Last Modified time: 2016-06-01 10:33:37
*/

'use strict';

module.exports = {
    users: [
        {
            provider: 'local',
            name: 'Test User',
            email: 'test@example.com',
            password: 'test'
        }, 
        {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@example.com',
            password: 'admin'
        }
    ],
    channels: [
        {
            id: 'nuclear-test-field',
            title: '核子試爆場',
            description: '測試新功能，以及給使用者隨便亂搞，資料不定時會清除',
            'logo-url': 'https://i.warosu.org/data/sci/img/0073/32/1434439598515.jpg',
            'categories': {
                1: {
                    title: 'sweat',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/sweat.png'
                    }
                },
                2: {
                    title: '哭哭',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/cry.png'
                    }
                },
                3: {
                    title: 'love',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/love.png'
                    }
                },
                4: {
                    title: 'startle',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/startle.png'
                    }
                },
                5: {
                    title: '龜藍波火',
                    icon: {
                        anchor: 'right',
                        url: 'http://findicons.com/files/icons/2020/2s_space_emotions/128/fire.png'
                    }
                }
            },
            owner_id: 1,
            state: 'public'
        }
    ]
}