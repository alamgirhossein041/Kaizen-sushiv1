import { ChainId, Currency, Token, currencyEquals } from '@sushiswap/sdk'

import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'
import CurrencyLogo from '../CurrencyLogo'
import QuestionHelper from '../QuestionHelper'
import React from 'react'
import { SUGGESTED_BASES } from '../../constants'
import { Text } from 'rebass'
import Typography from '../Typography'
import styled from 'styled-components'

// const BaseWrapper = styled.div<{ disable?: boolean }>`
//     border: 1px solid ${({ theme, disable }) => (disable ? 'transparent' : theme.bg3)};
//     border-radius: 10px;
//     display: flex;
//     padding: 6px;

//     align-items: center;
//     :hover {
//         cursor: ${({ disable }) => !disable && 'pointer'};
//         background-color: ${({ theme, disable }) => !disable && theme.bg2};
//     }

//     background-color: ${({ theme, disable }) => disable && theme.bg3};
//     opacity: ${({ disable }) => disable && '0.4'};
// `

export default function CommonBases({
    chainId,
    onSelect,
    selectedCurrency,
}: {
    chainId?: ChainId
    selectedCurrency?: Currency | null
    onSelect: (currency: Currency) => void
}) {
    return (
        <AutoColumn gap="md">
            <AutoRow>
                <Text fontWeight={500} fontSize={14}>
                    Common bases
                </Text>
                <QuestionHelper text="These tokens are commonly paired with other tokens." />
            </AutoRow>
            <AutoRow gap="4px" justify="start">
                <button
                    type="button"
                    onClick={() => {
                        if (
                            !selectedCurrency ||
                            !currencyEquals(
                                selectedCurrency,
                                Currency.getNativeCurrency(chainId)
                            )
                        ) {
                            onSelect(Currency.getNativeCurrency(chainId))
                        }
                    }}
                    className="flex items-center p-2 space-x-2 rounded bg-dark-800 hover:bg-dark-700 disabled:bg-dark-1000 disabled:cursor-not-allowed"
                    disabled={
                        selectedCurrency === Currency.getNativeCurrency(chainId)
                    }
                >
                    <CurrencyLogo
                        currency={Currency.getNativeCurrency(chainId)}
                    />
                    <Typography variant="caption2" className="font-semibold">
                        {Currency.getNativeCurrencySymbol(chainId)}
                    </Typography>
                </button>
                {(chainId ? SUGGESTED_BASES[chainId] : []).map(
                    (token: Token) => {
                        const selected =
                            selectedCurrency instanceof Token &&
                            selectedCurrency.address === token.address
                        return (
                            <button
                                type="button"
                                onClick={() => !selected && onSelect(token)}
                                disabled={selected}
                                key={token.address}
                                className="flex items-center p-2 space-x-2 rounded bg-dark-800 hover:bg-dark-700 disabled:bg-dark-1000 disabled:cursor-not-allowed"
                            >
                                <CurrencyLogo currency={token} />
                                <Typography
                                    variant="caption2"
                                    className="font-semibold"
                                >
                                    {token.getSymbol(chainId)}
                                </Typography>
                            </button>
                        )
                    }
                )}
            </AutoRow>
        </AutoColumn>
    )
}
