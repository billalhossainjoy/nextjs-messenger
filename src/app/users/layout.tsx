import Sidebar from "@/components/sidebar/sidebar";
import {getUsers} from "@/app/users/actions";
import UserList from "@/components/userList";

interface Props {
    children: React.ReactNode;
}

 async function UsersLayout({children}: Props) {
    const users = await getUsers()
    console.log(users)
    return (
        <Sidebar>
            <div className={"h-full "}>
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    );
};

export default UsersLayout;