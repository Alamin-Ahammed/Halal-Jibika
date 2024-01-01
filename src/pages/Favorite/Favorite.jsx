import React from 'react'
import { ThemeChanger } from '../../CustomHooks/ThemeChanger'

export default function Favorite() {
  return (
    <div className="favorite-container" style={{background: '#15365b', minHeight: "70.8vh" ,display:'flex',alignItems: 'center',justifyContent:'center'}} onLoad={ThemeChanger("favorite-container","className")}>
        <h1>Favorite</h1>
    </div>
  )
}
