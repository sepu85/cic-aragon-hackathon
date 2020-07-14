import React from 'react'
import { PageHeader } from 'antd';

export default function Header(props) {
  return (
    <div onClick={()=>{
      props.setCurrentStep(0);
    }}>
      <PageHeader
        title="CIC Social Backing"
        subTitle="Contribute to your community"
        style={{cursor:'pointer'}}
      />
    </div>
  );
}
