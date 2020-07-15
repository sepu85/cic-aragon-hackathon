import React from 'react';
import { NavEnums } from '../App';
import { Button } from 'antd';


export default function CommitForm(props) {

    const title = "Social Commitment of Goods and Services"

    if (props.currentStep !== NavEnums.COMMIT) return null
    return (
        <div className="onboardContainer">
            <div className="onboardTitle">{title}</div>
            <div className="onboardBody">

            </div>
            <div className="onboardFooter">
                <Button className="onboardButton">Commit my Goods and/or Services</Button>
            </div>
        </div>
    )
}