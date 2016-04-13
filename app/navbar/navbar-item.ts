export class NavbarItem {
	public header: string;
	public subItems: NavbarItem[];
	public href: string;
	public isHover: boolean;
	public expanded: boolean = false;
}
