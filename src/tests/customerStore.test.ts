import { useCustomerStore } from '../store/customer'

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg)
}

export function runCustomerStoreTests() {
  useCustomerStore.getState().setName('')
  assert(useCustomerStore.getState().name === '', 'initial empty name')
  useCustomerStore.getState().setName('홍길동')
  assert(useCustomerStore.getState().name === '홍길동', 'set/get name works')
}

if (typeof window === 'undefined') {
  runCustomerStoreTests()
}
