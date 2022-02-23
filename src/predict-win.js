import constants from './constants'
import util from './util'
import { phiMajor } from './statistics'

const predictWin = (teams, options = {}) => {
  const { teamRating } = util(options)
  const { BETASQ } = constants(options)

  const teamRatings = teamRating(teams)
  const n = teams.length
  const denom = (n * (n - 1)) / 2

  return teamRatings.map(([muA, sigmaSqA], i) =>
    teamRatings
      .filter((_, q) => i !== q)
      .map(([muB, sigmaSqB]) =>
        phiMajor(
          (muA - muB) / Math.sqrt(n * BETASQ + sigmaSqA ** 2 + sigmaSqB ** 2)
        )
      )
      .reduce((a, b) => a + b / denom, 0)
  )
}

export default predictWin
