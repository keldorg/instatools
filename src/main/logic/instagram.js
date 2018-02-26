const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const getUserFollowers = (username, insta, mainWindow) => {
  return new Promise(async (resolve, reject) => {
    insta.getUserInfo(username)
      .then(async (userInfo) => {
        const userId = userInfo.id
        mainWindow.webContents.send('log', 'Buscando followers de : ' + username)
        mainWindow.webContents.send('log', `Followers: ${userInfo.followed_by.count}`)
        let data = await insta.getFollowers(userId)
        let followers = data.followers
        let find = data.page_info.has_next_page
        while (find) {
          await sleep((Math.random() * 1 + 1) * 1000) // sleep between 1 and 3 seconds
          data = await insta.getFollowers(userId, 500, data.page_info.end_cursor)
          followers = followers.concat(data.followers)
          mainWindow.webContents.send('log', `Followers: ${followers.length}`)
          find = data.page_info.has_next_page
        }
        await sleep((Math.random() * 3 + 1) * 1000) // sleep between 1 and 3 seconds
        mainWindow.webContents.send('log', `El usuario ${username} tiene ${followers.length} followers`)
        await sleep((Math.random() * 15 + 15) * 1000) // sleep between 1 and 3 seconds
      })
  })
}

const likeUserListFirstPost = async (usernames, insta, mainWindow) => {
  let kont = 1
  for (const username of usernames) {
    try {
      let userInfo = await insta.getUserInfo(username)
      mainWindow.webContents.send('log', `Buscando primer Post de ${username}`)
      if (userInfo.media.nodes.length > 0) {
        const post = await insta.getPost(userInfo.media.nodes[0].code)
        await sleep((Math.random() * 2 + 1) * 1000)
        if (!post.viewer_has_liked) {
          mainWindow.webContents.send('log', 'Dando like al Post!')
          await insta.like(userInfo.media.nodes[0].id)
        } else {
          mainWindow.webContents.send('log', 'Este Post ya tenia mi like!')
        }
      } else {
        mainWindow.webContents.send('log', 'Este Post ya tenia mi like!')
      }
      mainWindow.webContents.send('log', 'Terminado usuario #' + kont + ' de un total de ' + usernames.length)
      kont++
      await sleep((Math.random() * 5 + 1) * 1000)
    } catch (error) {
      if (error.statusCode === 404) {
        mainWindow.webContents.send('log', 'Este usuario no se ha encontrado!')
      } else {
        mainWindow.webContents.send('log', 'Ha ocurrido algun error chungo, cierro por si acaso! Error: ' + error.statusCode)
      }
    }
  }
}

export { likeUserListFirstPost, getUserFollowers }
