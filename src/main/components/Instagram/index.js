import axios from 'axios'
import request from 'request-promise'

class Instagram {
  constructor () {
    this.url = 'https://www.instagram.com/'
    this.headers = {
      'accept': '*/*',
      'accept-language': 'es-ES,es;q=0.9',
      'accept-encoding': 'gzip, deflate, br',
      'connection': 'keep-alive',
      'host': 'www.instagram.com',
      'origin': 'https://www.instagram.com',
      'referer': 'https://www.instagram.com/',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/63.0.3239.84 Chrome/63.0.3239.84 Safari/537.36',
      'upgrade-insecure-requests': '1',
      'content-type': 'application/x-www-form-urlencoded'
    }

    this.cookies = []
    this.store = {}
    this.status = {
      authenticated: false,
      username: null
    }
  }

  login (username, password) {
    let options = {
      method: 'GET',
      uri: this.url,
      resolveWithFullResponse: true
    }
    return new Promise((resolve, reject) => {
      request(options)
        .then((response) => {
          this.parseCookies(response.headers['set-cookie'])
          this.headers['x-instagram-ajax'] = '1'
          this.headers['x-requested-with'] = 'XMLHttpRequest'
          this.headers.authority = 'www.instagram.com'
          options = {
            method: 'POST',
            uri: 'https://www.instagram.com/accounts/login/ajax/',
            gzip: true,
            resolveWithFullResponse: true,
            headers: this.headers,
            form: {
              'username': username,
              'password': password
            }
          }
          request(options)
            .then((response) => {
              const data = JSON.parse(response.body)
              if (data.authenticated) {
                this.parseCookies(response.headers['set-cookie'])
                this.status.authenticated = true
                this.status.username = username
              }
              return resolve(data)
            })
            .catch((error) => {
              return reject(error)
            })
        })
        .catch((error) => {
          return reject(error)
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

  getFollowers (userId, first = 20, after = '') {
    const options = {
      method: 'GET',
      uri: `https://www.instagram.com/graphql/query/?query_id=17851374694183129&variables={"id":"${userId}","first":${first},"after":"${after}"}`,
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers
    }
    return request(options)
      .then((response) => {
        this.parseCookies(response.headers['set-cookie'])
        const data = JSON.parse(response.body)
        return {
          followers: data.data.user.edge_followed_by.edges.map(elem => elem.node),
          page_info: data.data.user.edge_followed_by.page_info
        }
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

  getProfile () {
    if (this.status.authenticated) {
      return this.getUserInfo(this.status.username)
    } else {
      return null
    }
  }

  getUserInfo (username) {
    const options = {
      method: 'GET',
      uri: `https://www.instagram.com/${username}/?__a=1`,
      gzip: true,
      resolveWithFullResponse: true,
      headers: this.headers
    }
    return request(options)
      .then((response) => {
        const data = JSON.parse(response.body)
        this.parseCookies(response.headers['set-cookie'])
        return data.user
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
