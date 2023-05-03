const apit = async (url = "", path = null, err = null) => {
  try {
    const res = await fetch(url, path)
    if (!res.ok) {
      throw Error("server not responding")
    }
  } catch (e) {
    err = e.message
  } finally {
    return err
  }
}
export default apit
