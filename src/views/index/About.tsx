import { useTranslation } from "react-i18next";

const About = () => {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t('welcome')}</h1>
            <h3>ACERCA DE</h3>
            <p>About page content.</p>
        </div>
    );
}

export default About