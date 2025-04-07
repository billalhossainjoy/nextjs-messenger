import DesktopSidebar from "@/components/desktopSidebar";
import MobileFooter from "@/components/mobileFooter";
import {getCurrentUser} from "@/app/action";

interface Props {
children: React.ReactNode;
}

async function Sidebar({children}: Props) {
    const currentUser = await getCurrentUser()

    if(!currentUser){
        return null
    }

    return (
        <div className={"h-full "}>
            <DesktopSidebar currentUser={currentUser} />
            <MobileFooter />
            <main className={"lg:pl-20 h-full"}>
                {children}
            </main>
        </div>
    );
};

export default Sidebar;