// const navigation = [
//     { name: 'Dashboard', href: '#', current: true },
//     { name: 'Team', href: '#', current: false },
//     { name: 'Projects', href: '#', current: false },
//     { name: 'Calendar', href: '#', current: false },
//     { name: 'Documents', href: '#', current: false },
//     { name: 'Reports', href: '#', current: false },
// ];

function classNames(...classes: String[]) {
    return classes.filter(Boolean).join(' ');
}

type Props = {
    navigation: {
        name: string;
        href: string;
        current: boolean;
    }[];
};

export default function VerticalNavigation(props: Props) {
    const { navigation } = props;
    return (
        <nav className='flex flex-1 flex-col' aria-label='Sidebar'>
            <ul role='list' className='-mx-2 list-none space-y-1'>
                {navigation.map((item) => (
                    <li key={item.name}>
                        <a
                            href={item.href}
                            className={classNames(
                                item.current
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                'group flex gap-x-3 rounded-md p-2 pl-3 text-sm font-semibold leading-6',
                            )}>
                            {item.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
