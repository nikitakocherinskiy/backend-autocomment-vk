const { VK } = require("vk-io")
const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json({ charset: "utf-8" }))
const port = 5000
app.use(cors())
app.use(express.json())

const accessToken =
  "vk1.a.qNAenp473Gq79Lh8OOtWwOofAIdIPUzLW9WdtiWET3Vr0qloJ23XUMxpRuu0hEq3rgJuoJ96oxb9c3vqZPhwzUtowivtLFquOyUbwKfkj451nNsGp-R4Dtjk42Z7C8hL68C_RM-_u7ljVHYY_5SONdQtNr2seyRWPkgKQIUpOels21id6XHkU92rD-ccFJZP20yZEdBiCPK2nV2PRqDNdg"
const groupID = 223687902
const commentMessage = "hello"

const f = async (token, groupId, message) => {
  const vk = new VK({
    token: token,
  })

  const groupPostLast = await vk.api.wall.get({
    owner_id: `-${groupId}`,
    count: 1,
  })
  console.log(groupPostLast)
  let timeLastPost = groupPostLast.items[0].date
  let postIdLast = groupPostLast.items[0].id
  while (true) {
    console.log("reload")
    let groupPostCur = await vk.api.wall.get({
      owner_id: `-${groupId}`,
      count: 1,
    })
    let timeCurPost = groupPostCur.items[0].date
    let postIdCur = groupPostCur.items[0].id

    if (timeLastPost !== timeCurPost) {
      console.log(postIdCur)
      await vk.api.wall.createComment({
        owner_id: `-${groupId}`,
        post_id: postIdCur,
        message: message,
      })
      timeLastPost = timeCurPost
      postIdLast = postIdCur
      break
    }
  }
}

f(accessToken, groupID, commentMessage)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
