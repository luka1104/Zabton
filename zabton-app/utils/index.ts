import { Validation } from "interfaces"

export const calcTime = (deadline: string | Date) => {
  const deadlineDateTime = new Date(deadline)
  const now = new Date
  const timeLeft = (deadlineDateTime.getTime() - now.getTime()) / (60*60*1000)
  return Math.floor(timeLeft)
}

export const checkDeadline = (deadline: string | Date) => {
  const deadlineDateTime = new Date(deadline)
  const now = new Date
  const isBeforeDeadline = deadlineDateTime.getTime() >= now.getTime()
  return isBeforeDeadline
}

export const getFontSize = (contents: string) => {
  const len = contents.length
  if(len <= 11) return true
  false
}

export const getRandNum = (length: number) => {
  const random = Math.floor(Math.random() * length)
  return random
}

export const calcPlace = (validations: Validation[]) => {
  let answerIds = []
  validations.map((val: Validation, key: number) => {
    answerIds.push(val.answerId)
  })
  answerIds = Array.from(new Set(answerIds))
  let resultArr = []
  answerIds.map((val: number, key: number) => {
    resultArr.push([val, validations.filter(v => v.answerId === val).length])
  })
  resultArr.sort((first: any, second: any) => {
    return first[1] - second[1]
  })
  resultArr.reverse()
  return resultArr
}
