import axios from 'axios'
import path from 'path'
import request from 'request-promise'
let Client = require('instagram-private-api').V1

class Instagram {
  constructor (db) {
    this.url = 'https://www.instagram.com/'
    this.headers = {
      'accept': '*/*',
      'accept-language': 'es-ES,es;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'content-length': '0',
      'connection': 'keep-alive',
      'host': 'www.instagram.com',
      'origin': 'https://www.instagram.com',
      'referer': 'https://www.instagram.com/',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36',
      'content-type': 'application/x-www-form-urlencoded',
      'x-instagram-ajax': '1',
      'x-requested-with': 'XMLHttpRequest'
    }
    this.db = db
    this.username = null
    this.password = null
    this.device = null
    this.storage = null
    this.session = null
    this.account = null

    this.cookies = []
    this.store = {}
    this.status = {
      authenticated: false,
      username: null
    }
  }

  login (username, password) {
    return new Promise((resolve, reject) => {
      this.username = username
      this.password = password
      this.device = new Client.Device(this.username)
      this.storage = new Client.CookieFileStorage(path.resolve() + `/cookies/${this.username}.json`)

      // And go for login
      let promise = Client.Session.create(this.device, this.storage, this.username, this.password)
      promise.then((session) => {
        this.session = session
        let userDoc = {
          type: 'User',
          username: this.username,
          password: this.password
        }
        this.db.update({ type: 'User' }, userDoc, { upsert: true }, (err, numReplaced, upsert) => {
          if (err) console.log(err)
          // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
          // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
        })
        return resolve()
      })
    })
  }

  checkSession () {
    return new Promise((resolve, reject) => {
      // The same rules apply when you want to only find one document
      this.db.findOne({ type: 'User' }, (err, doc) => {
        if (err) console.log(err)

        if (doc && doc.username && doc.password) {
          this.login(doc.username, doc.password)
            .then(() => resolve(true))
            .catch()
        } else {
          return resolve(false)
        }
      })
    })
  }

  isLogged () {
    return this.status.authenticated
  }

