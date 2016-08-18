'use strict'

const ghUser = require('gh-user')
const pinnedRepos = require('gh-pinned-repos')
const npmUser = require('npm-user')

module.exports = function whoThat (who) {
  return new Promise((resolve, reject) => {
    ghUser(who.github)
      .then(gh => Object.assign({}, gh))
      .then(data => (
        pinnedRepos(who.github)
          .then(pinned => Object.assign({}, data, { pinned }))
      ))
      .then(data => {
        if (who.npm) {
          return npmUser(who.npm).then(npm => Object.assign({}, npm, data))
        } else {
          return data
        }
      })
      .then(resolve)
      .catch(reject)
  })
}
