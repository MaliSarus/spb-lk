export function setWithExpiry(key, value, ttl) {
  const now = new Date()
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export function setWithoutExpiry(key, value) {
  const item = {
    value: value,
  }
  localStorage.setItem(key, JSON.stringify(item))
}


export function getWithExpiry(key) {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)
  const now = new Date()

  if (!item.expiry || now.getTime() > item.expiry) {
    localStorage.removeItem(key)
    return null
  }
  return item.value
}

export function getWithoutExpiry(key) {
  const itemStr = localStorage.getItem(key)

  if (!itemStr) {
    return null
  }
  const item = JSON.parse(itemStr)

  return item.value
}