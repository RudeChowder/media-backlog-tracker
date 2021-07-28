class Fetcher {
  static get (url) {
    return (
      fetch(url)
        .then(resp => resp.json())
    )
  }

  static post (url, newRecordInfo) {
    const configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(newRecordInfo)
    }
    return (
      fetch(url, configObj)
        .then(resp => resp.json())
    )
  }

  static patch (url, id, updateObj) {
    const configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(updateObj)
    }
    return (
      fetch(`${url}/${id}`, configObj)
        .then(resp => resp.json())
    )
  }

  static delete (url, id) {
    return (
      fetch(`${url}/${id}`, { method: "DELETE" })
    )
  }
}

export default Fetcher
