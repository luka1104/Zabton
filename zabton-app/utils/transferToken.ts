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

export const transferFrom = async (sender: string, target: string, amount: number, setLoading?: Function) => {
  const data = {
    'sender': sender,
    'target': target,
    'amount': amount * (10 ** 8),
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post('/api/tokens/transferFrom', data, config)
    .then(response => {
      if(response.status !== 200) throw Error("Server error")
      resolve(response)
      if(setLoading) setLoading(false)
      toast('ZBTNが送信されました！')
    })
    .catch(e => {
      // エラー解決必須　useEffect経由での発火が問題？
      console.log(e);
    })
  })
}

export const multiTransfer = async (addresses: string[], amounts: number[], setLoading?: Function) => {
  const data = {
    'addresses': addresses,
    'amounts': [amounts[0] * (10 ** 8), amounts[1] * (10 ** 8)],
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    }
  }
  console.log(data)
  return new Promise((resolve, reject) => {
    axios.post('/api/tokens/multiTransfer', data, config)
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

