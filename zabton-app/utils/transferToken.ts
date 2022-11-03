import axios from 'axios'
import { toast } from 'react-toastify'

export const transfer = async (address: string, amount: number, setLoading?: Function) => {
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
      if(setLoading) setLoading(false)
      toast('ZBTNが発行されました！')
    })
    .catch(e => {
      // エラー解決必須　useEffect経由での発火が問題？
      console.log(e);
    })
  })
}

