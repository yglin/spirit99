/*
* @Author: yglin
* @Date:   2016-05-22 10:50:29
* @Last Modified by:   yglin
* @Last Modified time: 2016-05-27 18:38:00
*/

'use strict';

var Q = require('q');
var exec = require('child_process').exec;

module.exports = {
    clear: clear,
    newChannel: newChannel()
}

function clear() {
    var done = Q.defer();
    var cmdCleanupDatabase = 'mysql -uyglin -pturbogan -e "DELETE FROM station.channel where id = ggyy; DROP DATABASE IF EXISTS ggyy;"';
    exec(cmdCleanupDatabase, function (error, stdout, stderr) {
        if(error) {
            // grunt.log.error('Fail to clean up database!!');
            // grunt.log.error(cmdCleanupDatabase);
            // grunt.log.error('Error ==========================');
            // grunt.log.error(error);
            // grunt.log.error('Stdout =========================');
            // grunt.log.error(stdout);
            // grunt.log.error('Stderr =========================');
            // grunt.log.error(stderr);
            // grunt.log.error('================================');
            done.reject(error);
        }
        else{
            done.resolve();
        }
    });
    return done.promise;
}

function newChannel() {
    return  {
        id: 'ggyy',
        title: '唧唧歪歪',
        description: '唧唧歪歪雞雞歪歪',
        'logo-url': 'https://emos.plurk.com/92fe2c75e52cd5dc99f6e98f6f50d5aa_w48_h48.jpeg',
        categories: {
            1: {
                title: 'sweat',
                icon: {
                    url: 'http://findicons.com/files/icons/2020/2s_space_emotions/32/sweat.png'
                }
            },
            2: {
                title: '哭哭',
                icon: {
                    url: 'http://findicons.com/files/icons/2020/2s_space_emotions/32/cry.png'
                }
            },
            3: {
                title: 'love',
                icon: {
                    url: 'http://findicons.com/files/icons/2020/2s_space_emotions/32/love.png'
                }
            },
            5: {
                title: 'startle',
                icon: {
                    url: 'http://findicons.com/files/icons/2020/2s_space_emotions/32/startle.png'
                }
            },
            7: {
                title: '龜藍波火',
                icon: {
                    url: 'http://findicons.com/files/icons/2020/2s_space_emotions/32/fire.png'
                }
            }
        },
        state: 'public',
    };
}