import PersonalInfoForm from './components/PersonalInfoForm';
import ProfileForm from './components/ProfileForm';
import ExperienceForm from './components/ExperienceForm';
import SkillsForm from './components/SkillsForm';
import LanguagesForm from './components/LanguagesForm';
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="max-w-3/4 mx-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                        <PersonalInfoForm/>
                        <ProfileForm/>
                        <ExperienceForm/>
                        <SkillsForm/>
                        <LanguagesForm/>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-center">Preview</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
