import React from 'react';
import OnboardButton from './OnboardButton';

export default function OnboardForm() {
    const title = 'Create your Community Economy'
    const body = `Commit your goods and services to your community
                  and apply to recieve your firt CIC's`
    
    const container = {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    }

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

    return (
        <div style={container}>
            <div style={{height: "20%", paddingTop: "50px"}}><h1>{title}</h1></div>
            <div style={{height: "20em", alignItems: "center"}}>{body}</div>
            <div className="onboardFooter">
                <OnboardButton title={commitButton.title} content={commitButton.content} />
                <OnboardButton title={requestButton.title} content={requestButton.content} />
            </div>
        </div>
    )
}