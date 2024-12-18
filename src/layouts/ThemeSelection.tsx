import { useState } from "react";
import * as Icon from "react-bootstrap-icons";

export default function ThemeSelection() {
     const [theme, setTheme] = useState('');

     if (localStorage.getItem('theme') === null)
          localStorage.setItem('theme', theme)

     function handleTheme() {
          const selectedTheme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
          document.documentElement.setAttribute('data-bs-theme', selectedTheme);

          var ProSidebar = document.querySelectorAll("#ProSidebar");
          ProSidebar[0].setAttribute("data-bs-theme", selectedTheme);

          var topNavbar = document.querySelectorAll("#topNavbar");
          topNavbar[0].setAttribute("data-bs-theme", selectedTheme);

          setTheme(selectedTheme);
          localStorage.setItem('theme', selectedTheme)
     }

     return (
          <>
               <div className="mr-2">
                    {
                         localStorage.getItem('theme') === 'light'
                              ?
                              <Icon.MoonStarsFill className="icon-theme" size={20} onClick={() => handleTheme()}>{localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}</Icon.MoonStarsFill>
                              :
                              <Icon.SunFill className="icon-theme" size={25} onClick={() => handleTheme()}>{localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'}</Icon.SunFill>
                    }
               </div>
          </>
     );
}