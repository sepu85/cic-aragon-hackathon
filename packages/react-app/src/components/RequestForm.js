import React, {useState, useEffect} from 'react';
import { NavEnums } from '../App'
import { Button } from 'antd';
import {
    useApps,
    useOrganization,
    usePermissions,
  } from '@aragon/connect-react'
import { ethers } from 'ethers';
import { TokenManager } from '@aragon/connect-thegraph-tokens'




export default function RequestForm(props) {

    const [org, orgStatus] = useOrganization()
    const [apps, appsStatus] = useApps()
    const [permissions, permissionsStatus] = usePermissions()

    useEffect( () => {
        const fetch = async () => {
            const tokenManager = new TokenManager(
                "0x463c45fb0f800428b3f29e41c107a15e9d754320",
                "https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby"
            )
            const token = await tokenManager.token();
            console.log(token)
        }
        fetch()
    }, []);

    const createTokenRequest = async () => {
        try {
            const tokenRequest = await org.app('token-request');
            const intent = org.appIntent(tokenRequest.address, 'createTokenRequest', [
                "0xe0ac2a5f0bf3f011256b61dbb7155f14c8c7779c", // My CIC token address?
                ethers.utils.parseEther('1'),
                ethers.utils.parseEther('1'),
                "aHashOfSignedContract" 
            ])

            const txPath = await intent.paths(props.address)
    
            txPath.transactions.map(tx => console.log(tx))

        } catch (error) {
            console.log(`Unable to complete request ${error}`)
        }
    }

    const loading =
        orgStatus.loading || appsStatus.loading || permissionsStatus.loading
    const error = orgStatus.error || appsStatus.error || permissionsStatus.error

    const title = "Request your CIC issuance"

    if (props.currentStep !== NavEnums.REQUEST) return null
    if (error) return <p>Sorry, unable to reach to CIC Aragon org {error.message}</p>
    return (
        <div className="onboardContainer">
            <div className="onboardTitle">{title}</div>
            <div className="onboardBody">

            </div>
            <div className="onboardFooter" style={loading ? { disabled: true } : undefined }>
                <Button className="onboardButton" onClick={() => createTokenRequest()}>{loading ? "Loading..." : "Request Minting"}</Button>
            </div>
        </div>
    )
}