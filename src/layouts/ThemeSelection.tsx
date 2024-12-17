import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function ThemeSelection() {
     const [theme, setTheme] = useState('');

     if (localStorage.getItem('theme') === null)
          localStorage.setItem('theme', theme)

     function handleTheme() {
          const selectedTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-bs-theme', selectedTheme);

          var preview = document.querySelectorAll("#ProSidebar");
          preview[0].setAttribute("data-bs-theme", selectedTheme);

          setTheme(selectedTheme);
          localStorage.setItem('theme', selectedTheme)
     }

     return (
          <>
               <div className="mr-2">
                    {
                         localStorage.getItem('theme') === 'light'
                              ?
                              <Icon.MoonStarsFill size={20} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => handleTheme()}>{localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}</Icon.MoonStarsFill>
                              :
                              <Icon.SunFill size={25} style={{ cursor: 'pointer', color: '#fff' }} onClick={() => handleTheme()}>{localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}</Icon.SunFill>
                    }
               </div>
          </>
     );
}