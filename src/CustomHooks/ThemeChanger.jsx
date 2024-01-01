import { useEffect } from "react";
import { useThemeContext } from "../Context/themeContext";


export const ThemeChanger = (identifier,nameType) => {
    const {theme} = useThemeContext()
    useEffect(()=> {
        let elementToChange;
        if (nameType === 'className') {
            elementToChange = document.querySelector(`.${identifier}`)
        }
        else if (nameType === 'id') {
            elementToChange = document.querySelector(`#${identifier}`)
        }
        elementToChange.style.backgroundColor = theme === 'dark' ? '#15365b' : '#fff'
        elementToChange.childNodes.forEach(element => {
            // console.log(element.tagName)
            if (theme === 'light') {
                element.style.color = '#000'
            }else {
                element.style.color = '#fff'
            }
        })

    },[theme])
    // return theme;
}
