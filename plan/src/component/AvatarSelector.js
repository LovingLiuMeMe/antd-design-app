
import React from 'react'
import { Grid } from 'antd-mobile'
const AvatarSelector = (props)=>{
    return (
        <Grid 
            data={props.avators}
            isCarousel={true}
            carouselMaxRow={1}
            columnNum={4}
            renderItem={dataItem => (
                <div 
                    style={{ padding: '7px' }} 
                    className={props.avator===dataItem.text?'active':''}
                    onClick={()=>props.avatorChoose(dataItem.text)}
                >
                <img src={dataItem.icon} style={{ width: '75px', height: '75px' }} alt="" />
                <div style={{ color: '#888', fontSize: '14px', marginTop: '12px' }}>
                </div>
                    <span>{dataItem.text}</span>
                </div>
            )}
        />
    )

}

export default AvatarSelector