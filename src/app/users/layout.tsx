import Sidebar from "@/components/sidebar";

interface Props {
    children: React.ReactNode;
}

function Layout({children}: Props) {
    return (
        <Sidebar>
            <div className={"h-full"}>
                {children}
            </div>
        </Sidebar>
    );
};

export default Layout;