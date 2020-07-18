import React, { useState } from 'react';
import OnboardButton from './OnboardButton';
import { NavEnums } from "../App";
import { Button } from 'antd';

export default function OnboardForm(props) {
    // const [currentStep, setCurrentStep] = useState(0);

    const title = 'Create your Community Economy'
    const body = `Commit your goods and services to your community
                  and apply to recieve your firt CIC's`


    const commitButton = {
        title: "Commit",
        content: `State what resources you can contribute to
                    your community.`
    }

    const requestButton = {
        title: "Request",
        content: `Do you have any special needs? Do you want to
                    start your own business?`
    }

    if (props.currentStep !== NavEnums.HOME ) return null
    return (
            <div className="onboardContainer">
                <div className="onboardTitle"><h1>{title}</h1></div>
                <div className="onboardBody">{body}</div>
                <div className="onboardFooter">
                    <Button type="primary" className="onboardButton" onClick={() => props.setCurrentStep(NavEnums.COMMIT)} >{commitButton.content} </Button>
                    <Button type="primary" className="onboardButton" onClick={() => props.setCurrentStep(NavEnums.REQUEST)}>{requestButton.content}</Button>
                </div>
            </div>
    )
}