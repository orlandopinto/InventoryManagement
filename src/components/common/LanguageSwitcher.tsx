import { ButtonGroup, Dropdown, Image } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import ukflag from '../../assets/flags/en-flag.svg?react'
import esflag from '../../assets/flags/es-flag.svg?react'
import { useEffect, useState } from "react";

const LanguageSwitcher = () => {
     const { i18n } = useTranslation();

     useEffect(() => {
          i18n.changeLanguage(localStorage.getItem('lang') as string);
     }, [])


     const options = [
          {
               value: "en", label: (<Image src={ukflag} width="30" alt="" />), text: "English"
          },
          {
               value: "es", label: (<img src={esflag} width="30" alt="" />), text: "Español"
          }
     ];

     const [langLabel, setLangLabel] = useState(options[0].label);

     // setLangLabel(options[e].label);
     // const newLang = options[e].value;

     const setFlagByLabel = (value: string) => {
          return options.find(filter => filter.value === value)?.label
     }

     function handlclick(e: any) {
          setLangLabel(options[e].label);
          const newLang = options[e].value;
          i18n.changeLanguage(newLang);
          localStorage.setItem('lang', newLang)
     }

     return (
          <>
               <Dropdown as={ButtonGroup} align={"end"}>
                    <Dropdown.Toggle className="border-0 dropdown-language" id="lng-dropdown">
                         {setFlagByLabel(localStorage.getItem('lang') as string)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                         <Dropdown.Item onClick={() => handlclick(0)}>
                              <img src={ukflag} width="20" alt="" /><span className="mr-1" >{options[0].text}</span>
                         </Dropdown.Item>
                         <Dropdown.Item onClick={() => handlclick(1)}>
                              <img src={esflag} width="20" alt="" /><span className="mr-1" >{options[1].text}</span>
                         </Dropdown.Item>
                    </Dropdown.Menu>
               </Dropdown>
          </>
     );
};

export default LanguageSwitcher;