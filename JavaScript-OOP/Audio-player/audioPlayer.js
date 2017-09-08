function solve() {
    let getId = (function () {
        let id = 0;
        return function () {
            id += 1;
            return id;
        }
    }());
    class Player {
        constructor(name) {
            this.id = getId();
            this.name = name;
            this.playList = [];
        }

        get name() {
            return this._name;
        }

        set name(name) {
            if (name.length < 3 || name.length > 25) {
                throw Error('strings must be between 3 and 25 characters')
            }
            this._name = name;
        }

        addPlaylist(playlistToAdd) {
            if (!(playlistToAdd instanceof PlayList)) {
                throw Error('PlayList must be instance of Player');
            }
            this.playList.push(playlistToAdd);
            return this;
        }

        getPlaylistById(id) {
            let result = this.playList.find(c=>c.id === id);
            return result;
        }

        removePlaylist(id) {
            if (typeof id === 'number') {
                //let result = this.products.findIndex(c=>Object.keys(product).every(p=>product[p] === c[p]));
                let index = this.playList.findIndex(c=>c.id === id);
                this.playList.splice(index, 1);
            }
            if (typeof id === 'object') {
                let index = this.playList.findIndex(c=>Object.keys(id).every(p=>id[p] === c[p]));
                this.playList.splice(index, 1);


            }
            return this;
        }

        listPlaylists(page, size) {

            if (page < 0 || size <= 0) {
                throw Error('Page or size incorect');
            }
            //sort((x,y)=>{const cmp =y.speed-x.speed;if(cmp===0){return x.name.localeCompare(y.name);}return cmp});
            let sortedPlayList = this.playList.sort((x, y)=> {
                let cmp = x.name.localeCompare(y.name);
                if (cmp === 0) {
                    return x.id - y.id
                }
                ;
                return cmp
            });

        }

        contains(playable, playlist) {

        }

        search(pattern) {

        }
    }
    class PlayList extends Player{
        constructor(name) {
            super(name);
            //this.name = name;
            //this.id = getId();
        }

        //get name() {
        //    return this._name;
        //}
//
        //set name(name) {
        //    this._name = name;
        //}

        addPlayable(playable) {
            this.playList.push(playable);
return this;
        }

        getPlayableById(id) {
let result = super.getPlaylistById(id);
            if(typeof result==='undefined'){throw Error(null)}
        }

        removePlayable(id) {
super.removePlaylist(id);
        }

        removePlayable(playable) {

        }

        listPlayables(page, size) {

        }

    }
    class Playable {
        constructor(title, author) {
            this.id = getId();
            this.title = title;
            this.author = author;
        }

        get title() {
            return this._title;
        }

        set title(title) {
            if (title.length < 3 || title.length > 25) {
                throw Error('strings must be between 3 and 25 characters')
            }
            this._title = title;
        }

        get author() {
            return this._author;
        }

        set author(author) {
            if (author.length < 3 || author.length > 25) {
                throw Error('strings must be between 3 and 25 characters')
            }
            this._author = author;
        }


        play() {
            let result = [`[${this.id}]. [${this.title}] - [${this.author}]`];
            return result[0];
        }
    }
    class Audio extends Playable {
        constructor(title, author, length) {
            super(title, author);
            //this.id=getId;
            this.length = length;
        }

        get length() {
            return this._length;
        }

        set length(length) {
            if(length<0){throw Error('Length must be a positive number')}
            this._length = length;
        }

        play() {
            //super.play();
            let result=(super.play()+` - [${this._length}]`);
            return result;

        }
    }
    class Video extends Playable {
        constructor(title, author, imdbRating) {
            super(title, author);
            // this.id=getId;
            this.imdbRating = imdbRating;
        }

        get imdbRating() {
            return this._imdbRating;
        }

        set imdbRating(imdbRating) {
            if (imdbRating < 1 || imdbRating > 5) {
                throw Error('number, between 1 and 5');
            }
            this._imdbRating = imdbRating;
        }

        play() {
            let result=(super.play()+` - [${this._imdbRating}]`);
            return result;
        }
    }

    const module = {
        getPlayer: function (name) {
            return new Player(name);
        },
        getPlaylist: function (name) {
            return new PlayList(name);
        },
        getAudio: function (title, author, length) {
            return new Audio(title, author, length);
        },
        getVideo: function (title, author, imdbRating) {
            return new Video(title, author, imdbRating);
        }
    };

    return module;
}

module.exports = solve;
//let audioPlayer = solve();
//let player = audioPlayer.getPlayer('Batman\'s playlist');
//let player1 = audioPlayer.getPlayer('Jenata Kotka\'s playlist');
//
//let playlist = audioPlayer.getPlaylist('PlayList na Batman');
//let playlist1 = audioPlayer.getPlaylist('PlayList na Aenata Kotka');
//
//player.addPlaylist(playlist);
//player.addPlaylist(playlist1);
//
//player.getPlaylistById(1);
////player.removePlaylist(playlist);
//player.listPlaylists(1,1);
//let audio=audioPlayer.getAudio('title','audo','leng');
//console.log(audio.play())
//let playList = audioPlayer.getPlaylist('playList');
//console.log(playList);
//playList.getPlayableById(6);
