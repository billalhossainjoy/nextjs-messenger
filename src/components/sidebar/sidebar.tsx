import DesktopSidebar from "@/components/sidebar/desktopSidebar";
import MobileFooter from "@/components/sidebar/mobileFooter";
import {getCurrentUser} from "@/app/actions";

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