  like (photoId) {
    const options = {
      method: 'POST',
      uri: `https://www.instagram.com/web/likes/${photoId}/like/`,
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers
    }
    return request(options)
      .then((response) => {
        this.parseCookies(response.headers['set-cookie'])
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  getFollowing (userId) {
    return axios({
      method: 'get',
      url: `https://www.instagram.com/graphql/query/?query_id=17874545323001329&id=${userId}&first=20&after=`,
      headers: this.headers
    })
      .then((response) => {
        this.parseCookies(response.headers['set-cookie'])
      })
  }

  getProfile (username) {
    return this.session.getAccount(this.session, 'kgerrika').then((acc) => {
      console.log(acc)
      console.log('hemen')
      return acc
    })
  }

  getUserProfileMedia (id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      let feed = new Client.Feed.UserMedia(this.session, id)
      feed.get().then(function (media) {
        console.log(media.length)
        return resolve(media)
      })
    })
  }

  getUserMediaById (id) {
    let that = this
    return new Promise((resolve, reject) => {
      console.log(id)
      let feed = new Client.Feed.UserMedia(this.session, id)
      feed.get().then(function (media) {
        console.log('MEdia: ' + media.length)
        that.getPhotoData(media, [], function (done) {
          console.log(done[0])
          return resolve(done)
        })
        // return resolve(media)
      })
    })
  }
  getPhotoData (photos, donePhotos, callback) {
    if (photos.length === 0) {
      return callback(donePhotos)
    }
    let photo = photos.pop()
    console.log({ type: 'Likers', photo_id: photo.id })
    this.db.findOne({ type: 'Likers', photo_id: photo.id }, (err, doc) => {
      if (err) console.log(err)
      console.log(doc)
      if (doc) {
        photo.likers = doc
      }
      donePhotos.push(photo)
      this.getPhotoData(photos, donePhotos, callback)
    })
  }

  getFollowers (id) {
    return new Promise((resolve, reject) => {
      this.db.findOne({ type: 'Followers', user_id: id }, (err, doc) => {
        if (err) console.log(err)

        if (doc && doc.data && doc.data.length > 0) {
          console.log(doc.data)
          return resolve(doc.data)
        } else {
          let feed = new Client.Feed.AccountFollowers(this.session, id)

          feed.all().then((data) => {
            console.log('numero de usuarios')
            console.log(data.length)
            console.log(data[0])
            let followersData = data.map(elem => {
              return {
                id: elem.id,
                username: elem._params.username,
                fullName: elem._params.fullName,
                isPrivate: elem._params.isPrivate,
                profilePicUrl: elem._params.profilePicUrl,
                profilePicId: elem._params.profilePicId,
                picture: elem._params.picture}
            })

            let followersDoc = {
              type: 'Followers',
              user_id: id,
              data: followersData
            }
            this.db.update({ type: 'Followers', user_id: id }, followersDoc, { upsert: true }, (err, numReplaced, upsert) => {
              if (err) console.log(err)
              // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
              // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
            })
            return resolve(data)
          })
        }
      })
    })
  }

  getUserInfo (username) {
    return Client.Account.searchForUser(this.session, 'username')
      .then((acc) => {
        console.log(acc)
        console.log('hemen')
        return acc
      })
  }

  getMediaLikers (id) {
    return new Promise((resolve, reject) => {
      console.log(id)
      console.log('asdf')
      Client.Media.likers(this.session, id).then(data => {
        console.log(data.length)
        console.log(data[0])
        let likersData = data.map(elem => {
          return {
            id: elem.id,
            username: elem._params.username,
            fullName: elem._params.fullName,
            isPrivate: elem._params.isPrivate,
            profilePicUrl: elem._params.profilePicUrl,
            profilePicId: elem._params.profilePicId,
            picture: elem._params.picture}
        })

        let likersDoc = {
          type: 'Likers',
          photo_id: id,
          data: likersData
        }
        this.db.update({ type: 'Likers', photo_id: id }, likersDoc, { upsert: true }, (err, numReplaced, upsert) => {
          if (err) console.log(err)
          // numReplaced = 1, upsert = { _id: 'id5', planet: 'Pluton', inhabited: false }
          // A new document { _id: 'id5', planet: 'Pluton', inhabited: false } has been added to the collection
        })
      })
    })
  }

  getPostLikes (shortcode, first = 20, after = '') {
    const options = {
      method: 'GET',
      uri: `https://www.instagram.com/graphql/query/?query_hash=1cb6ec562846122743b61e492c85999f&variables={"shortcode":"${shortcode}","first":${first},"after":"${after}"}`,
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers
    }
    return request(options)
      .then((response) => {
        const data = JSON.parse(response.body)
        this.parseCookies(response.headers['set-cookie'])
        return {
          likes: data.data.shortcode_media.edge_liked_by.edges.map(elem => elem.node),
          page_info: data.data.shortcode_media.edge_liked_by.page_info
        }
      })
  }

  getPost (postId) {
    const options = {
      method: 'GET',
      uri: `https://www.instagram.com/p/${postId}/?__a=1`,
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers
    }
    return request(options)
      .then((response) => {
        const data = JSON.parse(response.body)
        this.parseCookies(response.headers['set-cookie'])
        return data.graphql.shortcode_media
      })
  }

  searchLocation (location) {
    const options = {
      method: 'POST',
      uri: 'https://www.instagram.com/query/',
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers,
      form: {
        'q': 'ig_location(' + location + ') { media.after(0, 12) { nodes { display_src, id, thumbnail_src } } }',
        'ref': 'locations::show',
        'query_id': ''
      }
    }
    return request(options)
      .then((response) => {
        this.parseCookies(response.headers['set-cookie'])
      })
  }

  parseCookies (cookiesArray) {
    let csrfPattern = /csrftoken=/g

    for (let i = 0; i < cookiesArray.length; i += 1) {
      const currentCookie = cookiesArray[i]
      const csrfExists = csrfPattern.test(currentCookie)

      if (csrfExists) {
        csrfPattern = /csrftoken=([a-zA-Z0-9]+)/g
        const match = csrfPattern.exec(currentCookie)
        this.store.csrfToken = match[1]
      }
      const cookie = currentCookie.split(';')[0]
      const cookieName = cookie.split('=')[0]
      const cookieValue = cookie.split('=')[1]

      /* Check if the cookie already exists and replace it */

      this.cookies[cookieName] = cookieValue
    }
    /* Remake the raw cookies */

    this.store.cookiesRaw = ''
    for (const key in this.cookies) {
      this.store.cookiesRaw += `${key}=${this.cookies[key]};`

      // The key is key
      // The value is obj[key]
    }
    this.headers.cookie = this.store.cookiesRaw
    this.headers['x-csrftoken'] = this.store.csrfToken
  }
}

export default Instagram
