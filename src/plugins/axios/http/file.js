import instance from '../index'

export const fileService = {
  uploadImage: async image => {
    const fd = new FormData()
    fd.append('file', image)
    try {
      return await instance.post('/file/upload', fd)
    } catch (e) {
      console.log(e)
      return e.response
    }
  },
  getImage: async id => {
    try {
      return await instance.get(`/file/image/${id}`, {
        responseType: 'arraybuffer',
      })
    } catch (e) {
      console.log(e)
      return e.response
    }
  },
}
