import React, {useState, useEffect} from 'react';
import { NavEnums } from '../App'
import { Form, Button, Input } from 'antd';
import {
    useApps,
    useOrganization,
    usePermissions,
  } from '@aragon/connect-react'
import { ethers } from 'ethers';
import { TokenManager } from '@aragon/connect-thegraph-tokens'
// import { pam_token } from "../contracts/abis"
import ecr20Abi from "../contracts/abis/ecr20Token.json"


const GAS_LIMIT = 450000
const DAI_TOKEN_ADDRESS = "0x0527E400502d0CB4f214dd0D2F2a323fc88Ff924"

export default function RequestForm(props) {

    const [org, orgStatus] = useOrganization()
    const [apps, appsStatus] = useApps()
    const [permissions, permissionsStatus] = usePermissions()
    const [requestAmount, setRequestAmount] = useState(1)
    const [depositAmount, setDepositAmonut] = useState(2)
    const [waitingForRequest, setWaitingForRequest] = useState(false)
    const [contractHash, setContractHash] = useState()
    
    const [form] = Form.useForm();
    const formItemLayout = {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
    }
    // This is for getting token info from graph
    // useEffect( () => {
    //     const fetch = async () => {
    //         const tokenManager = new TokenManager(
    //             // "0x463c45fb0f800428b3f29e41c107a15e9d754320", //CIC prototype
    //             "0x2b643d49cc4115e2ad3a987e59bda115571ea506", // pineapple mango 
    //             "https://api.thegraph.com/subgraphs/name/aragon/aragon-tokens-rinkeby"
    //         )
    //         const token = await tokenManager.token();
    //         console.log(token)
    //     }
    //     fetch()
    // }, []);

    const createTokenRequest = async () => {
        try {
            const tokenRequest = await org.app('token-request');
            const intent = org.appIntent(tokenRequest.address, 'createTokenRequest', [
                DAI_TOKEN_ADDRESS,
                ethers.utils.parseEther(depositAmount.toString()), // deposit amount
                ethers.utils.parseEther(requestAmount.toString()), // return amount
                contractHash 
            ])
            const txPath = await intent.paths(props.address)
            return txPath

        } catch (error) {
            console.log(`Unable to complete transaction create ${error}`)
        }
    }

    const requestMinting = async () => {
        setWaitingForRequest(true);
        const txPath = await createTokenRequest()
        const signer = props.injectedProvider.getSigner()
        
        try {
            const tx = txPath.transactions && txPath.transactions[0]
            const { to, data } = tx;
            const contract = new ethers.Contract(DAI_TOKEN_ADDRESS, ecr20Abi, signer);
            const result = await contract.approve(to, ethers.utils.parseEther('20'), { 
                gasLimit: GAS_LIMIT
            })
            console.log(result)
            const txResult = await signer.sendTransaction({data, to, gasLimit: GAS_LIMIT})
            console.log(txResult)
        } catch (error) {
            console.log(`${JSON.stringify(error)}`)

        } finally {
            setWaitingForRequest(false);
        }
    }

    const loading =
        orgStatus.loading || appsStatus.loading || permissionsStatus.loading
    const error = orgStatus.error || appsStatus.error || permissionsStatus.error

    const title = "Request your CIC issuance"
    const positiveIntRegex = new RegExp('^0*[1-9]\d*$')
    const testIntRegex = (input) => positiveIntRegex.test(input)

    if (props.currentStep !== NavEnums.REQUEST) return null
    if (error) return <p>Sorry, unable to reach to CIC Aragon org {error.message}</p>
    return (
        <div className="onboardContainer">
            <div className="onboardTitle">{title}</div>
            <Form layout={formItemLayout} form={form} >
                    <Form.Item name="contractHash"
                                label="The hash that points at your contract"
                                rules={[{ required: true, message: "Please provide the ipfs hash to your contract"}]}>
                        <Input onChange={(e) => setContractHash(e.target.value)}/>
                    </Form.Item>
                    <Form.Item name="requestAmount" 
                               label="Amount of CIC requested"
                               rules={[{ required: true, message: "Please input a request amount."}]}>
                        <Input onChange={(e) => setRequestAmount(e.target.value)}/>
                    </Form.Item> 
                    <Form.Item name="depositAmount" 
                               label="Amount of Deposit"
                               rules={[{ required: true, message: "Please input a deposit amount." }]}>
                        <Input onChange={(e) => setDepositAmonut(e.target.value)}/>
                    </Form.Item>
                <div className="onboardFooter">
                    <Button type="primary" className="onboardButton" loading={waitingForRequest || loading} onClick={() => requestMinting()}>{"Request Minting"}</Button>
                </div>
            </Form>
        </div>
    )
}