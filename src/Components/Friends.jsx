import {
    Avatar,
} from "@nextui-org/react";


function ItemFriend({ avatarSrc, nickname, username }) {
    return (
        <article className='flex items-center gap-3 px-5 p-3'>
            <Avatar isBordered color="primary" />
            <div className="flex flex-col">
                <strong>
                    {nickname}
                </strong>
                <span>
                    @{username}
                </span>
            </div>
            {/* <Icon name='message' /> */}
        </article>
    );
}
function Friends() {
    return (
        <article className=' min-w-[300px] w-[31.25em] h-[25em] bg-white border-zinc-100 border-opacity-20 dark:bg-zinc-900 border-2 dark:border-zinc-800 rounded-md xl:block hidden'>
            <ItemFriend nickname='Antonio' username='Antonio Mejia' />
        </article>
    )
}

export default Friends;