function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  const _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    const j = getRandomInt(0, i)
    const t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function parseSongUrl(htmlStr) {
  const arr = htmlStr.match(/"url":".*?"/g)
  const target = arr.find(a => a.split(':')[1] !== '""')
  const url = target ? target.replace(/"/g, '')
    .replace('url:', '')
    .replace(/\\u/gi, '%u') : ''
  return url
}

export function debounce(func, delay) {
  let timer
  return function(...args) { // ...args 是个数组
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}