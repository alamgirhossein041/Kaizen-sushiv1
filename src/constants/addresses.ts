import { ChainId } from '@sushiswap/sdk'

// TODO: Should be a simple mapping ZAPPER_ADDRESS[chainId]
export const getZapperAddress = (chainId: ChainId | undefined) => {
    let address: string | undefined
    if (chainId) {
        switch (chainId) {
            case ChainId.MAINNET:
                address = ''
                break
            case ChainId.ROPSTEN:
                address = ''
                break
        }
    }
    return address
}
