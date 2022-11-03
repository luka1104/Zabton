export const shuffleArray = (array: any) => {
  const cloneArray = [...array]

  for (let i = cloneArray.length - 1; i >= 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1))
    let tmpStorage = cloneArray[i]
    cloneArray[i] = cloneArray[rand]
    cloneArray[rand] = tmpStorage
  }

  return cloneArray
}

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
