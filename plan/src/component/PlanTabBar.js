import React from 'react'
import {TabBar} from 'antd-mobile'

const PlanTabBar = (props)=>{
    return (
        <div style={{
            position: 'fixed',
            width: '100%',
            bottom: 0
        }}>
            <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            tabBarPosition="bottom"
            >
            {
                props.data.map(v=>{
                    return (
                            <TabBar.Item
                            title={v.title}
                            key={v.title}
                            icon={{
                                uri:require(`../imgs/tabbar/${v.icon}.png`)
                            }
                            }
                            selectedIcon={{
                                uri:require(`../imgs/tabbar/${v.icon}-active.png`)
                            }
                            }
                            selected={v.path === props.nowPath}
                            badge={1}
                            onPress={() => {
                                props.changeUrl(v.path)
                            }}
                        >
                        </TabBar.Item>
                    )
                    
                })
            }
            
            </TabBar>
        </div>
    )
}

export default PlanTabBar