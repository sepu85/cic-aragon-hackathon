import React from 'react';
import { Button } from 'antd';

export default function OnboardButton (props) {
    return (
    <Button className="onboardButton">{props.content}</Button>
    )
}