(function() {
    'use strict';

    angular
        .module('spirit99')
        .service('FakeData', FakeData);

    FakeData.$inject = ['$q'];

    /* @ngInject */
    function FakeData($q) {
        var self = this;
        self.fakeChannels = fakeChannels();
        self.fakeCategories = fakeCategories();
        self.genFakePosts = genFakePosts;

        function genFakePosts(options) {
            options = typeof options === 'undefined' ? {} : options;
            options.count = typeof options.count === 'undefined' ? 10 : options.count;
            var count = Math.min(options.count, 100);
            var categories = Object.keys(fakeCategories());
            var thumbnails = fakeThumbnails();
            var fakeTitles = fakePostTitles(count);

            var posts = [];
            for (var i = 0; i < count; i++) {
                var post = {};
                post.id = i + 1;
                post.title = fakeTitles[i];
                post.latitude = 23.973875 + 2 * (0.5 - Math.random());
                post.longitude = 120.982024 + 2 * (0.5 - Math.random());
                post.create_time = pickRandomDate();
                if(Math.random() > 0.2){
                    post.category = _.sample(categories);
                }
                if(Math.random() > 0.5){
                    post.thumbnail = _.sample(thumbnails);
                }
                posts.push(post);
            };
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
                },
                invalid: {
                    ggyy: null
                }
            };
        }

        function fakePostTitles(count) {
            var fakeTitles = ["天哪，可是已經晚了……請你以後不要在我面前說英文了，OK？","呼嘯過，然後這麼說：「那未知的擦身而過，天空要狩獵海洋。","第2，又，當然有不方便的地方，地方制度法是相對的特別法耶！","3，《傳產》華航攜手淡大，鋼琴16隻手聯彈，養雞場淪陷！","請允許我，我什麼都不要，我希望老的時候可以牽著妳的手散步。","3，2，中和某國中，臺中好好玩中市推出全新智慧型旅遊平台。","生，年輕的時候，懷才就像懷孕，錢對你來說真的就那麼重要嗎？","最痛的紀念品逆風的方向，cha你在泛舟，改變既有的模式！","!，阿....不會吧???iPad，傳陳冠希示愛，比較對？","做戰略最忌諱的是面面俱到，什麼是團隊呢？","還不賴，還不賴，還不賴，還不賴，還不賴？","看是要停止，標準普爾把我們財政展望，妳也要讓我說明一下啊！","秋奈婆婆，真是太好了對吧，本官正在做新發售的MG吉翁是也。","人生中最重要的問題是：你有沒有讓這個世界變得比你出生時更好？","乾眼症嚴重可致失明，6旬病翁撞火車亡，低級趣味難笑。","Pro，Mark，張德正恐嚇案開庭前妻庭中淚訴：放過我吧！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","基本面強勁，中國遊客巴基斯坦遭綁架塔利班一分支宣布負責。","一封簡訊，早晨七點，买好咖啡，一冰一热，你们就没有糖浆吗？","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","不運動，台北，AV女優大學開講，壽司和蒼井空的關連在哪裡？","創業要找最適合的人，也要注重過程，就怕不在社會上讀書。","参和，重點是我現在這麼累要是抽下去就ㄎㄧㄤ掉，可樂，不賴！","現在我不敢肯定，那麼餘下四分之三的時光請讓我來守護你好嗎？","oh，快活的魂魄，就深藏在心我好想你，安睡在天地的大房間。","奉行正朔，雖亦有人反對，一到過年，我的意見，老不死的混蛋！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","羅宋湯配肉丸我站在終點的面前，我都要給你一個讚殊途同歸？","還不賴，還不賴，還不賴。","已習慣忽略，我不怕千萬人阻擋，你會在哪裡，改變既有的模式！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴！","感謝上師，感謝上師，感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","我什麼都不要，我誰都不要，我願用一萬次去換與你的相遇。","感謝上師，感謝上師，感謝上師，讚嘆師父！","愛情，退一步海闊天空，女孩富著養，不吃飽哪有力氣減肥啊？","喝了杯咖啡，一封簡訊，新機車！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","我們有揭露，講得不對，至於他們與哪個部會相關，哪一樣？","等一會，翌日，愈著急愈覺得金錢的寶貴，只是望面的所向而行。","多一點委屈，現在你需要踏踏實實，什麼是團隊呢？","我的小彼得，扮一個漁翁，花草的顏色與香息裡尋得？","晚餐時，但長期卻會讓你窒息，你要我怎樣去改變別的人的人生？","如果是真的，那麼餘下四分之三的時光請讓我來守護你好嗎？","其次，我說我們有這麼多的席次，我們絕對不會辜負你的期待。","感謝上師，感謝上師，讚嘆師父！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","沒有權，懷才就像懷孕，一旦累死了，在哪裡跌倒就在哪裡躺下。","蘋果日報，好心乘客讓出肩膀，.......他就是林書豪！","還不賴，還不賴，還不賴！","），好啊，向面的所向，和純真的孩童們，是怎樣生竟不如其死？","愛情，女人之美，你們快點出名吧，沒有權，男人之美，不容易。","好，一樣呻吟於不幸的人們，總在等待過年的快樂，險些兒跌倒。","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","但無論如何，有孩子，他拍拍我的背，因為他們的書實在太重了！","蘋果日報，調查顯示多數民眾希望停建核四，你們還記得她嗎？","雨真的很大，裸少年抓青蛙雕像被嫌礙眼，這不是教學，比較對？","還不賴，還不賴，還不賴！","最近的天氣教會我，就好像咖啡，一杯咖啡不夠喝，無瑕。","在遜中又流露了點，這幾片如何，尾巴？","強盛到肉體的增長，接著又說，我們婦女竟是消遣品，是妄是愚？","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","有的人，他的伴侶，禮這一字是很可利用的東西，這有什麼含義？","感謝上師，感謝上師，感謝上師，感謝上師，…","濛迷地濃結起來，使人們沒有年歲的感覺，就有這樣的不同？","太好笑了，有偽善者的味道喔。","還不賴，還不賴，還不賴，還不賴！","過了些時，這一句千古名言，故過年的規定遂各不同，就和解去。","什麼都別說了，那麼餘下四分之三的時光請讓我來守護你好嗎？","而是要跟未來，關係特別不可靠，永遠要把對手想得非常強大，…","I，叔叔、阿姨，救救長毛驢，荒唐警瘋SM，大家都沒事吧！","感謝上師，感謝上師，感謝上師，感謝上師，感謝上師，…","我想早戀，沒有錢，想起來還是幼兒園比較好混！","生性如此，這是經過科學的證明，他就發出歡喜的呼喊，丙問。","希望保持距離，我爸在也在醫科教書，並真正開始改善日常情況。","我和我的倔強長大後發現，撇開日子的奔忙，改變既有的模式！","那麼餘下四分之三的時光請讓我來守護你好嗎？","任誰都想侵略看看的行星，很好，價格，那是他製造出來的模型。","換，水餃25顆、川燙地瓜葉、蝦仁烘蛋、酸辣湯，还是有点晕！","雪西裡與普陀山，她的忍耐，他們的獨子，我只是悵惘我只能問。","我們尊重您的權利，國會監督是指國會通過就過關生效，啦！","這點，因為人家有可能會來挖角，可是我尊重主張台獨的朋友啊！","網路封鎖失靈，陶冬：希債稍緩，美就業成長驚豔失業率回升。","第一次喝就愛上那個味，幾年來，灌了果汁和咖啡，最是寂寞。","感謝上師，感謝上師，感謝上師，感謝上師，感謝師父。","我什麼都不要，跟我生可愛的孩子吧！","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴？","有人說，然而被騷擾的不悅感與日俱增，NBA總裁不邀林書豪。","還不賴，還不賴，還不賴，還不賴，還不賴，還不賴，還不賴！","愛你，認識你，比如去一果子園，只許你，我只是悵惘我只能問。","水手官網專訪，紙張可以丟了！","呂明賜帶中華隊，中和某國中，學運害今年取消夫妻懲罰稅沒了？","理念很難考量，現在你需要踏踏實實，你的路可能就走偏掉。","如果是真的，什麼都別說了，我什麼都不要，嫁給我就對了！","我不提，我可能瞭解高雄市，如果加上特別預算，我能夠阻止嗎？","猶不能放他們一刻空閒，現在不是糴不到半斗米？","你應該做的不是去挑戰它，品質不僅僅是團隊，什麼是團隊呢？","我們也樂得輕鬆，別逗了啦，默示錄擊，看起來感覺挺好的說。"];
            return fakeTitles.slice(0, count);
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

        function fakeChannels () {
            return {
                'nuclear-waste': {
                    'portal-url': 'http://localhost:3000/nuclear-waste/portal/',
                    id: 'nuclear-waste',
                    title: '核廢料掩埋場',
                    description: '創造非核家園',
                    'intro-url': 'http://www.google.com',
                    'logo-url': 'https://yt3.ggpht.com/-Gd9lF_AqQPk/AAAAAAAAAAI/AAAAAAAAAAA/afbtVZjs18E/s88-c-k-no/photo.jpg',
                    'query-url': 'http://localhost:3000/nuclear-waste/post/',
                    categories: fakeCategories()
                },
                
                'localooxx': {
                    'portal-url': 'http://localhost:3000/localooxx/portal/',
                    id: 'localooxx',
                    title: '呆呆要不要借醬油',
                    description: '要不要要不不要要不要要要要不要要不要ㄚ呆呆',
                    'intro-url': 'http://www.google.com',
                    'logo-url': 'https://www.evansville.edu/residencelife/images/greenLogo.png',
                    'query-url': 'http://localhost:3000/localooxx/post/',
                },

                'birdy-go-home': {
                    'portal-url': 'http://localhost:3000/birdy-go-home/portal/',
                    id: 'birdy-go-home',
                    title: '小小鳥兒要回家',
                    description: '幫助在外流浪的鳥兒回到鳥奴身邊',
                    'intro-url': 'http://www.google.com',
                    'logo-url': 'http://www.mrspeaker.net/images/wafty-icon.png',
                    'query-url': 'http://localhost:3000/birdy-go-home/post/',
                }                
            };
        }
    }
})();