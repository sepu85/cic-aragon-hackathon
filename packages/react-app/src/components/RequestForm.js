import React from 'react';
import { NavEnums } from '../App'

export default function RequestForm(props) {
    if (props.currentStep !== NavEnums.REQUEST) return null
    return (
        <div>
            RequestForm
        </div>
    )
}