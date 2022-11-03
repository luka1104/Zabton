import axios from 'axios'

export const transfer = async (address: string, amount: number) => {
  const data = {
    'address': address,
    'amount': amount * (10 ** 8),
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post('/api/tokens/transfer', data, config)
    .then(response => {
      if(response.status !== 200) throw Error("Server error")
      resolve(response)
      console.log(response);
      return response
    })
    .catch(e => {
      reject(e);
      throw Error("Server error:" + e)
    })
  })
}

