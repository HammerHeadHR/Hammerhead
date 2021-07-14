export const shareData = (senderId, receiverId, datasetId) => {
  let body = {
    senderId: senderId,
    receiverId: receiverId,
    datasetId: datasetId
  }

  return axios.post('/notifications/', body)
  .then(() => console.log('Notified'));
}