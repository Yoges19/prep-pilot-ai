import Link from 'next/link'
type SidebarItemProps = {
    title: string;
    href: string;
    icon: React.ReactNode;
}

export default function SidebarItem({ title, href, icon }: SidebarItemProps) {
    return (
    <li>
      <Link
        href={href}
        className="
          flex items-center gap-3
          p-4 rounded-xl
          hover:bg-white/10
          transition-all duration-300
          hover:translate-x-1
        "
      >
        {icon}
        <span>{title}</span>
      </Link>
    </li>

    );
}